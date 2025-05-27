"use client";

import Image from "next/image";
import TransitionLink from "@/app/components/transition-link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HomeContent() {
  const headerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Animate header text on load
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll(".animate-line"),
        { 
          opacity: 0,
          y: 40,
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Set up scroll animations for sections
    const sections = document.querySelectorAll('.animate-section');

    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            onEnter: () => {
              setCurrentSection(i);
            }
          }
        }
      );
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden -mt-28">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0" />
        <div className="absolute h-64 w-64 rounded-full bg-primary/10 blur-3xl -top-12 -right-12" />
        <div className="absolute h-96 w-96 rounded-full bg-secondary/10 blur-3xl -bottom-20 -left-20" />

        <div className="container relative z-10">
          <div className="max-w-4xl" ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="badge badge-primary">Design Journal</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <div className="animate-line">Exploring the art of</div>
              <div className="animate-line bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">minimal design</div>
              <div className="animate-line">and thoughtful interactions.</div>
            </h1>
            <div className="mt-10 animate-line">
              <TransitionLink href="/blog" className="btn btn-primary px-8 py-3">
                Explore Journal
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2"/>
              <circle className="animate-ping-slow" cx="8" cy="8" r="3" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 animate-section">
        <div className="container">
          <h2 className="section-heading text-3xl font-bold mb-16">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden mb-6">
          <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <TransitionLink href={`/blog/${article.slug}`}>
                    <h3 className="text-2xl font-bold mb-3 hover:text-secondary transition-colors">{article.title}</h3>
                  </TransitionLink>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">{article.excerpt}</p>
                  <TransitionLink href={`/blog/${article.slug}`} className="btn btn-primary">Read Article</TransitionLink>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <TransitionLink href="/blog" className="btn btn-outline">
              View All Articles
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 border-t border-neutral-200 dark:border-neutral-800 animate-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px]">
              <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl top-0 left-0 z-0" />
              <div className="relative z-10 h-full">
          <Image
                  src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?q=80&w=1904&auto=format&fit=crop"
                  alt="About Minimal Journal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div>
              <span className="badge badge-primary mb-6">About Us</span>
              <h2 className="text-3xl font-bold mb-6">Minimal Journal</h2>
              <p className="text-lg mb-6 text-neutral-600 dark:text-neutral-400">
                At Minimal Journal, we believe that great design is more than just aesthetics—it's about the thoughtful fusion of form and function to create meaningful, impactful experiences.
              </p>
              <p className="text-lg mb-8 text-neutral-600 dark:text-neutral-400">
                Our mission is to explore, celebrate, and share the principles of exceptional design across digital and physical spaces, inspiring both creators and consumers.
              </p>
              <TransitionLink href="/about" className="btn btn-primary">
                Learn More About Us
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 animate-section">
        <div className="container">
          <h2 className="section-heading text-3xl font-bold mb-16 text-center">Explore Topics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 dark:border-neutral-800 p-8 text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">{category.description}</p>
                <TransitionLink href={`/blog?category=${category.id}`} className="link">
                  Explore Articles
                </TransitionLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 border-t border-neutral-200 dark:border-neutral-800 animate-section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge badge-primary mb-6">Stay Updated</span>
            <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Get the latest articles, design resources, and exclusive content delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
    </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading home page...</div>}>
      <HomeContent />
    </Suspense>
  );
}

// Featured articles data
const featuredArticles = [
  {
    title: "The Art of Minimalism in Digital Design",
    slug: "minimalism-in-digital-design",
    excerpt: "Explore how the principles of minimalism can create more effective, elegant, and user-friendly digital experiences that stand the test of time.",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Typography Trends for Modern Interfaces",
    slug: "typography-trends",
    excerpt: "Discover the latest typography trends shaping how we read and interact with digital content in today's design landscape.",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1770&auto=format&fit=crop"
  }
];

// Categories data
const categories = [
  {
    id: "design-principles",
    name: "Design Principles",
    description: "Fundamental concepts that guide effective and beautiful design across all mediums.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  },
  {
    id: "typography",
    name: "Typography",
    description: "The art and technique of arranging type to make written language legible and appealing.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  },
  {
    id: "interaction",
    name: "Interaction Design",
    description: "Creating engaging interfaces with meaningful animations and thoughtful user flows.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>
  }
];
