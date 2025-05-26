"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/providers/theme-provider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (isChanging || theme === newTheme) return;
    
    setIsChanging(true);
    setTheme(newTheme);
    
    // Add a small delay to prevent rapid toggling
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-none p-1 w-[108px] h-[40px]">
      {!mounted ? (
        // Pre-render with the same dimensions to avoid layout shift
        <div className="flex w-full justify-between">
          <div className="w-5 h-5 opacity-0"></div>
          <div className="w-5 h-5 opacity-0"></div>
          <div className="w-5 h-5 opacity-0"></div>
        </div>
      ) : (
        <>
          <button
            onClick={() => handleThemeChange("light")}
            disabled={isChanging}
            className={`p-1.5 relative ${
              theme === "light" ? "bg-neutral-100 dark:bg-neutral-800" : ""
            }`}
            aria-label="Light mode"
          >
            {theme === "light" && (
              <span className="absolute inset-0 rounded-sm bg-amber-200/20 dark:bg-amber-400/20 animate-pulse"></span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className={`w-5 h-5 relative z-10 ${
                theme === "light" 
                  ? "fill-amber-200 stroke-amber-500 dark:fill-amber-300 dark:stroke-amber-500" 
                  : "stroke-current fill-none"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
          
          <button
            onClick={() => handleThemeChange("dark")}
            disabled={isChanging}
            className={`p-1.5 ${
              theme === "dark" ? "bg-neutral-200 dark:bg-neutral-700" : ""
            }`}
            aria-label="Dark mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === "dark" ? "#94A3B8" : "currentColor"}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
          
          <button
            onClick={() => handleThemeChange("system")}
            disabled={isChanging}
            className={`p-1.5 ${
              theme === "system" ? "bg-neutral-200 dark:bg-neutral-700" : ""
            }`}
            aria-label="System preference"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === "system" ? "#3B82F6" : "currentColor"}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
} 