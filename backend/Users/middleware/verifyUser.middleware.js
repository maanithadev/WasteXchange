const jwt = require("jsonwebtoken");
const Users = require("../models/users.model.js")

const verifyUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)

            // Skip checking the Users database if the token belongs to an admin
            // if (user.role !== 'admin' && user.role !== null) {
            if (user.role === 'seller' || user.role === 'buyer') {
                const foundUser = await Users.findById(user.user_id)
                if (!foundUser) return res.json({ message: 'No user found' })
                if (foundUser.status === "suspended") return res.json({ message: 'User Account is Suspended' })
            }

            req.token = user
            next()
        } else {
            res.json({ message: 'No token provided' })
        }
    } catch (err) {
        res.json({ message: 'Invalid or expired token' })
    }
}

module.exports = verifyUser
