const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    verifyUserToken,
    getAllUsers,
    signup,
    login,
    changePassword,
    forgotPassword,
    updateUserRoleAndStatus
} = require("../controllers/users.controller.js")

// get
router.get("/verifyUser", verifyUserToken)
router.get("/get-all-users", verifyUser, getAllUsers)

// post
router.post("/signup", signup)
router.post("/login", login)
router.post("/change-password", verifyUser, changePassword)
router.post("/forgot-password", forgotPassword)

// put
router.put("/update-user-roleandstatus", verifyUser, updateUserRoleAndStatus)

module.exports = router
