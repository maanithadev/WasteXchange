const express = require("express")
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const createNotifications = require("../helpers/createNotifications.helper.js")
const EmissionFactors = require("../models/emissionFactors.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const Payments = require("../models/payments.model.js")
const Cybersource_Transactions = require("../models/cybersourceTransactions.model.js")
const Orders = require("../models/orders.model.js")
const WasteListings = require("../models/wasteListings.model.js")
const Matches = require("../models/matches.model.js")

// get
router.get("/get-all-payments", verifyUser, async (req, res) => {
    try {
        const payments = await Payments.find({}, "-_id -order_id -seller_id -buyer_id -cyberSourceTransaction_id  -__v")
            .sort({ created_at: -1 })
            .populate("order_id", "-_id -wasteListings_id -seller_id -buyer_id -cyberSourceTransaction_id -__v")
            .populate("seller_id", "-_id -password -__v")
            .populate("sellerDetails", "-_id")
            .populate("buyer_id", "-_id -password -__v")
            .populate("buyerDetails", "-_id")
        res.json(payments)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/admin-dashboard-cards", verifyUser, async (req, res) => {
    try {
        const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g. "2026-07"

        const completedPayments = await Payments.aggregate([
            { $match: { payment_status: "completed", created_at: { $regex: `^${currentMonthStr}` } } },
            { $group: { _id: null, totalSum: { $sum: "$total_price" } } }
        ]);
        const totalRevenue = completedPayments.length > 0 ? completedPayments[0].totalSum : 0;

        const pendingPayments = await Payments.aggregate([
            { $match: { payment_status: "completed", created_at: { $regex: `^${currentMonthStr}` } } },
            { $group: { _id: null, totalSum: { $sum: "$total_price" } } }
        ]);
        const pendingPayouts = pendingPayments.length > 0 ? pendingPayments[0].totalSum : 0;

        const failedPayments = await Payments.aggregate([
            { $match: { payment_status: "failed", created_at: { $regex: `^${currentMonthStr}` } } },
            { $group: { _id: null, totalSum: { $sum: "$total_price" } } }
        ]);
        const disputedTransactions = failedPayments.length > 0 ? failedPayments[0].totalSum : 0;

        res.json({
            totalRevenue,
            pendingPayouts,
            disputedTransactions
        });
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/buyer-simple-info", verifyUser, async (req, res) => {
    try {
        const payments = await Payments.find({ buyer_id: req.token.user_id })
            .sort({ created_at: -1 })
            .populate("sellerDetails", "company_name")
        res.json(payments)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-simple-info", verifyUser, async (req, res) => {
    try {
        const payments = await Payments.find({ seller_id: req.token.user_id, payment_status: "completed" })
            .sort({ created_at: -1 })
            .populate("buyerDetails", "company_name");

        const allTimeEarnings = payments.reduce((sum, p) => sum + p.total_price, 0);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const currentMonthEarnings = payments.reduce((sum, p) => {
            if (p.created_at) {
                const date = new Date(p.created_at);
                if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                    return sum + p.total_price;
                }
            }
            return sum;
        }, 0);

        res.json({
            payments,
            allTimeEarnings,
            currentMonthEarnings
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});


// post
// global variable
let transaction_Data = null
let saved_payment_id = null

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

        const cybersource_Transaction_saveData = new Cybersource_Transactions({
            decision: data.decision,
            processed: true,
            raw_response: data,
            created_at: data.signed_date_time
        });
        const saved_Cybersource_Transaction = await cybersource_Transaction_saveData.save();

        const payment_Status_Save = async (decision, orderId) => {
            const Payment_saveData = new Payments({
                order_id: orderId || null,
                seller_id: transaction_Data.seller_id,
                buyer_id: transaction_Data.buyer_id,
                cyberSourceTransaction_id: saved_Cybersource_Transaction._id,
                transaction_id: data.transaction_id || null,
                total_price: transaction_Data.price,
                currency: data.req_currency,
                payment_method: data.decision === "ACCEPT" ? data.req_payment_method : null,
                card_number: data.req_card_number || null,
                card_type_name: data.card_type_name || null,
                payment_status: data.decision === "ACCEPT" ? "completed" : "failed",
                created_at: data.signed_date_time,
            })
            const saved_payment = await Payment_saveData.save();
            saved_payment_id = saved_payment._id
            return saved_payment
        }

        const calculateAndSaveCarbonRecord = async (orderId) => {
            const factorDoc = await EmissionFactors.findOne({
                category: transaction_Data.category
            });

            if (!factorDoc) {
                console.warn(
                    `No emission factor found for category "${transaction_Data.category}" — skipping carbon record.`
                );
                return null;
            }

            let quantityInKg = transaction_Data.quantity;
            if (transaction_Data.unit === 'tons') {
                quantityInKg = transaction_Data.quantity * 1000;
            }
            // ⚠️ Add more unit conversions here if wasteListings.unit supports others.

            const co2SavedKg = quantityInKg * factorDoc.co2FactorPerKg;

            const carbonRecord = new CarbonRecords({
                order_id: orderId,
                seller_id: transaction_Data.seller_id,
                buyer_id: transaction_Data.buyer_id,
                co2SavedKg: co2SavedKg,
                created_at: data.signed_date_time,
                updated_at: data.signed_date_time,
            });

            return await carbonRecord.save();
        };

        // Redirect the user's browser to the React success page
        const decision = data.decision;
        switch (decision) {
            case "ACCEPT":
                const Order_saveData = new Orders({
                    wasteListings_id: transaction_Data._id,
                    seller_id: transaction_Data.seller_id,
                    buyer_id: transaction_Data.buyer_id,
                    cyberSourceTransaction_id: saved_Cybersource_Transaction._id,
                    order_reference_number: data.req_reference_number,
                    address: {
                        address_line1: data.req_bill_to_address_line1,
                        address_line2: data.req_bill_to_address_line2,
                        city: data.req_bill_to_address_city,
                        state: data.req_bill_to_address_state,
                        postal_code: data.req_bill_to_address_postal_code,
                        country: data.req_bill_to_address_country,
                    },
                    bill_to_email: data.req_bill_to_email,
                    company_name: data.req_bill_to_company_name,
                    forename: data.req_bill_to_forename,
                    surname: data.req_bill_to_surname,
                    phone: data.req_bill_to_phone,
                    quantity: transaction_Data.quantity,
                    unit: transaction_Data.unit,
                    total_price: data.auth_amount,
                    currency: data.req_currency,
                    status: "pending",
                    ordered_date: data.signed_date_time,
                    collected_date: null,
                    created_at: data.signed_date_time,
                    updated_at: data.signed_date_time,
                })
                const saved_Order = await Order_saveData.save();
                payment_Status_Save(decision, saved_Order._id)

                await WasteListings.updateOne(
                    { _id: transaction_Data._id },
                    { status: "sold" }
                )

                await calculateAndSaveCarbonRecord(saved_Order._id)

                await Matches.deleteMany({ wasteListings_id: transaction_Data._id })

                // buyer notification
                createNotifications({
                    user_id: transaction_Data.buyer_id,
                    type: "payment",
                    title: "Payment Success",
                    message: "Your payment has been successful",
                    created_at: new Date().toISOString()
                })

                createNotifications({
                    user_id: transaction_Data.buyer_id,
                    type: "order",
                    title: "Order Pending",
                    message: `Your order(${saved_Order.order_reference_number}) has been placed successfully`,
                    created_at: new Date().toISOString()
                })

                // seller notification
                createNotifications({
                    user_id: transaction_Data.seller_id,
                    type: "order",
                    title: "New Order",
                    message: `You have a new order (${saved_Order.order_reference_number})`,
                    created_at: new Date().toISOString()
                })

                return res.redirect(process.env.USERS_FRONTEND_URL + process.env.PAYMENT_SUCCESS_REDIRECT_URL);
            case "CANCEL":
                const payment_data = payment_Status_Save(decision)

                // buyer notification
                createNotifications({
                    user_id: transaction_Data.buyer_id,
                    type: "payment",
                    title: "Payment Cancelled",
                    message: `Your payment for (${transaction_Data.title}) has been cancelled`,
                    created_at: new Date().toISOString()
                })
                return res.redirect(process.env.USERS_FRONTEND_URL + process.env.PAYMENT_FAILED_REDIRECT_URL);
            default:
                return res.redirect(process.env.USERS_FRONTEND_URL + process.env.BUYER_DASHBOARD_REDIRECT_URL);
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
    const responseUrl = process.env.USERS_BACKEND_URL + process.env.CYBERSOURCE_CUSTOM_RESPONSE_URL;

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
