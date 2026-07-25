const mongoose = require("mongoose");

const matchesSchema = mongoose.Schema({
    wasteListings_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wasteListings",
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    matchScore: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date
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
