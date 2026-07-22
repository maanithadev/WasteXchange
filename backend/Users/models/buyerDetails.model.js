const mongoose = require('mongoose')

const buyerDetailsSchema = mongoose.Schema({
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
    interested_category: {
        type: String,
    },
    minqty: {
        type: Number
    },
    maxqty: {
        type: Number
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("buyerDetails", buyerDetailsSchema)
