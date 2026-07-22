const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require("./config/database");
const userRoutes = require("./routes/users.route.js");

connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

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
