const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require("./config/database");
const path = require("path");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const userSockets = new Map();

io.on('connection', (socket) => {
    socket.on("register", (user_id) => {
        if (user_id) {
            userSockets.set(user_id, socket.id);
        }
    });

    socket.on('disconnect', () => {
        for (let [user_id, socket_id] of userSockets.entries()) {
            if (socket_id === socket.id) {
                userSockets.delete(user_id);
                break;
            }
        }
    });
});

app.set('io', io);
app.set('userSockets', userSockets);

const userRoutes = require("./routes/users.routes.js");
const sellerRoutes = require('./routes/sellers.routes.js');
const buyerRoutes = require('./routes/buyers.routes.js');
const paymentRoutes = require('./routes/payment.route.js');
const orderRoutes = require("./routes/orders.routes.js");
const notificationRoutes = require("./routes/notifications.routes.js");
const messageRoutes = require("./routes/messages.routes.js");
const wastelistings = require("./routes/wasteListings.route.js");

connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/images", express.static(path.join(__dirname, "uploads")))

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later",
});

app.use(helmet());
app.use(limiter);
app.use("/api/users", userRoutes)
app.use("/api/sellers", sellerRoutes)
app.use("/api/buyers", buyerRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/wastelistings", wastelistings)

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        res.json({ message: error.message })
    } else if (error) {
        res.json({ message: error })
    } else {
        next()
    }
})

server.listen(process.env.PORT, () => {
    console.log('server is running on port:' + process.env.PORT)
})
