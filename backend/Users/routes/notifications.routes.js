const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    getSpecificUserNotifications,
    markRead,
    markAllRead,
    getAllAdminAnnouncements,
    createAdminAnnouncement
} = require("../controllers/notifications.controller.js")

//get
router.get("/specific-user-notifications", verifyUser, getSpecificUserNotifications)
router.get("/mark-read/:id", verifyUser, markRead)
router.get("/mark-all-read", verifyUser, markAllRead)
router.get("/all-admin-announcements", verifyUser, getAllAdminAnnouncements)

//post
router.post("/admin-announcement", verifyUser, createAdminAnnouncement)

module.exports = router
