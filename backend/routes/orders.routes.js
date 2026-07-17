const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Orders = require("../models/orders.model.js")

router.get("/buyer-simple-info", verifyUser, async (req, res) => {
    try {
        const orders = await Orders.find({ buyer_id: req.token.user_id })
            .sort({ ordered_date: -1 })
            .populate("seller_id", "company_name")
            .populate("wasteListings_id", "title")
        res.json(orders)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-simple-info", verifyUser, async (req, res) => {
    try {
        const orders = await Orders.find({ seller_id: req.token.user_id }, "quantity unit status ordered_date")
            .sort({ ordered_date: -1 })
            .populate("buyer_id", "company_name -_id")
            .populate("wasteListings_id", "title -_id")
        res.json(orders)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/seller-order-advance-info/:id", verifyUser, async (req, res) => {
    try {
        const order = await Orders.findOne({ _id: req.params.id }, "-_id -wasteListings_id -seller_id -buyer_id -cyberSourceTransaction_id -__v -created_at -updated_at -bill_to_email")
            .populate("wasteListings_id", "-_id title")
        res.json(order)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
