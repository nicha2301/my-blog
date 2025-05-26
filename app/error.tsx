"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. An error occurred while trying to display this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary"
          >
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Return home
          </Link>
        </div>
        
        {/* Show error details in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-10 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded text-left overflow-auto max-w-2xl mx-auto">
            <p className="text-red-700 dark:text-red-400 font-mono text-sm">
              {error.message}
            </p>
            {error.stack && (
              <pre className="mt-2 text-xs text-red-600 dark:text-red-500 whitespace-pre-wrap">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 