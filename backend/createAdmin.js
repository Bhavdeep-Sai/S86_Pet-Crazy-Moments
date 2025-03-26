const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = require("./models/userSchema");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const existingAdmin = await userSchema.findOne({ email: "bhavdeepsai@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("NaniPuni@216", 10);
    
    const adminUser = new userSchema({
      name: "Bhavdeep",
      email: "bhavdeepsai@gmail.com",
      password: hashedPassword, // Properly hashed password
      role: "admin"
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
