const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
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
    status: {
        type: String,
        required: true,
        enum: ["pending", "active", "suspend"]
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)
