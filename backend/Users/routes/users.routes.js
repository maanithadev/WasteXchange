const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Users = require("../models/users.model.js")
const SellerDetails = require("../models/sellerDetails.model.js")
const BuyerDetails = require("../models/buyerDetails.model.js")
const WasteListings = require("../models/wasteListings.model.js")
const CarbonRecords = require("../models/carbonRecords.model.js")
const Payments = require("../models/payments.model.js")
const Notifications = require("../models/notifications.model.js")
const matchedRecommendations = require("../helpers/matchedRecommendations.helper");

// get
router.get("/verifyUser", async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)
            const foundUser = await Users.findById(user.user_id)
            if (!foundUser) return res.json({ message: 'No user found' })
            if (foundUser.status === "suspended") return res.json({ message: 'User Account is Suspended' })
            res.json(user)
        } else {
            res.status(401).json({ message: 'No token provided' })
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' })
    }
})

router.get("/admin-dashboard-summary", verifyUser, async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments({});
        const totalSellers = await Users.countDocuments({ role: "seller" });
        const totalBuyers = await Users.countDocuments({ role: "buyer" });
        const activeListings = await WasteListings.countDocuments({ status: "active" });
        const totalTransactions = await Payments.countDocuments({});

        const allCarbon = await CarbonRecords.find({});
        let carbonSavedKg = 0;
        allCarbon.forEach(record => {
            if (record.co2SavedKg) carbonSavedKg += record.co2SavedKg;
        });
        const carbonSavedTons = carbonSavedKg / 1000;

        const allUsers = await Users.find({});
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        const userMap = {};
        for (let i = 0; i < 12; i++) {
            const d = new Date(now.getFullYear(), i, 1);
            const key = d.toLocaleDateString("en-US", { month: "short" });
            userMap[key] = 0;
        }

        allUsers.forEach(user => {
            if (!user.created_at) return;
            const d = new Date(user.created_at);
            if (d >= startOfYear && d <= now) {
                const key = d.toLocaleDateString("en-US", { month: "short" });
                if (userMap[key] !== undefined) {
                    userMap[key] += 1;
                }
            }
        });

        const chartData = Object.keys(userMap).map(key => ({ name: key, value: userMap[key] }));

        let allNotifications = await Notifications.find({});
        allNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const recentActivity = allNotifications.slice(0, 20);

        res.json({
            totalUsers,
            totalSellers,
            totalBuyers,
            activeListings,
            totalTransactions,
            carbonSavedTons: parseFloat(carbonSavedTons.toFixed(2)),
            chartData,
            recentActivity
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/admin-reports-charts", verifyUser, async (req, res) => {
    try {
        const filter = req.query.filter || "Year to Date";

        const allUsers = await Users.find({});
        const allListings = await WasteListings.find({});
        const allCarbon = await CarbonRecords.find({});

        const now = new Date();
        let startDate = new Date();

        if (filter === "Last 7 Days") {
            startDate.setDate(now.getDate() - 7);
        } else if (filter === "Last 30 Days") {
            startDate.setDate(now.getDate() - 30);
        } else if (filter === "Last Quarter") {
            startDate.setMonth(now.getMonth() - 3);
        } else {
            // Year to Date
            startDate = new Date(now.getFullYear(), 0, 1);
        }

        const getSortKey = (date) => {
            const d = new Date(date);
            const pad = n => n.toString().padStart(2, '0');
            if (filter === "Year to Date" || filter === "Last Quarter") {
                return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
            } else {
                return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            }
        };

        const wasteMap = {};
        const carbonMap = {};
        const userMap = {};

        // Pre-fill maps with 0 for all expected dates in range
        const tempDate = new Date(startDate);
        while (tempDate <= now) {
            const key = getSortKey(tempDate);
            wasteMap[key] = 0;
            carbonMap[key] = 0;
            userMap[key] = 0;

            if (filter === "Year to Date" || filter === "Last Quarter") {
                tempDate.setMonth(tempDate.getMonth() + 1);
            } else {
                tempDate.setDate(tempDate.getDate() + 1);
            }
        }

        allListings.forEach(item => {
            if (!item.created_at) return;
            const d = new Date(item.created_at);
            if (d >= startDate && d <= now) {
                const key = getSortKey(d);
                let val = item.quantity || 0;
                if (item.unit && item.unit.toLowerCase() === 'kg') val = val / 1000;
                wasteMap[key] = (wasteMap[key] || 0) + val;
            }
        });

        allCarbon.forEach(item => {
            if (!item.created_at) return;
            const d = new Date(item.created_at);
            if (d >= startDate && d <= now) {
                const key = getSortKey(d);
                carbonMap[key] = (carbonMap[key] || 0) + ((item.co2SavedKg || 0) / 1000);
            }
        });

        allUsers.forEach(item => {
            if (!item.created_at) return;
            const d = new Date(item.created_at);
            if (d >= startDate && d <= now) {
                const key = getSortKey(d);
                userMap[key] = (userMap[key] || 0) + 1;
            }
        });

        const getFriendlyLabel = (sortKey) => {
            if (sortKey.length === 7) {
                const [y, m] = sortKey.split('-');
                const d = new Date(y, parseInt(m) - 1, 1);
                return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
            } else {
                const [y, m, d] = sortKey.split('-');
                const date = new Date(y, parseInt(m) - 1, parseInt(d));
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            }
        };

        const toSortedArray = (map) => {
            return Object.keys(map)
                .sort()
                .map(key => ({
                    name: getFriendlyLabel(key),
                    value: map[key] === 0 ? 0 : parseFloat(map[key].toFixed(2))
                }));
        };

        res.json({
            wasteData: toSortedArray(wasteMap),
            carbonData: toSortedArray(carbonMap),
            userData: toSortedArray(userMap)
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/get-all-users", verifyUser, async (req, res) => {
    try {
        // Find all users whose role is NOT "admin"
        const users = await Users.find({ role: { $ne: "admin" } }, "-__v -password");

        let combinedUsers = [];

        for (let user of users) {
            let details = null;
            if (user.role === "seller") {
                details = await SellerDetails.findOne({ user_id: user._id });
            } else if (user.role === "buyer") {
                details = await BuyerDetails.findOne({ user_id: user._id });
            }

            // Convert mongoose document to plain object
            const userObj = user.toObject();

            // Merge details into user object if they exist
            if (details) {
                userObj.company_name = details.company_name || "N/A";
                userObj.phone_number = details.phone_number || "N/A";
                userObj.address = details.address || {
                    street: "N/A",
                    city: "N/A",
                    state: "N/A",
                    postal_code: "N/A",
                    country: "N/A"
                };
            } else {
                userObj.company_name = "N/A";
                userObj.phone_number = "N/A";
                userObj.address = {
                    street: "N/A",
                    city: "N/A",
                    state: "N/A",
                    postal_code: "N/A",
                    country: "N/A"
                };
            }

            combinedUsers.push(userObj);
        }

        res.json(combinedUsers);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// post
router.post("/signup", async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await Users.findOne({ email })
        if (existingUser) return res.json({ message: "Email already exists. Retry using another Email" })

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = new Users({
            role: req.body.role,
            email: req.body.email,
            password: hashedPassword,
            status: "active",
            created_at: new Date(),
            updated_at: new Date()
        })
        const savedUser = await userData.save()

        if (req.body.role === "seller") {
            const sellerData = await new SellerDetails({
                user_id: savedUser._id,
                company_name: req.body.company_name,
                phone_number: req.body.phone_number,
                address: {
                    street: req.body.address?.street,
                    city: req.body.address?.city,
                    state: req.body.address?.state,
                    postal_code: req.body.address?.postal_code,
                    country: req.body.address?.country
                },
                created_at: new Date(),
                updated_at: new Date()
            })
            await sellerData.save()
        } else {
            const buyerData = await new BuyerDetails({
                user_id: savedUser._id,
                company_name: req.body.company_name,
                phone_number: req.body.phone_number,
                address: {
                    street: req.body.address?.street,
                    city: req.body.address?.city,
                    state: req.body.address?.state,
                    postal_code: req.body.address?.postal_code,
                    country: req.body.address?.country
                },
                interested_category: req.body.interested_category,
                minqty: req.body.minqty,
                maxqty: req.body.maxqty,
                created_at: new Date(),
                updated_at: new Date()
            })
            const saved_buyer = await buyerData.save()

            const wasteListings = await WasteListings.find({ category: saved_buyer.interested_category })
            wasteListings.forEach(waste => {
                matchedRecommendations(waste.location, saved_buyer.address, waste.quantity, saved_buyer.minqty, saved_buyer.maxqty, waste._id, saved_buyer.user_id)
            })
        }

        const token = jwt.sign({
            user_id: savedUser._id,
            role: savedUser.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ message: 'User saved successfully.', token, role: savedUser.role })
    } catch (err) {
        res.status(400).send({ message: "server error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await Users.findOne({ email })
        if (!userExists) return res.json({ message: "User not found" })

        if (password === "") return res.json({ message: "Passwords is empty" })

        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if (!passwordMatch) return res.json({ message: "password wrong" })

        if (userExists.status === "suspended") return res.json({ message: 'User Account is Suspended' })

        const token = jwt.sign({
            user_id: userExists._id,
            role: userExists.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ message: 'User logged in successfully.', token, role: userExists.role })
    } catch (err) {
        res.send({ message: "server error" })
    }
})

router.post("/change-password", verifyUser, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await Users.findOne({ _id: req.token.user_id });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne(
            { _id: req.token.user_id },
            { password: hashedPassword }
        );

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/forgot-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne(
            { email },
            { password: hashedPassword }
        );

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//put
router.put("/update-user-status", verifyUser, async (req, res) => {
    try {
        const users = await Users.updateOne(
            { _id: req.body.user_id },
            { status: req.body.status || "suspended" }
        );
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
