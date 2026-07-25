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
        type: Date
    },
    updated_at: {
        type: Date
    }
})

module.exports = mongoose.model("contacts", contactsSchema)
