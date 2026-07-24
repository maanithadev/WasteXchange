const express = require('express')
const router = express.Router()
require("dotenv").config()
const verifyToken = require("../middleware/verifyUser.middleware.js");
const ContactModel = require("../models/contact.model.js");

// get
router.get("/", verifyToken, async (req, res) => {
    try {
        const contacts = await ContactModel.find().sort({ created_at: -1 });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// post
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new ContactModel({
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString()
        });

        await newContact.save();
        res.status(201).json({ message: "Contact message sent successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// put
router.put("/:id/read", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await ContactModel.findByIdAndUpdate(id, { isRead: true });
        res.status(200).json({ message: "Marked as read successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router
