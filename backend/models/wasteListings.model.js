const mongoose = require("mongoose");

const wasteListingsSchema = mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
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
    unit: {     // "kg" | "tons" | "liters" etc.
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
    status: {       // "active" | "pending" | "sold" | "removed" | "flagged"
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

module.exports = mongoose.model("wasteListings", wasteListingsSchema)
