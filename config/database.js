import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", false);

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
