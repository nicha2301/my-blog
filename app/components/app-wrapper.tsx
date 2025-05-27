"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { stopPageLoading } from '../store/loading-store';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Ensure loading state is reset when component mounts
  useEffect(() => {
    // Wait a short moment to allow any animations to complete
    const timer = setTimeout(() => {
      stopPageLoading();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return <>{children}</>;
} 