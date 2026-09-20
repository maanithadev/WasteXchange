const express = require("express")
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    getAllPayments,
    adminDashboardCards,
    buyerSimpleInfo,
    sellerSimpleInfo,
    checkout,
    paymentResponse
} = require("../controllers/payment.controller.js")

// get
router.get("/get-all-payments", verifyUser, getAllPayments)
router.get("/admin-dashboard-cards", verifyUser, adminDashboardCards)
router.get("/buyer-simple-info", verifyUser, buyerSimpleInfo)
router.get("/seller-simple-info", verifyUser, sellerSimpleInfo)

// post
router.post('/checkout', checkout)
router.post('/payment/response', paymentResponse)

module.exports = router
