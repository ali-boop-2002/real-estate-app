import connectDB from "@/config/database";

export async function withRetry(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await connectDB();
      return await operation();
    } catch (error) {
      console.error(`Database operation attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
