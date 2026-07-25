const mongoose = require("mongoose");
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL + "Waste_Management_Users")
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .then(() => {
            console.log("remember to run populate.js command")
        })
}

module.exports = connectDB;
