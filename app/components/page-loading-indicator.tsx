"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "@/app/store/loading-store";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.15,
  easing: "ease",
  speed: 400,
});

export default function PageLoadingIndicator() {
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Start or stop NProgress based on the loading state
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);
  
  // Automatically end loading when route changes are complete
  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      useLoadingStore.getState().stopLoading();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <div className="fixed top-0 left-0 w-full z-[1000]">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-background">
          <div className="h-full animate-progress-bar"></div>
        </div>
      )}
    </div>
  );
} 