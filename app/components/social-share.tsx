"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M22 5.89c-.8.36-1.66.6-2.56.7a4.5 4.5 0 0 0 1.97-2.48c-.87.52-1.83.89-2.85 1.1a4.5 4.5 0 0 0-7.65 4.1A12.74 12.74 0 0 1 1.4 4.44a4.5 4.5 0 0 0 1.4 6.01A4.5 4.5 0 0 1 .5 9.9v.06a4.5 4.5 0 0 0 3.6 4.41 4.51 4.51 0 0 1-2.03.08 4.5 4.5 0 0 0 4.2 3.12 9.03 9.03 0 0 1-5.58 1.92c-.36 0-.72-.02-1.07-.06A12.74 12.74 0 0 0 6.82 22c8.18 0 12.66-6.78 12.66-12.66 0-.19 0-.38-.01-.57a9.05 9.05 0 0 0 2.22-2.3c-.8.36-1.66.6-2.56.7a4.5 4.5 0 0 0 1.97-2.48"></path>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M6.5 8.5V17.5H3.5V8.5H6.5ZM5 7C3.9 7 3 6.1 3 5C3 3.9 3.9 3 5 3C6.1 3 7 3.9 7 5C7 6.1 6.1 7 5 7ZM13.5 9C12.1 9 9.5 8.5 9.5 11V17.5H12.5V12.5C12.5 10.5 15 10.5 15 12.5V17.5H18V12C18 7 13.5 9 13.5 9Z"></path>
        </svg>
      ),
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-sm font-medium text-neutral-500">Chia sẻ</h3>
      <div className="flex flex-col space-y-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-3 rounded-full flex items-center justify-center transition-transform hover:scale-110`}
            aria-label={`Chia sẻ lên ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="bg-neutral-600 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white p-3 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Sao chép đường dẫn"
        >
          {copied ? (
            <motion.svg
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </motion.svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
} 