"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from "react";
import Link from 'next/link';
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import ThemeSwitcher from "./components/theme-switcher";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // @ts-ignore - Fixing type issues with Lenis options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    
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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pt-28">
            {children}
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
            ? "py-4 bg-background/90 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="text-xl font-medium">
            Minimal Journal
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <Link href="/about" className="hover:text-secondary transition-colors">About</Link>
            <Link href="/blog" className="hover:text-secondary transition-colors">Journal</Link>
            <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
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
          <Link href="/" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/blog" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
          <Link href="/contact" className="hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-medium mb-4 inline-block">
              Minimal Journal
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
              A minimalist blog featuring clean design and thoughtful content.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors">Contact</Link></li>
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
          <p>© {new Date().getFullYear()} Minimal Journal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
