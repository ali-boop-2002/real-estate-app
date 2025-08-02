import mongoose from "mongoose";

let connected = false;
let connectionError = null;

const connectDB = async () => {
  // if the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return { success: true, error: null };
  }

  // Check if MONGODB_URI is available
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is not defined");
    console.log(
      "Available environment variables:",
      Object.keys(process.env).filter((key) => key.includes("MONGODB"))
    );
    connectionError = "MONGODB_URI is not defined";
    return { success: false, error: "MONGODB_URI is not defined" };
  }

  // Connect to MongoDb
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGODB_URI length:", process.env.MONGODB_URI?.length || 0);

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    connected = true;
    connectionError = null;
    console.log("MongoDB is connected successfully");
    return { success: true, error: null };
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    console.log("Error code:", error.code);
    console.log("Error name:", error.name);
    connectionError = error.message;
    connected = false;
    return {
      success: false,
      error: error.message,
      errorCode: error.code,
      errorName: error.name,
    };
  }
};

export default connectDB;
