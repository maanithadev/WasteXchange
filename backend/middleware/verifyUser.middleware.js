const jwt = require("jsonwebtoken");
const Users = require("../models/users.model.js")

const verifyUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)
            const foundUser = await Users.findById(user.user_id)
            if (!foundUser) return res.json({ message: 'No user found' })
            req.token = user
            next()
        } else {
            res.status(401).json({ message: 'No token provided' })
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' })
    }
}

module.exports = verifyUser
