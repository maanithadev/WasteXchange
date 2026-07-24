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

            if (foundUser.status === "suspend") return res.json({ message: 'User Account is Suspended' })

            if (foundUser.status === "pending") return res.json({ message: "Your Account is still Pending for Approve" })

            if (foundUser.role === "need to assign") return res.json({ message: "Your Account haven't assigned a Role Yet" })

            res.json(user)
        }
    } catch (err) {
        res.json({ message: 'Invalid or expired token' })
    }
})

router.get("/get-all-users", verifyUser, async (req, res) => {
    try {
        const users = await Users.find({}, "-password").sort({ created_at: -1 })
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
        res.json({ message: 'User saved successfully.', token, role: savedUser.role })
    } catch (err) {
        res.send({ message: "server error" })
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

        if (userExists.status === "suspend") return res.json({ message: 'User Account is Suspended' })

        if (userExists.status === "pending") return res.json({ message: "Your Account is still Pending for Approve" })

        if (userExists.role === "need to assign") return res.json({ message: "Your Account haven't assigned a Role Yet" })

        const token = jwt.sign({
            user_id: userExists._id,
            role: userExists.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.json({ token })

    } catch (err) {
        res.json({ message: "server error" })
    }
})

router.post("/change-password", verifyUser, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await Users.findOne({ _id: req.token.user_id });
        if (!user) return res.json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.json({ message: "Incorrect current password" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne(
            { _id: req.token.user_id },
            { password: hashedPassword }
        );

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
})

router.post("/forgot-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Users.updateOne(
            { email },
            { password: hashedPassword }
        );

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
})


//put
router.put("/update-user-roleandstatus", verifyUser, async (req, res) => {
    try {
        const users = await Users.updateOne(
            { _id: req.body.user_id },
            { role: req.body.role, status: req.body.status, updated_at: new Date() }
        );
        res.json(users)
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router
