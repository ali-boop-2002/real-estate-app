export const dynamic = "force-dynamic";

import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function SavedPropertiesPage() {
  let bookmarks = [];
  try {
    const { userId } = await getSessionUser();

    console.log(userId, "savedUserId");

    const user = await User.findById(userId).populate("bookmarks");
    bookmarks = user?.bookmarks || [];

    console.log(bookmarks, "saveBookMarks");
    console.log(bookmarks);
  } catch (error) {
    console.error(error, "errormAAA");
    bookmarks = [];
  }

  return (
    <section className="px-4 py-6 h-screen">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">
          {bookmarks.length === 0 ? (
            <p>No saved properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookmarks.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </h1>
      </div>
    </section>
  );
}

export default SavedPropertiesPage;
