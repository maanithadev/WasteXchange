const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./config/database");
const userRoutes = require("./routes/users.route.js");

connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later",
});

app.use(helmet());
app.use(limiter);
app.use("/api/users", userRoutes)

app.use((error, req, res, next) => {
    if (error) {
        res.json({ message: error })
    } else {
        next()
    }
})

app.listen(process.env.PORT, () => {
    console.log('server is running on port:' + process.env.PORT)
})
