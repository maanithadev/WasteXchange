const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Notification = require("../models/notifications.model.js")

router.get("/specific-user-notifications", verifyUser, async (req, res) => {
    try {
        const notifications = await Notification.find({ user_id: req.token.user_id })
            .sort({ created_at: -1 })
            .limit(5)
        res.json(notifications)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
