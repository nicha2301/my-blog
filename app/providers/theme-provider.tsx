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
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  // Detect system preference and apply it once on mount
  useEffect(() => {
    // Only run this effect once on mount
    if (mounted) return;

    try {
      // Get system theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const detectedSystemTheme = prefersDark ? "dark" : "light";
      setSystemTheme(detectedSystemTheme);
      
      // Get saved theme if exists
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      
      if (savedTheme) {
        setThemeState(savedTheme);
      } else if (prefersDark) {
        setThemeState("system"); // Default to system if dark mode is preferred
      }

      // Mark as mounted
      setMounted(true);
    } catch (error) {
      // Fallback in case of any errors
      setMounted(true);
    }
  }, [mounted, storageKey]);

  // Handle changes in system preferences
  useEffect(() => {
    if (!mounted) return;

    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = (event: MediaQueryListEvent) => {
        const newSystemTheme = event.matches ? "dark" : "light";
        setSystemTheme(newSystemTheme);
        
        if (theme === "system") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(newSystemTheme);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (error) {
      // Fallback in case of any errors
      console.error("Error setting up theme listener:", error);
    }
  }, [mounted, theme]);

  // Custom setter for theme to prevent rapid changes
  const setTheme = (newTheme: Theme) => {
    // Prevent multiple theme changes in quick succession
    if (isChangingTheme) return;
    
    setIsChangingTheme(true);
    setThemeState(newTheme);
    
    // Release lock after a short delay
    setTimeout(() => {
      setIsChangingTheme(false);
    }, 200);
  };

  // Update the class when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      const appliedTheme = theme === "system" ? systemTheme : theme;
      root.classList.add(appliedTheme);
      
      // Store in localStorage
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme, systemTheme, mounted, storageKey]);

  // Value to expose via context
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