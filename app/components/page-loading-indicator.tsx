"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "../store/loading-store";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageLoadingIndicator() {
  const { isLoading } = useLoadingStore();
  const progressRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          key="loading-bar"
          className="fixed top-0 left-0 h-[2px] bg-primary z-[100]"
          initial={{ width: "0%" }}
          animate={{ width: `${progressRef.current}%` }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
} 