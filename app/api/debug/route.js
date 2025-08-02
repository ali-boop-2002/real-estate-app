import connectDB from "@/config/database";

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      MONGODB_URI: process.env.MONGODB_URI ? "SET" : "NOT SET",
      MONGODB_URI_LENGTH: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.length
        : 0,
      ALL_ENV_KEYS: Object.keys(process.env).filter((key) =>
        key.includes("MONGODB")
      ),
    };

    // Try database connection
    let dbStatus = "Not attempted";
    let dbError = null;
    try {
      const result = await connectDB();
      dbStatus = result.success ? "Connected" : "Failed to connect";
      dbError = result.error
        ? {
            message: result.error,
            code: result.errorCode,
            name: result.errorName,
          }
        : null;
    } catch (error) {
      dbStatus = `Error: ${error.message}`;
      dbError = {
        message: error.message,
        code: error.code,
        name: error.name,
      };
    }

    return Response.json({
      timestamp: new Date().toISOString(),
      environment: envVars,
      database: dbStatus,
      dbError: dbError,
      server: "API route working",
    });
  } catch (error) {
    return Response.json({
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
