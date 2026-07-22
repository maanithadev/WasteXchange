const mongoose = require("mongoose");

// strict: false is kept so we can store the full raw CyberSource response
// (field set varies by payment method / integration), but "decision" is
// pulled out as a real, typed field since it's what our order-creation
// if-condition branches on ("ACCEPT" | "FAILED" | others per CyberSource docs).
const cybersourceTransactionsSchema = mongoose.Schema({
    decision: {
        type: String // "ACCEPT" | "FAILED" (and any other CyberSource decision values)
    },
    processed: {
        // Marks whether reponse is not empty
        type: Boolean,
        default: false
    },
    raw_response: {
        // Full CyberSource response payload, untyped on purpose.
        type: mongoose.Schema.Types.Mixed
    },
    created_at: {
        type: String
    }
}, { strict: false });

module.exports = mongoose.model("cybersourceTransactions", cybersourceTransactionsSchema);
