const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
    wasteListings_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wasteListings"
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    cyberSourceTransaction_id: {
        // Traces this order back to the accepted CyberSource response it was
        // created from, without needing to join through "payments" first.
        type: mongoose.Schema.Types.ObjectId,
        ref: "cybersourceTransactions"
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    total_price: {
        type: Number
    },
    currency: {
        type: String
    },
    status: {       // "pending" | "confirmed" | "collected" | "cancelled"
        type: String
    },
    ordered_date: {
        type: String
    },
    collected_date: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
})

module.exports = mongoose.model("orders", ordersSchema)
