const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log("📦 Database Name:", conn.connection.name);
  } catch (error) {
    console.error("❌ DB Connection Failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
