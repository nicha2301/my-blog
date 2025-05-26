"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./transition-link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Navigation items with nested submenus
  const navigationItems = [
    { 
      name: "Home", 
      href: "/" 
    },
    { 
      name: "About", 
      href: "/about" 
    },
    { 
      name: "Blog", 
      href: "/blog",
      submenu: [
        { name: "All Articles", href: "/blog" },
        { name: "Categories", href: "/categories" },
        { name: "Authors", href: "/authors" },
        { name: "Archive", href: "/archive" },
      ]
    },
    { 
      name: "Contact", 
      href: "/contact" 
    },
  ];

  // Check if current path matches the nav item path
  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled 
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <TransitionLink href="/" className="text-xl font-medium z-10">
            Minimal Journal
          </TransitionLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <TransitionLink
                  href={item.href}
                  className={`px-4 py-2 relative transition-colors ${
                    isActivePath(item.href)
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <span className="ml-1 inline-block">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </TransitionLink>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-md bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <TransitionLink
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 text-sm ${
                            isActivePath(subItem.href)
                              ? "text-primary"
                              : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary"
                          }`}
                        >
                          {subItem.name}
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Search button */}
            <TransitionLink
              href="/search"
              className={`p-2 ml-2 transition-colors ${
                isActivePath("/search")
                  ? "text-primary"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary"
              }`}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </TransitionLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-10 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isOpen ? "w-0 opacity-0" : "w-4"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${
                  isOpen ? "w-6 rotate-45 -translate-y-2" : "w-6"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-40 lg:hidden overflow-y-auto pt-20 pb-6 px-4"
          >
            <div className="container">
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <div key={item.name} className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    {!item.submenu ? (
                      <TransitionLink
                        href={item.href}
                        className={`text-2xl font-bold ${
                          isActivePath(item.href) ? "text-primary" : ""
                        }`}
                      >
                        {item.name}
                      </TransitionLink>
                    ) : (
                      <>
                        <span className="text-2xl font-bold block mb-3">{item.name}</span>
                        <div className="flex flex-col gap-2 pl-4">
                          {item.submenu.map((subItem) => (
                            <TransitionLink
                              key={subItem.name}
                              href={subItem.href}
                              className={`font-medium ${
                                isActivePath(subItem.href)
                                  ? "text-primary"
                                  : "text-neutral-700 dark:text-neutral-300"
                              }`}
                            >
                              {subItem.name}
                            </TransitionLink>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <TransitionLink
                    href="/search"
                    className={`flex items-center gap-2 ${
                      isActivePath("/search") ? "text-primary" : ""
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-2xl font-bold">Search</span>
                  </TransitionLink>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 