"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "../store/loading-store";
import { usePathname, useSearchParams } from "next/navigation";

// This component uses useSearchParams which requires a Suspense boundary
export default function PageLoadingIndicator() {
  const { isLoading } = useLoadingStore();
  const progressRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  // Safely access search params
  const searchParams = useSearchParams();
  const searchParamsString = searchParams ? searchParams.toString() : "";

  // Update progress simulation
  useEffect(() => {
    if (isLoading) {
      progressRef.current = 20; // Start at 20%

      // Simulate progress increasing
      intervalRef.current = setInterval(() => {
        progressRef.current = Math.min(90, progressRef.current + Math.random() * 10);
      }, 300);
    } else {
      progressRef.current = 100; // Complete the progress
      
      // Clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading]);

  // Reset loading state on route change
  useEffect(() => {
    // Small delay to finish any animations
    const timer = setTimeout(() => {
      useLoadingStore.getState().stopLoading();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParamsString]);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Progress bar at top */}
          <motion.div 
            key="loading-bar"
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary z-[100]"
            initial={{ width: "0%", opacity: 0 }}
            animate={{ width: `${progressRef.current}%`, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut" }}
          />
          
          {/* Subtle page overlay */}
          <motion.div
            key="loading-overlay"
            className="fixed inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-[1px] pointer-events-none z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Pulsing dot indicator in corner */}
          <motion.div
            key="loading-indicator"
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="h-2 w-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <span className="text-xs font-medium">Loading</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 