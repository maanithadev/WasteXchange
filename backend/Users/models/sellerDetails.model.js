const mongoose = require('mongoose')

const sellerDetailsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
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
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("sellerDetails", sellerDetailsSchema)
