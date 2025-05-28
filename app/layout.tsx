"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Lenis from '@studio-freight/lenis';
import { useEffect, useState, Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import ThemeSwitcher from "./components/theme-switcher";
import PageLoadingIndicator from "./components/page-loading-indicator";
import TransitionLink from "./components/transition-link";
import PageTransition from "./components/page-transition";
import NavigationProgress from "./components/navigation-progress";
import AppWrapper from "./components/app-wrapper";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {    
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    } as any);
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Minimal Journal</title>
        <meta name="description" content="A minimalist blog featuring clean design and thoughtful content" />
        {/* Script to prevent flash of wrong theme */}
        <Script
          id="theme-switcher"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = 'theme';
                  const theme = localStorage.getItem(storageKey);
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.classList.add(theme);
                    document.documentElement.style.colorScheme = theme;
                  } else {
                    document.documentElement.classList.add(systemTheme);
                    document.documentElement.style.colorScheme = systemTheme;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={<div className="h-0.5 bg-primary-dark"></div>}>
            <NavigationProgress />
          </Suspense>
          <Suspense fallback={<div className="h-1 bg-primary-dark"></div>}>
            <PageLoadingIndicator />
          </Suspense>
          <Suspense fallback={<div className="fixed top-0 left-0 w-full h-16 bg-background border-b border-neutral-200 dark:border-neutral-800"></div>}>
            <Header />
          </Suspense>
          <main className="min-h-screen pt-28">
            <AppWrapper>
              <PageTransition>
        {children}
              </PageTransition>
            </AppWrapper>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add a new effect to reset overflow when mobile menu is closed
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "py-4 bg-background/75 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container flex items-center">
          <div className="flex-1">
            <TransitionLink href="/" className="text-xl font-medium">
              Minimal Journal
            </TransitionLink>
          </div>
          
          {/* Fixed width container for navigation to prevent layout shift */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            <TransitionLink href="/" className="hover:text-secondary transition-colors">Home</TransitionLink>
            <TransitionLink href="/about" className="hover:text-secondary transition-colors">About</TransitionLink>
            <TransitionLink href="/blog" className="hover:text-secondary transition-colors">Journal</TransitionLink>
            <TransitionLink href="/contact" className="hover:text-secondary transition-colors">Contact</TransitionLink>
          </div>
          
          <div className="flex items-center gap-4 flex-1 justify-end">
            <ThemeSwitcher />
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-background z-40 transition-transform duration-500 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden pt-24 px-6`}>
        <div className="flex flex-col gap-8 text-xl">
          <TransitionLink href="/" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</TransitionLink>
          <TransitionLink href="/about" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>About</TransitionLink>
          <TransitionLink href="/blog" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Journal</TransitionLink>
          <TransitionLink href="/contact" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</TransitionLink>
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <TransitionLink href="/" className="text-xl font-medium mb-4 inline-block">
              Minimal Journal
            </TransitionLink>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
              A minimalist blog featuring clean design and thoughtful content.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><TransitionLink href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Home</TransitionLink></li>
              <li><TransitionLink href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">About</TransitionLink></li>
              <li><TransitionLink href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Journal</TransitionLink></li>
              <li><TransitionLink href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Contact</TransitionLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Discover</h3>
            <ul className="space-y-3">
              <li><TransitionLink href="/categories" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Categories</TransitionLink></li>
              <li><TransitionLink href="/authors" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Authors</TransitionLink></li>
              <li><TransitionLink href="/archive" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Archive</TransitionLink></li>
              <li><TransitionLink href="/search" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Search</TransitionLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Stay updated with our latest articles.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input bg-white dark:bg-neutral-800"
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-6 text-center text-neutral-500 dark:text-neutral-500 text-sm">
          <p className="mb-2">© {new Date().getFullYear()} Minimal Journal. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <TransitionLink href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</TransitionLink>
            <TransitionLink href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
