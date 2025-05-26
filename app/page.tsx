"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (!heroRef.current) return;

    const heroTimeline = gsap.timeline();
    heroTimeline.fromTo(
      ".hero-title",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0
    );
    heroTimeline.fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.2
    );

    // Scrolling animations
    if (featuredRef.current) {
      gsap.fromTo(
        ".featured-article",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="hero-title text-3xl md:text-4xl font-bold mb-6">
              A minimalist approach to blogging and digital content.
            </h1>
            <p className="hero-subtitle text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Exploring design, typography, and thoughtful interactions through a clean and simplified lens.
            </p>
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mt-8">
              <Link href="/blog" className="btn btn-primary">
                Read Journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section ref={featuredRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="section-heading text-2xl font-bold">Featured Articles</h2>
            <Link href="/blog" className="link mt-4 md:mt-0">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <motion.article 
              className="featured-article"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="img-zoom h-60 relative overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
                  alt="Article thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <span className="badge badge-primary mb-3">Design Principles</span>
              <Link href="/blog/design-principles">
                <h3 className="text-xl font-bold mb-3 hover:text-secondary transition-colors">The Art of Minimalism in Digital Spaces</h3>
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Explore how less becomes more in the digital landscape, and why minimal design continues to dominate.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">June 12, 2023</span>
                <Link href="/blog/design-principles" className="link">Read</Link>
              </div>
            </motion.article>

            {/* Article 2 */}
            <motion.article 
              className="featured-article"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="img-zoom h-60 relative overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1770&auto=format&fit=crop"
                  alt="Article thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <span className="badge badge-secondary mb-3">Typography</span>
              <Link href="/blog/typography-trends">
                <h3 className="text-xl font-bold mb-3 hover:text-secondary transition-colors">Typography Trends for Modern Interfaces</h3>
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Discover the latest typography trends shaping how we read and interact with digital content.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">May 28, 2023</span>
                <Link href="/blog/typography-trends" className="link">Read</Link>
              </div>
            </motion.article>

            {/* Article 3 */}
            <motion.article 
              className="featured-article"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="img-zoom h-60 relative overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop"
                  alt="Article thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <span className="badge badge-primary mb-3">Interaction</span>
              <Link href="/blog/micro-interactions">
                <h3 className="text-xl font-bold mb-3 hover:text-secondary transition-colors">Micro-Interactions: The Details That Matter</h3>
              </Link>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                How subtle animations and feedback create memorable user experiences that feel more human.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">May 15, 2023</span>
                <Link href="/blog/micro-interactions" className="link">Read</Link>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-2xl font-bold mb-12">Topics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 dark:border-neutral-800 p-6 text-center"
              >
                <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">{category.description}</p>
                <Link href={category.link} className="link text-sm">Explore</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Subscribe to our newsletter for exclusive content and insights.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="input flex-grow min-w-0"
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="section-heading text-2xl font-bold">Latest Articles</h2>
            <Link href="/blog" className="link mt-4 md:mt-0">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestArticles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 group"
              >
                <div className="img-zoom w-full md:w-32 h-32 md:h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={280}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className={`badge ${article.categoryColor} mb-3`}>{article.category}</span>
                  <Link href={article.link}>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-2 line-clamp-2 text-sm">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">{article.date}</span>
                    <Link href={article.link} className="link text-sm">Read</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Category data
const categories = [
  {
    title: "Design Principles",
    description: "Fundamental concepts that guide effective design",
    link: "/categories/design-principles"
  },
  {
    title: "Typography",
    description: "The art and technique of arranging type",
    link: "/categories/typography"
  },
  {
    title: "Color Theory",
    description: "Understanding the impact of color in design",
    link: "/categories/color-theory"
  },
  {
    title: "UX Patterns",
    description: "Best practices for exceptional user experiences",
    link: "/categories/ux-patterns"
  }
];

// Latest articles data
const latestArticles = [
  {
    title: "The Psychology of White Space in Web Design",
    excerpt: "Understanding how negative space influences user perception and content readability.",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1780&auto=format&fit=crop",
    category: "Design Principles",
    categoryColor: "badge-primary",
    date: "June 8, 2023",
    link: "/blog/white-space-psychology"
  },
  {
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt: "Learn how to create inclusive designs that work for all users, regardless of abilities.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1770&auto=format&fit=crop",
    category: "Accessibility",
    categoryColor: "badge-secondary",
    date: "June 5, 2023",
    link: "/blog/accessibility-guide"
  },
  {
    title: "Color Psychology in Modern Interfaces",
    excerpt: "How different color choices influence user behavior and emotional responses.",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1771&auto=format&fit=crop",
    category: "Color Theory",
    categoryColor: "badge-primary",
    date: "June 1, 2023",
    link: "/blog/color-psychology"
  },
  {
    title: "The Evolution of Design Systems",
    excerpt: "Tracing the development of design systems from print to digital and beyond.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1770&auto=format&fit=crop",
    category: "Design Systems",
    categoryColor: "badge-secondary",
    date: "May 25, 2023",
    link: "/blog/design-systems-evolution"
  }
];
