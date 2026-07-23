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
    order_reference_number: {
        type: String
    },
    address: {
        address_line1: {
            type: String
        },
        address_line2: {
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
        country: {
            type: String
        },
    },
    bill_to_email: {
        type: String
    },
    company_name: {
        type: String
    },
    forename: {
        type: String
    },
    surname: {
        type: String
    },
    phone: {
        type: String
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
    status: {       // "pending" | "confirmed" | "shipped" | "collected" | "cancelled"
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
}, {
    toJSON: { virtuals: true },   // important, so virtuals show up when converting to JSON
    toObject: { virtuals: true }  // important, so virtuals show up in .toObject()
})

ordersSchema.virtual("buyerDetails", {
    ref: "buyerDetails",       // the collection to populate from
    localField: "buyer_id",    // field on THIS (orders) schema
    foreignField: "user_id",   // field on the buyerDetails schema
    justOne: true              // one buyer has one buyerDetails doc
});

ordersSchema.virtual("sellerDetails", {
    ref: "sellerDetails",       // the collection to populate from
    localField: "seller_id",    // field on THIS (orders) schema
    foreignField: "user_id",   // field on the sellerDetails schema
    justOne: true              // one seller has one sellerDetails doc
});

module.exports = mongoose.model("orders", ordersSchema)
