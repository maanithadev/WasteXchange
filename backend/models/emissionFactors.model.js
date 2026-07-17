const mongoose = require("mongoose");

const emissionFactorsSchema = mongoose.Schema({
    category: {
        type: String,
        unique: true
    },
    co2FactorPerKg: {
        type: Number
    },
    source: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
})

module.exports = mongoose.model("emissionFactors", emissionFactorsSchema)
