const mongoose = require("mongoose");

const matchesSchema = mongoose.Schema({
    wasteListings_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wasteListings"
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    matchScore: {
        type: Number
    },
    created_at: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

matchesSchema.virtual("buyerDetails", {
    ref: "buyerDetails",
    localField: "buyer_id",
    foreignField: "user_id",
    justOne: true
})

module.exports = mongoose.model("matches", matchesSchema)
