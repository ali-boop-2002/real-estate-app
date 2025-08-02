"use client";

import { getUnreadMessageCount } from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";

const { createContext, useState, useContext, useEffect } = require("react");

// Create Context
const GlobalContext = createContext();

// Create Provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
