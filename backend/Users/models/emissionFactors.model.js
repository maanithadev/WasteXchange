const mongoose = require("mongoose");

const emissionFactorsSchema = mongoose.Schema({
    category: {
        type: String,
        unique: true,
        required: true
    },
    co2FactorPerKg: {
        type: Number,
        required: true
    },
    source: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
})

module.exports = mongoose.model("emissionFactors", emissionFactorsSchema)
