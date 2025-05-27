"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useLoadingStore, startPageLoading, stopPageLoading, resetPageLoading } from "../store/loading-store";
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
  const { isLoading } = useLoadingStore();

  // Handle route changes
  useEffect(() => {
    // Create a variable to track if this effect's timeout is still relevant
    let isCurrentNavigation = true;
    
    // Start both NProgress and our custom loader on route changes
    NProgress.start();
    startPageLoading();
    
    // Create a timer to ensure NProgress completes after a reasonable time
    const timer = setTimeout(() => {
      if (isCurrentNavigation) {
        NProgress.done();
        stopPageLoading();
      }
    }, 500);

    // Clean up
    return () => {
      isCurrentNavigation = false;
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  // Also respond to the loading state from our store
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  // Global safety cleanup on component mount/unmount
  useEffect(() => {
    return () => {
      // Ensure everything is reset when component unmounts
      NProgress.done();
      resetPageLoading();
    };
  }, []);

  return null;
}

// Helper function to manually trigger progress bar
export function startProgress() {
  NProgress.start();
  startPageLoading();
}

// Helper function to manually stop progress bar
export function stopProgress() {
  NProgress.done();
  stopPageLoading();
} 