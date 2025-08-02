"use client";

import { useGlobalContext } from "@/context/GlobalContext";

function UnreadMessageCount() {
  const { unreadCount, setUnreadCount, darkMode, setDarkMode } =
    useGlobalContext();
  return (
    <span
      onClick={() => {
        setUnreadCount(unreadCount + 1);
        setDarkMode(!darkMode);
      }}
      className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${
        darkMode ? "text-white" : "text-blue-950"
      } transform translate-x-1/2 -translate-y-1/2 ${
        darkMode ? "bg-blue-950" : "bg-red-300"
      } rounded-full`}
    >
      {unreadCount}
    </span>
  );
}

export default UnreadMessageCount;
