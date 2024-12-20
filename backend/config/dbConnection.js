const mongoose = require("mongoose");
const { DB_CONNECT } = process.env;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_CONNECT);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectToDatabase;