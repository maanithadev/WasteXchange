const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    sellerDashboardCards,
    getSellerDetails,
    getAllWasteListings,
    updateSellerDetails
} = require("../controllers/sellers.controller.js")

// get
router.get("/seller-dashboard-cards", verifyUser, sellerDashboardCards)
router.get("/get-seller-details", verifyUser, getSellerDetails)
router.get("/get-all-waste-listings", verifyUser, getAllWasteListings)

// put
router.put("/update-seller-details", verifyUser, updateSellerDetails)

module.exports = router
