const mongoose = require("mongoose");

const wasteListingsSchema = mongoose.Schema({
    waste_image: {
        type: String,
    },
    waste_title: {
        type: String
    },
    waste_category: {
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
})

module.exports = mongoose.model("wasteListings", wasteListingsSchema)
