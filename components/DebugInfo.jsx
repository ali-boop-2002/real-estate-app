"use client";
import { useEffect, useState } from "react";

function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkEnvironment = async () => {
      try {
        // Check if we're in browser or server
        const isBrowser = typeof window !== "undefined";

        // Try to fetch debug info from an API route
        const response = await fetch("/api/debug");
        const data = await response.json();

        setDebugInfo({
          isBrowser,
          ...data,
        });
      } catch (error) {
        setDebugInfo({
          error: error.message,
          isBrowser: typeof window !== "undefined",
        });
      }
    };

    checkEnvironment();
  }, []);

  return (
    <div className="bg-yellow-100 p-4 m-4 rounded border">
      <h3 className="font-bold text-red-600">Debug Information:</h3>
      <pre className="text-xs mt-2">{JSON.stringify(debugInfo, null, 2)}</pre>
    </div>
  );
}

export default DebugInfo;
