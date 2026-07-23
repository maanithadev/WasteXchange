const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyUser = require("../middleware/verifyUser.middleware.js")
const Users = require("../models/users.model.js")

// get
router.get("/verifyUser", async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)
            const foundUser = await Users.findById(user.user_id)
            if (!foundUser) return res.json({ message: 'No user found' })
            if (foundUser.status === "suspended") return res.json({ message: 'User Account is Suspended' })
            res.json(user)
        } else {
            res.status(401).json({ message: 'No token provided' })
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' })
    }
})

router.get("/get-all-users", verifyUser, async (req, res) => {
    try {
        const users = await Users.find({}, "-password")
        res.json(users)
    } catch (err) {
        res.json({ message: err.mess })
    }
})


// post
router.post("/signup", async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await Users.findOne({ email })
        if (existingUser) return res.json({ message: "Email already exists. Retry using another Email" })

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userData = new Users({
            role: "need to assign",
            email: req.body.email,
            password: hashedPassword,
            status: "pending",
            created_at: new Date(),
            updated_at: new Date()
        })
        const savedUser = await userData.save()

        const token = jwt.sign({
            user_id: savedUser._id,
            role: savedUser.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ message: 'User saved successfully.', token, role: savedUser.role })
    } catch (err) {
        res.status(400).send({ message: "server error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await Users.findOne({ email })
        if (!userExists) return res.json({ message: "User not found" })

        if (password === "") return res.json({ message: "Passwords is empty" })

        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if (!passwordMatch) return res.json({ message: "password wrong" })

        if (userExists.status === "suspended") {
            res.json({ message: 'User Account is Suspended' })
        } else if (userExists.status === "pending") {
            res.json({ status: "pending" })
        } else if (userExists.role === "need to assign") {
            res.json({ role: "need to assign" })
        } else {
            const token = jwt.sign({
                user_id: userExists._id,
                role: userExists.role
            }, process.env.JWT_SECRET, { expiresIn: "7d" })

            res.json({ token })
        }

    } catch (err) {
        res.json({ message: "server error" })
    }
})

router.post("/change-password", verifyUser, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await Users.findOne({ _id: req.token.user_id });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne(
            { _id: req.token.user_id },
            { password: hashedPassword }
        );

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//put
router.put("/update-user-roleandstatus", verifyUser, async (req, res) => {
    try {
        const users = await Users.updateOne(
            { _id: req.body.user_id },
            { role: req.body.role, status: req.body.status }
        );
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
