const mongoose = require('mongoose')

const sellerDetailsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
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
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("sellerDetails", sellerDetailsSchema)
