"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="max-w-md mx-auto mb-10 text-neutral-600 dark:text-neutral-400">
          Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
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