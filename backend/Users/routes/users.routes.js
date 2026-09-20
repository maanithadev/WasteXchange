const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    verifyUserToken,
    adminDashboardSummary,
    adminReportsCharts,
    getAllUsers,
    signup,
    login,
    changePassword,
    forgotPassword,
    updateUserStatus
} = require("../controllers/users.controller.js")

// get
router.get("/verifyUser", verifyUserToken)
router.get("/admin-dashboard-summary", verifyUser, adminDashboardSummary)
router.get("/admin-reports-charts", verifyUser, adminReportsCharts)
router.get("/get-all-users", verifyUser, getAllUsers)

// post
router.post("/signup", signup)
router.post("/login", login)
router.post("/change-password", verifyUser, changePassword)
router.post("/forgot-password", forgotPassword)

// put
router.put("/update-user-status", verifyUser, updateUserStatus)

module.exports = router
