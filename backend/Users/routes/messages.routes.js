const express = require('express')
const router = express.Router()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const {
    getAllBuyerConversations,
    getAllSellerConversations,
    getMessages,
    startChat,
    sendMessage,
    checkOnlineStatus
} = require("../controllers/messages.controller.js")

// get
router.get("/get-all-buyer-conversations", verifyUser, getAllBuyerConversations)
router.get("/get-all-seller-conversations", verifyUser, getAllSellerConversations)
router.get("/get-messages/:conversationId", verifyUser, getMessages)
router.get("/check-online-status/:userId", checkOnlineStatus)

// post
router.post("/start-chat", startChat)
router.post("/send-message/:conversationId", verifyUser, sendMessage)

module.exports = router
