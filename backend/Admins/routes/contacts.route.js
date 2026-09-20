const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyToken = require("../middleware/verifyUser.middleware.js");
const {
    getContacts,
    createContact,
    markContactAsRead
} = require("../controllers/contacts.controller.js")

// get
router.get("/", verifyToken, getContacts);

// post
router.post("/", createContact);

// put
router.put("/:id/read", verifyToken, markContactAsRead);

module.exports = router
