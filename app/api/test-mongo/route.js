import mongoose from "mongoose";

export async function GET() {
  try {
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      return Response.json({
        success: false,
        error: "MONGODB_URI is not defined",
        timestamp: new Date().toISOString(),
      });
    }

    // Parse the connection string to check format
    let parsedUri = null;
    try {
      // Basic validation of connection string format
      if (
        !mongoUri.startsWith("mongodb+srv://") &&
        !mongoUri.startsWith("mongodb://")
      ) {
        throw new Error("Invalid connection string format");
      }

      // Extract parts for debugging (without exposing credentials)
      const parts = mongoUri.split("@");
      if (parts.length !== 2) {
        throw new Error("Invalid connection string structure");
      }

      const credentials = parts[0]
        .replace("mongodb+srv://", "")
        .replace("mongodb://", "");
      const hostPart = parts[1];

      parsedUri = {
        hasCredentials: credentials.includes(":"),
        hostPart: hostPart.split("/")[0],
        database: hostPart.includes("/")
          ? hostPart.split("/")[1].split("?")[0]
          : "No database specified",
      };
    } catch (parseError) {
      return Response.json({
        success: false,
        error: `Connection string parsing error: ${parseError.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Try to connect with detailed error handling
    console.log("Starting MongoDB connection test...");

    const connectionOptions = {
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 15000, // 15 seconds
      maxPoolSize: 1, // Limit pool size for testing
    };

    console.log("Connection options:", connectionOptions);

    const startTime = Date.now();

    await mongoose.connect(mongoUri, connectionOptions);

    const endTime = Date.now();
    const connectionTime = endTime - startTime;

    // Test a simple query
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Close the connection
    await mongoose.disconnect();

    return Response.json({
      success: true,
      message: "MongoDB connection successful",
      connectionTime: `${connectionTime}ms`,
      collections: collections.map((c) => c.name),
      parsedUri: parsedUri,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log("MongoDB connection test failed:", error);

    return Response.json({
      success: false,
      error: error.message,
      errorCode: error.code,
      errorName: error.name,
      timestamp: new Date().toISOString(),
    });
  }
}
