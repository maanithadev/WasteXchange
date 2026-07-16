const mongoose = require("mongoose");

const paymentsSchema = mongoose.Schema({
    order_id: {
        // Was type: String — fixed to ObjectId so this actually populate()s
        // and Mongoose can validate it points at a real order.
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
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
        // Was a bare "cyberSource_ref" string — fixed to a real ObjectId FK
        // into cybersourceTransactions so the settlement source is traceable
        // and populate-able, even though that collection stays schema-flexible.
        type: mongoose.Schema.Types.ObjectId,
        ref: "cybersourceTransactions"
    },
    transaction_id: {
        // CyberSource's own transaction reference/ID string, as returned in
        // their response — kept as a plain string since it's their identifier,
        // not ours.
        type: String
    },
    // seller_id / buyer_id removed: these are already on the linked "orders"
    // document (via order_id) and duplicating them here just risks the two
    // copies drifting apart if an order is ever amended.
    total_price: {
        type: Number
    },
    currency: {
        type: String
    },
    payment_method: {
        type: String
    },
    card_number: {
        type: String
    },
    card_type_name: {
        type: String
    },
    payment_status: {       // "completed" | "pending" | "failed" | "refunded" | "disputed"
        type: String
    },
    created_at: {
        type: String
    },
})

module.exports = mongoose.model("payments", paymentsSchema)
