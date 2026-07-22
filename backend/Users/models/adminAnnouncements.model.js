const mongoose = require("mongoose")

const adminAnnouncementsSchema = mongoose.Schema({
    title: {
        type: String
    },
    message: {
        type: String
    },
    audience: {
        type: String
    },
    send_date: {
        type: String
    }
})

module.exports = mongoose.model("adminAnnouncements", adminAnnouncementsSchema)
