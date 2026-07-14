const express = require("express")
const router = express.Router()
const Notification = require("../models/notifications.model.js")

async function createNotifications({user_id, type, title, message, created_at}) {
    const newNotification = new Notification({
        user_id,
        type,
        title,
        message,
        created_at
    })
    await newNotification.save()
}

module.exports = createNotifications
