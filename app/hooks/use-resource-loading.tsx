"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type ResourceState = {
  isLoading: boolean;
  progress: number;
};

const useResourceLoading = (): ResourceState => {
  const [state, setState] = useState<ResourceState>({
    isLoading: false,
    progress: 0,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track route changes to show loading indicator
    const handleRouteChangeStart = () => {
      setState({
        isLoading: true,
        progress: 20,
      });
      
      // Simulate incremental progress
      const interval = setInterval(() => {
        setState(prevState => {
          if (prevState.progress >= 90) {
            clearInterval(interval);
            return prevState;
          }
          
          return {
            ...prevState,
            progress: Math.min(90, prevState.progress + Math.random() * 10),
          };
        });
      }, 300);

      return () => clearInterval(interval);
    };

    const handleRouteChangeComplete = () => {
      setState({
        isLoading: false,
        progress: 100,
      });
    };

    // Start loading when component mounts
    const cleanup = handleRouteChangeStart();
    
    // Complete loading after a delay to simulate completion
    const timer = setTimeout(() => {
      handleRouteChangeComplete();
    }, 500);

    return () => {
      cleanup?.();
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return state;
};

export { useResourceLoading }; 