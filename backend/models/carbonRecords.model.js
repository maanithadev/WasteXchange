const mongoose = require("mongoose");

const carbonRecordsSchema = mongoose.Schema({
    order_id: {     // through this order_id i can get the wasteListing_id, seller_id, buyer_id
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    co2SavedKg: {
        type: Number
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
})

module.exports = mongoose.model("carbonRecords", carbonRecordsSchema)
