export const dynamic = "force-dynamic";

import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import User from "@/models/User";
import { convertToSerializableObject } from "@/utils/convertToObjects";
import { getSessionUser } from "@/utils/getSessionUser";

async function MessagesPage() {
  // try {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return (
      <section className="bg-green-50">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            <p>Please sign in to view your messages.</p>
          </div>
        </div>
      </section>
    );
  }

  console.log(sessionUser, "sessionUSer");
  const { userId } = sessionUser;
  console.log(userId, "userId");
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // console.log(unreadMessages, "unread ");
  // console.log(readMessages, "read");

  let messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });
  // } catch (error) {
  //   console.error("Error loading messages:", error);
  //   return (
  //     <section className="bg-green-50">
  //       <div className="container m-auto py-24 max-w-6xl">
  //         <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
  //           <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
  //           <p>Error loading messages. Please try again later.</p>
  //           <p>{error.message}</p>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="bg-green-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesPage;
