const express = require("express")
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const createNotifications = require("../helpers/createNotifications.helper.js")
const Payments = require("../models/payments.model.js")
const Cybersource_Transactions = require("../models/cybersourceTransactions.model.js")
const Orders = require("../models/orders.model.js")

// get
router.get("/buyer-simple-info", verifyUser, async (req, res) => {
    try {
        const payments = await Payments.find({ buyer_id: req.token.user_id })
            .sort({ created_at: -1 })
            .populate("seller_id", "company_name")
        res.json(payments)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-simple-info", verifyUser, async (req, res) => {
    try {
        const payments = await Payments.find({ seller_id: req.token.user_id, payment_status: "completed" })
            .sort({ created_at: -1 })
            .populate("buyer_id", "company_name")
        res.json(payments)
    } catch (err) {
        res.json({ message: err.message })
    }
})


// post
// global variable
let transaction_Data = null

// Checkout page: builds the CyberSource payment form and redirects the user
router.post('/checkout', (req, res) => {
    try {
        transaction_Data = req.body.data
        const { price, currency } = req.body.data

        // // Build the payment parameters to send to CyberSource
        const params = buildCyberSourceParams({
            amount: price,
            currency: currency === "LKR" ? "LKR" : "USD",
            referenceNumber: 'ORDER-' + Date.now(), // a simple unique order ID using timestamp
        });

        res.json(params)
    } catch (err) {
        res.json({ message: err.message })
    }
});


// Payment response page: CyberSource sends the result here after checkout
router.post('/payment/response', async (req, res) => {
    try {
        const data = req.body; // All the data CyberSource sent back

        // Safety check: make sure the response has a signature
        if (!data.signed_field_names || !data.signature) {
            return res.status(400).send('Bad request: missing signature.');
        }

        // Verify the signature to make sure the response is genuine and not tampered with
        const isValid = verifySignature(data);
        if (!isValid) {
            console.error('Signature mismatch', { received: data.signature });
            return res.status(400).send('Invalid signature — possible tampering detected.');
        }

        const Cybersource_Transaction_saveData = new Cybersource_Transactions(data);
        await Cybersource_Transaction_saveData.save();

        const Payment_saveData = new Payments({
            order_id: data.req_reference_number,
            transaction_id: data.transaction_id || "",
            seller_id: transaction_Data?.seller_id?._id,
            buyer_id: transaction_Data.buyer_id,
            total_price: transaction_Data.price,
            currency: transaction_Data.currency,
            payment_method: data.req_payment_method,
            payment_status: data.decision === "ACCEPT" ? "completed" : "failed",
            cyberSource_ref: data.request_token || "",
            created_at: data.signed_date_time,
        })
        await Payment_saveData.save();
        createNotifications({
            user_id: transaction_Data.buyer_id,
            type: "payment",
            title: "payment success",
            message: "your payment has been successfull",
            created_at: data.signed_date_time
        })

        // Redirect the user's browser to the React success page
        const decision = data.decision;
        switch (decision) {
            case "ACCEPT":
                const Order_saveData = new Orders({
                    wasteListings_id: transaction_Data._id,
                    seller_id: transaction_Data?.seller_id?._id,
                    buyer_id: transaction_Data.buyer_id,
                    quantity: transaction_Data.quantity,
                    unit: transaction_Data.unit,
                    total_price: transaction_Data.price,
                    currency: transaction_Data.currency,
                    status: "pending",
                    ordered_date: data.signed_date_time,
                    collected_date: "",
                    created_at: data.signed_date_time,
                    updated_at: data.signed_date_time,
                })
                await Order_saveData.save();
                createNotifications({
                    user_id: transaction_Data.buyer_id,
                    type: "order",
                    title: "order pending",
                    message: "your order has been placed successfully",
                    created_at: data.signed_date_time
                })
                return res.redirect(`http://localhost:5173/buyer/payment-success`);
            case "CANCEL":
                createNotifications({
                    user_id: transaction_Data.buyer_id,
                    type: "payment",
                    title: "payment cancelled",
                    message: "your payment has been cancelled",
                    created_at: data.signed_date_time
                })
                return res.redirect(`http://localhost:5173/buyer/payment-failed`);
            default:
                return res.redirect(`http://localhost:5173/buyer/dashboard`);
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Unknown error' });
    }
});


// ─── CyberSource helper functions ───────────────────────────────────────────

const crypto = require('crypto');
const { log } = require("console")

/**
 * Signs a list of fields using HMAC-SHA256.
 * CyberSource uses this signature to verify the request is from us.
 */
function signFields(fieldNames, params) {
    // Build a string like: "field1=value1,field2=value2,..."
    const dataToSign = fieldNames.map(name => `${name}=${params[name]}`).join(',');

    // Create an HMAC-SHA256 hash using our secret key, then encode it in base64
    return crypto
        .createHmac('sha256', process.env.CYBERSOURCE_SECRET_KEY)
        .update(dataToSign)
        .digest('base64');
}

/**
 * Verifies that the signature CyberSource sent back matches what we expect.
 * This confirms the response is genuine and hasn't been tampered with.
 */
function verifySignature(responseData) {
    const receivedSignature = responseData.signature;
    const fieldNames = responseData.signed_field_names.split(',');
    const expectedSignature = signFields(fieldNames, responseData);

    // Use timingSafeEqual to prevent timing attacks (a security best practice)
    const a = Buffer.from(receivedSignature);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length) return false;

    return crypto.timingSafeEqual(a, b);
}

/**
 * Builds all the parameters needed for a CyberSource payment request,
 * then signs them and returns the complete set ready for the form.
 */
function buildCyberSourceParams({ amount, currency, referenceNumber }) {
    const responseUrl = 'http://localhost:3000/api/payments/payment/response';

    // All the fields we're sending to CyberSource
    const params = {
        access_key: process.env.CYBERSOURCE_ACCESS_KEY,
        profile_id: process.env.CYBERSOURCE_PROFILE_ID,
        transaction_uuid: Date.now().toString(), // simple unique ID (no uuid package needed)
        signed_date_time: new Date().toISOString().replace(/\.\d{3}/, ''), // e.g. "2024-01-15T10:30:00Z"
        locale: 'en-us',
        transaction_type: 'sale',
        reference_number: referenceNumber,
        amount: amount,
        currency: currency,
        payment_method: 'card',
        override_custom_receipt_page: responseUrl,
        override_custom_cancel_page: responseUrl
    };

    // signed_field_names lists every field being signed — including itself
    const fieldNamesToSign = Object.keys(params);
    fieldNamesToSign.push('signed_field_names');
    params.signed_field_names = fieldNamesToSign.join(',');

    // Compute and attach the signature
    params.signature = signFields(fieldNamesToSign, params);

    return params;
}

module.exports = router
