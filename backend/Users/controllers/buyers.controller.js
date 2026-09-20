const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")
const Orders = require("../models/orders.model.js")
const BuyerDetails = require("../models/buyerDetails.model.js")
const Notifications = require("../models/notifications.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const Matches = require("../models/matches.model.js")
const mongoose = require("mongoose");

const getBuyerDetails = async (req, res) => {
    try {
        const buyerDetails = await BuyerDetails.findOne({ user_id: req.token.user_id })
        res.json(buyerDetails)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const buyerDashboardCards = async (req, res) => {
    try {
        const matchedListings = await Matches.countDocuments({ buyer_id: req.token.user_id })
        const activeOrders = await Orders.countDocuments({ buyer_id: req.token.user_id, status: { $ne: "collected" } })

        const unreadNotifications = await Notifications.countDocuments({ user_id: req.token.user_id, isRead: false })

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const startOfNextMonth = new Date(startOfMonth);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const startOfYear = new Date();
        startOfYear.setMonth(0, 1);
        startOfYear.setHours(0, 0, 0, 0);

        const startOfNextYear = new Date(startOfYear);
        startOfNextYear.setFullYear(startOfNextYear.getFullYear() + 1);

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
                    created_at: { $gte: startOfMonth, $lt: startOfNextMonth }
                }
            },
            { $group: { _id: null, totalSum: { $sum: "$co2SavedKg" } } }
        ]);
        const currentMonthCarbonSaved = carbonRecordsMonth.length > 0 ? carbonRecordsMonth[0].totalSum : 0;

        // Current Year Carbon & Chart Data (for BuyerCarbonFootprintDashboard)
        const currentYearDocs = await CarbonRecords.find({
            buyer_id: new mongoose.Types.ObjectId(req.token.user_id),
            created_at: { $gte: startOfYear, $lt: startOfNextYear }
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
            if (doc.created_at) {
                const monthIndex = new Date(doc.created_at).getMonth();
                if (monthIndex >= 0 && monthIndex <= 11) {
                    monthlyData[monthIndex].co2Saved += (doc.co2SavedKg / 1000);
                }
            }
        });

        res.json({
            matchedListings,
            activeOrders,
            unreadNotifications,
            currentMonthCarbonSaved: Number((currentMonthCarbonSaved / 1000).toFixed(2)),
            totalCarbonSaved: Number((totalCarbonSaved / 1000).toFixed(2)),
            currentYearCarbonSaved: Number((currentYearCarbonSaved / 1000).toFixed(2)),
            chartData: monthlyData.map(d => ({ ...d, co2Saved: Number(d.co2Saved.toFixed(2)) }))
        })
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getAllWasteListings = async (req, res) => {
    try {
        const wasteListings = await WasteListings.find({ status: "active" }).sort({ created_at: -1 })
        res.json(wasteListings)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getSingleWasteListing = async (req, res) => {
    try {
        const wasteListing = await WasteListings.findOne({ _id: req.params.id }).populate('sellerDetails', '-email -password');
        res.json(wasteListing)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getWasteMatchScore = async (req, res) => {
    try {
        const match = await Matches.findOne({ wasteListings_id: req.params.id, buyer_id: req.token.user_id });
        if (match) {
            res.json({ matchScore: match.matchScore });
        } else {
            res.json({ matchScore: null });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
}

const updateBuyerDetails = async (req, res) => {
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
    getBuyerDetails,
    buyerDashboardCards,
    getAllWasteListings,
    getSingleWasteListing,
    getWasteMatchScore,
    updateBuyerDetails
}
