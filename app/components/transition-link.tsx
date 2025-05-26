"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { startPageLoading } from "../store/loading-store";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Enable default behavior for external links
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      return;
    }
    
    e.preventDefault();
    
    // Start loading animation
    startPageLoading();
    
    // Call any onClick handlers if provided
    if (onClick) {
      onClick();
    }

    // Add a small delay for any exit animations if needed
    setTimeout(() => {
      router.push(href);
    }, 100); // 100ms delay for any transition effects
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
} 