const mongoose = require("mongoose")

const adminAnnouncementsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        required: true
    },
    send_date: {
        type: Date
    }
})

module.exports = mongoose.model("adminAnnouncements", adminAnnouncementsSchema)
