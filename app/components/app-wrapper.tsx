"use client";

import { Suspense, ReactNode } from "react";

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading application...</div>}>
      {children}
    </Suspense>
  );
} 