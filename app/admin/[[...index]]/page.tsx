'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  useEffect(() => {
    window.location.href = 'https://nicha.sanity.studio/';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Redirecting to Sanity Studio...</h1>
        <p>If you are not redirected, <a href="https://nicha.sanity.studio/" className="text-primary underline">click here</a>.</p>
      </div>
    </div>
  );
} 
