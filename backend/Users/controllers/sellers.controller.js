require("dotenv").config()
const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")
const Orders = require("../models/orders.model.js")
const SellerDetails = require("../models/sellerDetails.model.js")
const Notifications = require("../models/notifications.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const mongoose = require("mongoose");

const sellerDashboardCards = async (req, res) => {
    try {
        const wasteListings = await WasteListings.countDocuments({ seller_id: req.token.user_id, status: "active" })
        const orders = await Orders.countDocuments({ seller_id: req.token.user_id, status: "pending" })
        const notifications = await Notifications.countDocuments({ user_id: req.token.user_id, isRead: false })
        const startOfYear = new Date();
        startOfYear.setMonth(0, 1);
        startOfYear.setHours(0, 0, 0, 0);

        const startOfNextYear = new Date(startOfYear);
        startOfNextYear.setFullYear(startOfNextYear.getFullYear() + 1);

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
            created_at: { $gte: startOfYear, $lt: startOfNextYear }
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

            if (doc.created_at) {
                const monthIndex = new Date(doc.created_at).getMonth();

                if (monthIndex >= 0 && monthIndex <= 11) {
                    monthlyData[monthIndex].co2Saved += (doc.co2SavedKg / 1000);
                }
            }
        });

        res.json({
            activeListings: wasteListings,
            pendingOrders: orders,
            unreadNotifications: notifications,
            totalCarbonSaved: Number((totalCarbonAllTime / 1000).toFixed(2)),
            currentYearCarbonSaved: Number((totalCarbonCurrentYear / 1000).toFixed(2)),
            chartData: monthlyData.map(d => ({ ...d, co2Saved: Number(d.co2Saved.toFixed(2)) }))
        })
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getSellerDetails = async (req, res) => {
    try {
        const user = await SellerDetails.findOne({ user_id: req.token.user_id })
        res.json(user)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getAllWasteListings = async (req, res) => {
    try {
        const wasteListings = await WasteListings.find({ seller_id: req.token.user_id }).sort({ updated_at: -1 })
        res.json(wasteListings)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const updateSellerDetails = async (req, res) => {
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
                    },
                    updated_at: new Date().toISOString()
                }
            }
        )
        res.json({ message: "update Success" })
    } catch (err) {
        res.json({ message: err.message })
    }
}

module.exports = {
    sellerDashboardCards,
    getSellerDetails,
    getAllWasteListings,
    updateSellerDetails
}
