"use server";

import Message from "@/models/Message";

const { getSessionUser } = require("@/utils/getSessionUser");
const { revalidatePath } = require("next/cache");

export async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await message.deleteOne();
  revalidatePath("/", "layout");
}
