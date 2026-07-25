const mongoose = require("mongoose");

const conversationsSchema = mongoose.Schema({
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    last_message: {
        type: String,
    },
    create_at: {
        type: Date
    }
}, {
    toJSON: { virtuals: true },   // important, so virtuals show up when converting to JSON
    toObject: { virtuals: true }  // important, so virtuals show up in .toObject()
})

conversationsSchema.virtual("buyerDetails", {
    ref: "buyerDetails",       // the collection to populate from
    localField: "buyer_id",    // field on THIS (orders) schema
    foreignField: "user_id",   // field on the buyerDetails schema
    justOne: true              // one buyer has one buyerDetails doc
});

conversationsSchema.virtual("sellerDetails", {
    ref: "sellerDetails",       // the collection to populate from
    localField: "seller_id",    // field on THIS (orders) schema
    foreignField: "user_id",   // field on the sellerDetails schema
    justOne: true              // one seller has one sellerDetails doc
});

module.exports = mongoose.model("conversations", conversationsSchema)
