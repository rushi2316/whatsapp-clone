const mongoose = require("mongoose");

async function connectDB() {

    console.log("Mongo URI:");
    console.log(process.env.MONGO_URI);

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

    } catch (err) {

        console.error("========== FULL ERROR ==========");
        console.error(err);
        console.error("================================");

        process.exit(1);

    }

}

module.exports = connectDB;