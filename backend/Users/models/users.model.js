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
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)
