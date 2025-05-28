"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { startPageLoading, stopPageLoading } from "../store/loading-store";

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
  const pathname = usePathname();
  
  // Clean the href to compare with current pathname
  const normalizeHref = (url: string): string => {
    // Remove query parameters and hash
    let normalized = url.split('?')[0].split('#')[0];
    // Remove trailing slash if present
    if (normalized.endsWith('/') && normalized.length > 1) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  };
  
  // Check if the link points to the current page
  const isSamePage = (): boolean => {
    // Transform both URLs to normalized form for comparison
    const normalizedHref = normalizeHref(href);
    const normalizedPathname = normalizeHref(pathname);
    
    return normalizedHref === normalizedPathname || 
           normalizedHref === '' && normalizedPathname === '/';
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Enable default behavior for external links
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      return;
    }
    
    // Call any onClick handlers if provided
    if (onClick) {
      onClick();
    }

    // Ensure body overflow is reset when navigating
    document.body.style.overflow = '';
    
    // If clicking a link to the current page, don't trigger navigation or loading
    if (isSamePage()) {
      e.preventDefault();
      // Scroll to top smoothly instead
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    e.preventDefault();
    
    // Start loading animation
    startPageLoading();

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