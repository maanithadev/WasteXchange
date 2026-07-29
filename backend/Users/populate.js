require("dotenv").config()
const connectDB = require("./config/database")
const EmissionFactors = require("./models/emissionFactors.model.js")

const data = [
    {
        category: "Construction",
        co2FactorPerKg: 0.0019,
        source: "US EPA WARM v16 (2024) — average for mixed C&D debris (concrete, asphalt, drywall) diverted from landfill vs. disposal",
        created_at: new Date(),
        updated_at: new Date()
    }
]

connectDB()

const populate = async () => {
    await EmissionFactors.create(data)
    console.log("data seeded")
}

populate()

module.exports = populate
