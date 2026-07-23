const express = require('express')
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")
const Orders = require("../models/orders.model.js")
const BuyerDetails = require("../models/buyerDetails.model.js")
const Notifications = require("../models/notifications.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const Matches = require("../models/matches.model.js")
const mongoose = require("mongoose");

// get
router.get("/get-buyer-details", verifyUser, async (req, res) => {
    try {
        const buyerDetails = await BuyerDetails.findOne({ user_id: req.token.user_id })
        res.json(buyerDetails)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/buyer-dashboard-cards", verifyUser, async (req, res) => {
    try {
        const matchedListings = await Matches.countDocuments({ buyer_id: req.token.user_id })
        const activeOrders = await Orders.countDocuments({ buyer_id: req.token.user_id, status: { $ne: "collected" } })

        const unreadNotifications = await Notifications.countDocuments({ user_id: req.token.user_id, isRead: false })

        const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g. "2026-07"
        const currentYearStr = new Date().getFullYear().toString(); // e.g. "2026"

        // All-time Carbon
        const carbonRecordsAllTime = await CarbonRecords.aggregate([
            { $match: { buyer_id: new mongoose.Types.ObjectId(req.token.user_id) } },
            { $group: { _id: null, totalSum: { $sum: "$co2SavedKg" } } }
        ]);
        const totalCarbonSaved = carbonRecordsAllTime.length > 0 ? carbonRecordsAllTime[0].totalSum : 0;

        // Current Month Carbon (for BuyerDashboard)
        const carbonRecordsMonth = await CarbonRecords.aggregate([
            {
                $match: {
                    buyer_id: new mongoose.Types.ObjectId(req.token.user_id),
                    created_at: { $regex: `^${currentMonthStr}` }
                }
            },
            { $group: { _id: null, totalSum: { $sum: "$co2SavedKg" } } }
        ]);
        const currentMonthCarbonSaved = carbonRecordsMonth.length > 0 ? carbonRecordsMonth[0].totalSum : 0;

        // Current Year Carbon & Chart Data (for BuyerCarbonFootprintDashboard)
        const currentYearDocs = await CarbonRecords.find({
            buyer_id: new mongoose.Types.ObjectId(req.token.user_id),
            created_at: { $regex: `^${currentYearStr}` }
        });

        let currentYearCarbonSaved = 0;
        const monthlyData = [
            { name: 'Jan', co2Saved: 0 }, { name: 'Feb', co2Saved: 0 }, { name: 'Mar', co2Saved: 0 },
            { name: 'Apr', co2Saved: 0 }, { name: 'May', co2Saved: 0 }, { name: 'Jun', co2Saved: 0 },
            { name: 'Jul', co2Saved: 0 }, { name: 'Aug', co2Saved: 0 }, { name: 'Sep', co2Saved: 0 },
            { name: 'Oct', co2Saved: 0 }, { name: 'Nov', co2Saved: 0 }, { name: 'Dec', co2Saved: 0 }
        ];

        currentYearDocs.forEach(doc => {
            currentYearCarbonSaved += doc.co2SavedKg;
            if (doc.created_at && doc.created_at.length >= 7) {
                const monthStr = doc.created_at.substring(5, 7);
                const monthIndex = parseInt(monthStr, 10) - 1;
                if (monthIndex >= 0 && monthIndex <= 11) {
                    monthlyData[monthIndex].co2Saved += (doc.co2SavedKg / 1000);
                }
            }
        });

        res.json({
            matchedListings,
            activeOrders,
            unreadNotifications,
            currentMonthCarbonSaved: (currentMonthCarbonSaved / 1000),
            totalCarbonSaved: (totalCarbonSaved / 1000),
            currentYearCarbonSaved: (currentYearCarbonSaved / 1000),
            chartData: monthlyData
        })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/get-all-waste-listings", async (req, res) => {
    try {
        const wasteListings = await WasteListings.find({ status: "active" }).sort({ created_at: -1 })
        res.status(200).json(wasteListings)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.get("/get-single-waste-listing/:id", async (req, res) => {
    try {
        const wasteListing = await WasteListings.findOne({ _id: req.params.id }).populate('sellerDetails', '-email -password');
        res.status(200).json(wasteListing)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})


// put
router.put("/update-buyer-details", verifyUser, async (req, res) => {
    try {
        await BuyerDetails.updateOne(
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
