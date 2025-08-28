export const dynamic = "force-dynamic";

import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

async function SavedPropertiesPage() {
  let bookmarks = [];
  let error = null;

  try {
    // Get session user with better error handling
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      console.log("No valid session found");
      return (
        <section className="px-4 py-6 h-screen">
          <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            <p>Please sign in to view your saved properties.</p>
          </div>
        </section>
      );
    }

    console.log(sessionUser.userId, "savedUserId");

    // Ensure database connection
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully");

    console.log("Finding user with ID:", sessionUser.userId);
    const user = await User.findById(sessionUser.userId).populate("bookmarks");
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found in database");
      return (
        <section className="px-4 py-6 h-screen">
          <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            <p>User not found. Please try signing in again.</p>
          </div>
        </section>
      );
    }

    bookmarks = user.bookmarks || [];
    console.log("Bookmarks found:", bookmarks.length);
    console.log("Bookmarks data:", bookmarks);
  } catch (err) {
    console.error("Error loading saved properties:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    error = err;
    bookmarks = [];
  }

  return (
    <section className="px-4 py-6 h-screen">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>
              Error loading saved properties. Please try refreshing the page.
            </p>
          </div>
        )}

        {!error && bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPropertiesPage;
