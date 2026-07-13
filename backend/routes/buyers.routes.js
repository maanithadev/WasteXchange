const express = require('express')
const router = express.Router()
const WasteListings = require("../models/wasteListings.model.js")

// get
router.get("/get-all-waste-listings", async (req, res) => {
    try {
        const wasteListings = await WasteListings.find()
        res.status(200).json(wasteListings)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

router.get("/get-single-waste-listing/:id", async (req, res) => {
    try {
        const wasteListing = await WasteListings.find({_id:req.params.id})
        res.status(200).json(wasteListing)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

module.exports = router
