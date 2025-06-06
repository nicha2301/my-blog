"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteShareProps {
  selector: string; // CSS Selector cho phần nội dung
  url: string; // URL bài viết
}

export function QuoteShare({ selector, url }: QuoteShareProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        const content = document.querySelector(selector);
        if (content && content.contains(selection.anchorNode)) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          // Chỉ hiển thị khi text được chọn trong phần nội dung
          setSelectedText(selection.toString());
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10 + window.scrollY,
          });
          setShowPopup(true);
        }
      } else {
        setShowPopup(false);
      }
    };

    // Click outside to close
    const handleClick = (e: MouseEvent) => {
      if (showPopup && e.target) {
        const popup = document.getElementById("quote-share-popup");
        if (popup && !popup.contains(e.target as Node)) {
          setShowPopup(false);
        }
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("click", handleClick);
    };
  }, [selector, showPopup]);

  const shareToTwitter = () => {
    // Giới hạn 280 ký tự cho Twitter
    const maxLength = 280 - url.length - 20; // Trừ độ dài URL và các ký tự thêm vào
    const quote = selectedText.length > maxLength 
      ? selectedText.substring(0, maxLength - 3) + "..." 
      : selectedText;
      
    const shareUrl = `https://twitter.com/intent/tweet?text="${quote}" ${url}`;
    window.open(shareUrl, "_blank");
    setShowPopup(false);
  };
  
  const copyToClipboard = () => {
    const quotedText = `"${selectedText}"`;
    navigator.clipboard.writeText(quotedText);
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          id="quote-share-popup"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed z-50"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-3 flex space-x-2 border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={shareToTwitter}
              className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white"
              aria-label="Chia sẻ lên Twitter"
              title="Chia sẻ trên Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.89c-.8.36-1.66.6-2.56.7a4.5 4.5 0 0 0 1.97-2.48c-.87.52-1.83.89-2.85 1.1a4.5 4.5 0 0 0-7.65 4.1A12.74 12.74 0 0 1 1.4 4.44a4.5 4.5 0 0 0 1.4 6.01A4.5 4.5 0 0 1 .5 9.9v.06a4.5 4.5 0 0 0 3.6 4.41 4.51 4.51 0 0 1-2.03.08 4.5 4.5 0 0 0 4.2 3.12 9.03 9.03 0 0 1-5.58 1.92c-.36 0-.72-.02-1.07-.06A12.74 12.74 0 0 0 6.82 22c8.18 0 12.66-6.78 12.66-12.66 0-.19 0-.38-.01-.57a9.05 9.05 0 0 0 2.22-2.3c-.8.36-1.66.6-2.56.7a4.5 4.5 0 0 0 1.97-2.48"></path>
              </svg>
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300"
              aria-label="Sao chép trích dẫn"
              title="Sao chép trích dẫn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 