const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: String,
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)
