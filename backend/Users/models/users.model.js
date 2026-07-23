const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {                  // buyer | seller
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {                  // active | suspended
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
