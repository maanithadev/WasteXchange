const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Notification = require("../models/notifications.model.js")

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

module.exports = router
