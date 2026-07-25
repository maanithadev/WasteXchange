const mongoose = require('mongoose')

const buyerDetailsSchema = mongoose.Schema({
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
        type: Date
    },
    updated_at: {
        type: Date
    }
})

module.exports = mongoose.model("buyerDetails", buyerDetailsSchema)
