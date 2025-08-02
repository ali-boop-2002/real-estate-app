import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  // mongoose.set("strictQuery", true);

  // if the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Check if MONGODB_URI is available
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is not defined");
    return;
  }

  // Connect to MongoDb
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    connected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    // Don't throw error during build time
    if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
      console.log("Skipping database connection during Vercel build");
      return;
    }
    throw error;
  }
};

export default connectDB;
