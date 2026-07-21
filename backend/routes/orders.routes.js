const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Orders = require("../models/orders.model.js")
const Payments = require("../models/payments.model.js")
const WasteListings = require("../models/wasteListings.model.js")

// get
router.get("/buyer-simple-info", verifyUser, async (req, res) => {
    try {
        const orders = await Orders.find({ buyer_id: req.token.user_id })
            .sort({ ordered_date: -1 })
            .populate("sellerDetails", "company_name")
            .populate("wasteListings_id", "title")
        res.json(orders)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/buyer-track-order/:id", verifyUser, async (req, res) => {
    try {
        const order = await Orders.findOne({ order_reference_number: req.params.id })
            .populate("sellerDetails", "-email -password")
            .populate("wasteListings_id")
        const payment = await Payments.findOne({ order_id: order._id })
        res.json({ order, payment })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/mark-collected/:id", verifyUser, async (req, res) => {
    try {
        const order = await Orders.findOneAndUpdate(
            { _id: req.params.id, buyer_id: req.token.user_id },
            { status: "collected", collected_date: new Date() },
            { new: true }
        )
        res.json(order)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-simple-info", verifyUser, async (req, res) => {
    try {
        const orders = await Orders.find({ seller_id: req.token.user_id }, "quantity unit status ordered_date buyer_id wasteListings_id")
            .sort({ ordered_date: -1 })
            .populate("buyerDetails", "company_name -_id")
            .populate("wasteListings_id", "title -_id");
        res.json(orders)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-order-advance-info/:id", verifyUser, async (req, res) => {
    try {
        const order = await Orders.findOne({ _id: req.params.id }, "-_id -wasteListings_id -seller_id -buyer_id -cyberSourceTransaction_id -__v -created_at -updated_at -bill_to_email -id")
            .populate("wasteListings_id", "-_id title")
        res.json(order)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router


// post
router.post("/update-status", verifyUser, async (req, res) => {
    try {
        const { order_id, status } = req.body;
        if (status === "cancelled") {
            const order = await Orders.findOne({ _id: order_id })
            await WasteListings.updateOne(
                { _id: order.wasteListings_id },
                { status: "Active" }
            )
            await Payments.updateOne(
                { order_id: order_id },
                { payment_status: "refunded" }
            )
            await Orders.updateOne(
                { _id: order_id },
                { status }
            )
        } else {
            await Orders.updateOne(
                { _id: order_id },
                { status }
            );
        }
        res.json({ message: "Order status updated successfully", status });
    } catch (err) {
        res.json({ message: err.message });
    }
});
