const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")
const Orders = require("../models/orders.model.js")
const Notifications = require("../models/notifications.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const mongoose = require("mongoose");

// get
router.get("/seller-dashboard-cards", verifyUser, async (req, res) => {
    try {
        const wasteListings = await WasteListings.countDocuments({ seller_id: req.token.user_id, status: "Active" })
        const orders = await Orders.countDocuments({ seller_id: req.token.user_id, status: "pending" })
        const notifications = await Notifications.countDocuments({ user_id: req.token.user_id, isRead: false })
        const carbonRecords = await CarbonRecords.aggregate([
            { $match: { seller_id: new mongoose.Types.ObjectId(req.token.user_id) } },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$co2SavedKg" }
                }
            }
        ]);

        const totalCarbon = carbonRecords.length > 0 ? carbonRecords[0].totalSum : 0;

        res.json({
            activeListings: wasteListings,
            pendingOrders: orders,
            unreadNotifications: notifications,
            totalCarbonSaved: (totalCarbon / 1000),  // converting to ton. 1ton = 1000kg. so converting kg to ton means /1000
        })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/get-seller-details", verifyUser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.token.user_id })
        res.json(user)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/get-all-waste-listings", verifyUser, async (req, res) => {
    try {
        const wasteListings = await WasteListings.find({ seller_id: req.token.user_id }).sort({ updated_at: -1 })
        res.status(200).json(wasteListings)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})


// put
router.put("/update-seller-details", verifyUser, async (req, res) => {
    try {
        const user = await User.updateOne(
            { _id: req.token.user_id },
            {
                $set: {
                    company_name: req.body.data.company_name,
                    phone_number: req.body.data.phone_number,
                    address: {
                        street: req.body.data.address?.street,
                        city: req.body.data.address?.city,
                        state: req.body.data.address?.state,
                        postal_code: req.body.data.address?.postal_code,
                        country: req.body.data.address?.country,
                    }
                }
            }
        )
        res.json({ message: "update Success" })
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
