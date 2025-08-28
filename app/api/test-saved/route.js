import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Testing saved properties API...");

    // Test database connection
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully");

    // Test session
    console.log("Getting session user...");
    const sessionUser = await getSessionUser();
    console.log("Session user:", sessionUser ? "Found" : "Not found");

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json({
        status: "error",
        message: "No valid session found",
        sessionUser: null,
      });
    }

    // Test user lookup
    console.log("Finding user with ID:", sessionUser.userId);
    const user = await User.findById(sessionUser.userId);
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "User not found in database",
        userId: sessionUser.userId,
      });
    }

    // Test bookmarks population
    console.log("Populating bookmarks...");
    const userWithBookmarks = await User.findById(sessionUser.userId).populate(
      "bookmarks"
    );
    console.log("Bookmarks count:", userWithBookmarks.bookmarks?.length || 0);

    return NextResponse.json({
      status: "success",
      message: "All tests passed",
      userId: sessionUser.userId,
      bookmarksCount: userWithBookmarks.bookmarks?.length || 0,
      bookmarks: userWithBookmarks.bookmarks || [],
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
