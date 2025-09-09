const mongoose = require("mongoose");
const serverConfig = require("./serverConfig");

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connected to the mongodb...")
    } catch (error) {
        console.log("Failed to connect mongodb")
        console.log(error)
    }
}

module.exports = connectDB;