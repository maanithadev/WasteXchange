const mongoose = require("mongoose");

const conversationsSchema = mongoose.Schema({
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    last_message: {
        type: String,
        default:"hi!!!"
    },
    create_at: {
        type: String
    }
})

module.exports = mongoose.model("conversations", conversationsSchema)
