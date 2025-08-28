import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function getSessionUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      console.log("No valid session found in getSessionUser");
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
}
