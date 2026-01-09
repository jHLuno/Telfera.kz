"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Clear browser cache on component mount
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.href);
    }

    // Prevent caching on browser back button
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.href);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Disable browser back/forward cache (bfcache)
    window.onpageshow = function (event) {
      if (event.persisted) {
        router.refresh();
      }
    };
  }, [router]);

  return <>{children}</>;
}
