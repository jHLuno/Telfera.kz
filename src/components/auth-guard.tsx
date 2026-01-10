"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Clear browser cache on component mount
    window.history.replaceState(null, "", window.location.href);

    // Prevent caching on browser back button
    const handleBeforeUnload = () => {
      window.history.replaceState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    // Disable browser back/forward cache (bfcache)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        router.refresh();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [router]);

  return <>{children}</>;
}
