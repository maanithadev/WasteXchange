const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    company_name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postal_code: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    status: {
        type: String,
    },
    profile_image: {
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
