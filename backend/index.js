const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require("./config/database");
const path = require("path");
const app = express()
const sellerRoutes = require('./routes/sellers.routes.js');
const buyerRoutes = require('./routes/buyers.routes.js');

connectDB()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/sellers", sellerRoutes)
app.use("/api/buyers", buyerRoutes)

app.listen(process.env.PORT, () => {
    console.log('server is running on port:' + process.env.PORT)
})
