const express = require('express')
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")

router.get("/get-all-wastelistings", verifyUser, async (req, res) => {
    try {
        const wastelistings = await WasteListings.find().populate("seller_id", "company_name")
        res.json(wastelistings)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
