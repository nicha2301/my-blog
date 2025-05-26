"use client";

import { useEffect } from "react";
import { startPageLoading, stopPageLoading } from "../store/loading-store";

/**
 * Hook to monitor resource loading state and trigger loading indicator
 * This handles cases where there are images or other resources being loaded
 */
export function useResourceLoading() {
  useEffect(() => {
    // Function to handle resource loading events
    const handleResourceLoadStart = () => {
      startPageLoading();
    };

    const handleResourceLoadComplete = () => {
      stopPageLoading();
    };

    // When all resources are loaded
    window.addEventListener("load", handleResourceLoadComplete);
    
    // When navigating away, resources will start loading
    window.addEventListener("beforeunload", handleResourceLoadStart);
    
    // Also handle image loading individually
    document.addEventListener("lazyloaded", handleResourceLoadComplete);
    
    // Monitor lazy-loaded images
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
          const img = mutation.target as HTMLImageElement;
          if (img.complete) {
            handleResourceLoadComplete();
          } else {
            handleResourceLoadStart();
            img.addEventListener("load", handleResourceLoadComplete);
            img.addEventListener("error", handleResourceLoadComplete);
          }
        }
      }
    });
    
    // Start observing the document
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["src"]
    });
    
    return () => {
      window.removeEventListener("load", handleResourceLoadComplete);
      window.removeEventListener("beforeunload", handleResourceLoadStart);
      document.removeEventListener("lazyloaded", handleResourceLoadComplete);
      observer.disconnect();
    };
  }, []);
} 