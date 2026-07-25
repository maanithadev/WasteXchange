const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {                  // buyer | seller
        type: String,
        required: true,
        enum: ["buyer", "seller"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {                  // active | suspended
        type: String,
        required: true,
        enum: ["active", "suspended"]
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

module.exports = mongoose.model("users", userSchema)
