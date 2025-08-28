import connectDB from "@/config/database";
import Property from "@/models/Property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

async function FeaturedProperties() {
  try {
    const result = await connectDB();
    if (!result.success) {
      console.log(
        "Database connection failed for featured properties:",
        result.error
      );
      return null;
    }

    const properties = await Property.find({ is_featured: true }).lean();
    return properties.length > 0 ? (
      <section className="bg-green-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    ) : null;
  } catch (error) {
    console.log("Error fetching featured properties:", error.message);
    return null;
  }
}

export default FeaturedProperties;
