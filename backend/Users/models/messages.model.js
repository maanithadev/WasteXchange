const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations",
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date
    }
})

module.exports = mongoose.model("messages", messagesSchema)
