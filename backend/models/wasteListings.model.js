const mongoose = require("mongoose");

const wasteListingsSchema = mongoose.Schema({
    seller_id: {
        type: String,
    },
    image: {
        type: String,
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    colour: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    },
    location: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        postal_code: {
            type: String
        },
    },
    status: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model("wasteListings", wasteListingsSchema)
