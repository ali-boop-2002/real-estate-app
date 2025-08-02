"use server";

const { default: cloudinary } = require("@/config/cloudinary");
const { default: Property } = require("@/models/Property");
const { getSessionUser } = require("@/utils/getSessionUser");
const { revalidatePath } = require("next/cache");

export async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  // Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }
  await property.deleteOne();
  revalidatePath("/", "layout");
}
