"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startPageLoading } from "@/app/store/loading-store";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({ 
  href, 
  children, 
  className = "", 
  onClick,
  ...props 
}: TransitionLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "onClick">) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Start loading animation immediately when clicked
    startPageLoading();
    
    // Execute any additional onClick handlers
    if (onClick) onClick();
    
    // Small delay to ensure the loading animation is visible
    setTimeout(() => {
      // Navigate to the new page
      router.push(href);
    }, 50);
  };
  
  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
} 