const mongoose = require("mongoose");

const carbonRecordsSchema = mongoose.Schema({
    order_id: {     // through this order_id i can get the wasteListing_id, seller_id, buyer_id
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    co2SavedKg: {
        type: Number,
        required: true
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
})

module.exports = mongoose.model("carbonRecords", carbonRecordsSchema)
