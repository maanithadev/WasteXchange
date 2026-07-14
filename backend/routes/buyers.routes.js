const express = require('express')
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const WasteListings = require("../models/wasteListings.model.js")
const User = require("../models/users.model.js")

// get
router.get("/get-buyer-details", verifyUser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.token.user_id })
        res.json(user)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("/get-all-waste-listings", async (req, res) => {
    try {
        const wasteListings = await WasteListings.find()
        res.status(200).json(wasteListings)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.get("/get-single-waste-listing/:id", async (req, res) => {
    try {
        const wasteListing = await WasteListings.findOne({ _id: req.params.id }).populate('seller_id', '-email -password');
        res.status(200).json(wasteListing)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})


// put
router.put("/update-buyer-details", verifyUser, async (req, res) => {
    try {
        const user = await User.updateOne(
            { _id: req.token.user_id },
            {
                $set: {
                    company_name: req.body.data.company_name,
                    phone_number: req.body.data.phone_number,
                    address: {
                        street: req.body.data.address?.street,
                        city: req.body.data.address?.city,
                        state: req.body.data.address?.state,
                        postal_code: req.body.data.address?.postal_code,
                        country: req.body.data.address?.country,
                    }
                }
            }
        )
        res.json({message:"update Success"})
    } catch (err) {
        res.json({ message: err.message })
    }
})


module.exports = router
