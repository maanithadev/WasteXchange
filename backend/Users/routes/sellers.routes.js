const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")
const Orders = require("../models/orders.model.js")
const SellerDetails = require("../models/sellerDetails.model.js")
const Notifications = require("../models/notifications.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const mongoose = require("mongoose");

// get
router.get("/seller-dashboard-cards", verifyUser, async (req, res) => {
    try {
        const wasteListings = await WasteListings.countDocuments({ seller_id: req.token.user_id, status: "active" })
        const orders = await Orders.countDocuments({ seller_id: req.token.user_id, status: "pending" })
        const notifications = await Notifications.countDocuments({ user_id: req.token.user_id, isRead: false })
        const currentYear = new Date().getFullYear().toString();

        const carbonRecordsAllTime = await CarbonRecords.aggregate([
            { $match: { seller_id: new mongoose.Types.ObjectId(req.token.user_id) } },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$co2SavedKg" }
                }
            }
        ]);
        const totalCarbonAllTime = carbonRecordsAllTime.length > 0 ? carbonRecordsAllTime[0].totalSum : 0;

        const currentYearDocs = await CarbonRecords.find({
            seller_id: new mongoose.Types.ObjectId(req.token.user_id),
            created_at: { $regex: `^${currentYear}` }
        });

        let totalCarbonCurrentYear = 0;

        const monthlyData = [
            { name: 'Jan', co2Saved: 0 },
            { name: 'Feb', co2Saved: 0 },
            { name: 'Mar', co2Saved: 0 },
            { name: 'Apr', co2Saved: 0 },
            { name: 'May', co2Saved: 0 },
            { name: 'Jun', co2Saved: 0 },
            { name: 'Jul', co2Saved: 0 },
            { name: 'Aug', co2Saved: 0 },
            { name: 'Sep', co2Saved: 0 },
            { name: 'Oct', co2Saved: 0 },
            { name: 'Nov', co2Saved: 0 },
            { name: 'Dec', co2Saved: 0 }
        ];

        currentYearDocs.forEach(doc => {
            totalCarbonCurrentYear += doc.co2SavedKg;

            if (doc.created_at && doc.created_at.length >= 7) {
                const monthStr = doc.created_at.substring(5, 7);
                const monthIndex = parseInt(monthStr, 10) - 1;

                if (monthIndex >= 0 && monthIndex <= 11) {
                    monthlyData[monthIndex].co2Saved += (doc.co2SavedKg / 1000);
                }
            }
        });

        res.json({
            activeListings: wasteListings,
            pendingOrders: orders,
            unreadNotifications: notifications,
            totalCarbonSaved: (totalCarbonAllTime / 1000),
            currentYearCarbonSaved: (totalCarbonCurrentYear / 1000),
            chartData: monthlyData
        })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/get-seller-details", verifyUser, async (req, res) => {
    try {
        const user = await SellerDetails.findOne({ user_id: req.token.user_id })
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
        const user = await SellerDetails.updateOne(
            { user_id: req.token.user_id },
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
