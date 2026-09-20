const express = require('express')
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    getBuyerDetails,
    buyerDashboardCards,
    getAllWasteListings,
    getSingleWasteListing,
    getWasteMatchScore,
    updateBuyerDetails
} = require("../controllers/buyers.controller.js")

// get
router.get("/get-buyer-details", verifyUser, getBuyerDetails)
router.get("/buyer-dashboard-cards", verifyUser, buyerDashboardCards)
router.get("/get-all-waste-listings", getAllWasteListings)
router.get("/get-single-waste-listing/:id", getSingleWasteListing)
router.get("/get-waste-match-score/:id", verifyUser, getWasteMatchScore)

// put
router.put("/update-buyer-details", verifyUser, updateBuyerDetails)

module.exports = router
