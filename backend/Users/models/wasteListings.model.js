const mongoose = require("mongoose");

const wasteListingsSchema = mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Construction"]
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {     // "kg" | "tons"
        type: String,
        required: true,
        enum: ["kg", "tons"]
    },
    colour: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ["LKR", "$"]
    },
    location: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postal_code: {
            type: String
        },
    },
    status: {       // "active" | "pending" | "draft" | "rejected" | "review" | "send for review" | "sold"
        type: String,
        required: true,
        enum: ["active", "pending", "draft", "rejected", "review", "send for review", "sold"]
    },
    suspend_message: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, {
    toJSON: { virtuals: true },   // important, so virtuals show up when converting to JSON
    toObject: { virtuals: true }  // important, so virtuals show up in .toObject()
})

wasteListingsSchema.virtual("sellerDetails", {
    ref: "sellerDetails",       // the collection to populate from
    localField: "seller_id",    // field on THIS (orders) schema
    foreignField: "user_id",   // field on the buyerDetails schema
    justOne: true              // one buyer has one buyerDetails doc
});

module.exports = mongoose.model("wasteListings", wasteListingsSchema)
