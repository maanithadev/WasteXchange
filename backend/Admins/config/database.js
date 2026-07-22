const mongoose = require("mongoose");
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL + "Waste_Management_Admin")
        .then(() => {
            console.log("Connected to MongoDB")
        })
}

module.exports = connectDB;
