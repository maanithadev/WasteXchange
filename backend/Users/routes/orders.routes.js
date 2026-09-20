const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    buyerSimpleInfo,
    buyerTrackOrder,
    markCollected,
    sellerSimpleInfo,
    sellerOrderAdvanceInfo,
    updateStatus
} = require("../controllers/orders.controller.js")

// get
router.get("/buyer-simple-info", verifyUser, buyerSimpleInfo)
router.get("/buyer-track-order/:id", verifyUser, buyerTrackOrder)
router.get("/mark-collected/:id", verifyUser, markCollected)
router.get("/seller-simple-info", verifyUser, sellerSimpleInfo)
router.get("/seller-order-advance-info/:id", verifyUser, sellerOrderAdvanceInfo)

// post
router.post("/update-status", verifyUser, updateStatus)

module.exports = router
