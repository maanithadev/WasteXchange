const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations"
    },
    sender_id: {
        type: String
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: String
    }
})

module.exports = mongoose.model("messages", messagesSchema)
