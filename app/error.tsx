"use client";

import { useEffect } from "react";
import TransitionLink from "@/app/components/transition-link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="text-5xl font-bold mb-6">Something went wrong</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We apologize for the inconvenience. Please try again later.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try again
          </button>
          <TransitionLink href="/" className="btn btn-outline">
            Return Home
          </TransitionLink>
        </div>
      </motion.div>
    </div>
  );
} 