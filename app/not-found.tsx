"use client";

import TransitionLink from "@/app/components/transition-link";
import { motion } from "framer-motion";
import { Suspense } from 'react';

function NotFoundContent() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="text-7xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We couldn't find the page you were looking for. It might have been removed, 
          renamed, or didn't exist in the first place.
        </p>
        <TransitionLink href="/" className="btn btn-primary">
          Return Home
        </TransitionLink>
      </motion.div>
    </div>
  );
}

// Wrapper component to isolate any potential useSearchParams usage
function NotFoundWrapper() {
  return <NotFoundContent />;
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundWrapper />
    </Suspense>
  );
} 