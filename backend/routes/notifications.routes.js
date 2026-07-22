const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Notification = require("../models/notifications.model.js")
const User = require("../models/users.model.js")
const AdminAnnouncements = require("../models/adminAnnouncements.model.js")

//get
router.get("/specific-user-notifications", verifyUser, async (req, res) => {
    try {
        const notifications = await Notification.find({ user_id: req.token.user_id })
            .sort({ created_at: -1 })
            .limit(10)
        res.json(notifications)
    } catch (err) {
        res.json({ message: err.message })
    }
})
router.get("/mark-read/:id", verifyUser, async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, user_id: req.token.user_id },
            { isRead: true },
            { new: true }
        )
        res.json(notification)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/mark-all-read", verifyUser, async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { user_id: req.token.user_id, isRead: false },
            { isRead: true }
        )
        res.json({ success: true, modifiedCount: result.modifiedCount })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/all-admin-announcements", verifyUser, async (req, res) => {
    try {
        const result = await AdminAnnouncements.find().sort({ send_date: -1 })
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
    }
})


//post
router.post("/admin-announcement", verifyUser, async (req, res) => {
    try {
        const { title, message, target_audience } = req.body.formData
        if (target_audience === "sellers") {
            const sellers = await User.find({ role: "seller" })
            sellers.forEach(seller => {
                const notification = new Notification({
                    user_id: seller._id,
                    type: "admin_announcement",
                    title: title,
                    message: message,
                    created_at: new Date()
                })
                notification.save()
            })
        } else if (target_audience === "buyers") {
            const buyers = await User.find({ role: "buyer" })
            buyers.forEach(buyer => {
                const notification = new Notification({
                    user_id: buyer._id,
                    type: "admin_announcement",
                    title: title,
                    message: message,
                    created_at: new Date()
                })
                notification.save()
            })
        } else {
            const users = await User.find()
            users.forEach(user => {
                const notification = new Notification({
                    user_id: user._id,
                    type: "admin_announcement",
                    title: title,
                    message: message,
                    created_at: new Date()
                })
                notification.save()
            })
        }
        const adminAnnouncements = await new AdminAnnouncements({
            title: title,
            message: message,
            audience: target_audience,
            send_date: new Date()
        })
        const saved_admin_Announcement = await adminAnnouncements.save()
        res.json(saved_admin_Announcement)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
