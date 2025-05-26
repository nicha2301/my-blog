"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress - simple version
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  easing: 'ease',
  speed: 500
});

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams);
  
  // This effect handles page transitions
  useEffect(() => {
    // Navigation has changed if pathname or searchParams are different
    const navigationHasChanged = 
      pathname !== prevPathname || 
      searchParams.toString() !== prevSearchParams.toString();
    
    if (navigationHasChanged) {
      // Start showing the progress bar
      NProgress.start();

      // Complete the progress after a delay to ensure visibility
      const timer = setTimeout(() => {
        NProgress.done();
        // Update previous values
        setPrevPathname(pathname);
        setPrevSearchParams(searchParams);
      }, 500); // Delay completion for better UX
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname, searchParams, prevPathname, prevSearchParams]);

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