const mongoose = require("mongoose");

module.exports = mongoose.model("cybersourceTransactions", mongoose.Schema({}, { strict: false }));
