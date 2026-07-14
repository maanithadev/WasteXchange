const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    type: {     // "match" | "order" | "message" | "system" | "admin_announcement"
        type: String
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: String
    },
})

module.exports = mongoose.model("notifications", notificationsSchema)
