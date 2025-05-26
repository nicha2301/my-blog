"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.1,
  easing: "ease",
  speed: 400,
});

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start NProgress when the route changes
    NProgress.start();
    
    // Create a timer to ensure NProgress completes after a reasonable time
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

// Helper function to manually trigger progress bar
export function startProgress() {
  document.dispatchEvent(new Event("nprogress:start"));
}

// Helper function to manually stop progress bar
export function stopProgress() {
  document.dispatchEvent(new Event("nprogress:stop"));
} 