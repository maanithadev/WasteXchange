const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
    user_id: {
        // Was type: String — fixed to ObjectId so it actually populate()s
        // and Mongoose can validate it against a real user.
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    // reference_id: {
    // New field. Points at whatever triggered this notification — most
    // often an "orders" document, since one order creates two notification
    // rows (one for the buyer, one for the seller), both sharing this
    // reference_id and differing only by user_id.
    // Polymorphic by design: what it refs depends on "type" below
    // ("order" -> orders._id, "message" -> a message doc, etc).
    // Mongoose can't enforce a dynamic ref at the schema level, so this
    // stays a plain ObjectId with the correct ref resolved in application code.
    // type: mongoose.Schema.Types.ObjectId
    // },
    type: {     // "order" | "payment" | "wasteListing" | "admin_announcement"
        type: String
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date
    },
})

module.exports = mongoose.model("notifications", notificationsSchema)
