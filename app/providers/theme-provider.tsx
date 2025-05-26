"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: "light" | "dark";
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Detect system preference and apply it immediately to avoid flashing
  useEffect(() => {
    // Get system theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setSystemTheme(prefersDark ? "dark" : "light");
    
    // Get saved theme if exists
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("system"); // Default to system if dark mode is preferred
    }

    // Handle changes in system preferences
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
      if (theme === "system") {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    setMounted(true);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [storageKey, theme]);

  // Update the class when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, systemTheme, mounted, storageKey]);

  // To avoid flash of wrong theme, we use suppressHydrationWarning on html
  // and only expose the state once we're mounted
  const value = {
    theme,
    setTheme,
    systemTheme
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 