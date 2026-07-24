const mongoose = require('mongoose')

const contactsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: String
    }
})

module.exports = mongoose.model("contacts", contactsSchema)
