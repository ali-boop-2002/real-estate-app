import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection...");
    mongoose.set("strictQuery", false);

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased timeout
        socketTimeoutMS: 45000,
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("Database connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("Database connection failed:", error);
        cached.promise = null; // Reset promise on error
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error in connectDB:", error);
    cached.promise = null; // Reset promise on error
    throw error;
  }
};

export default connectDB;
