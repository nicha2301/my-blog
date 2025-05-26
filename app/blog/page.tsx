"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Wrap the component that uses useSearchParams in Suspense
function BlogFilterContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Get category from URL on first load if present
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge-primary mb-6 inline-block"
            >
              Journal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              Explore Our Articles
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10"
            >
              Dive into our collection of thoughtful articles on design, typography, interactions, and more.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-t border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input pl-10 w-full md:w-64"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === "all" && !searchQuery && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="badge badge-primary mb-4">Featured</span>
                <h2 className="text-2xl font-bold mb-4">The Art of Minimalism in Digital Design</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Explore how the principles of minimalism can create more effective, elegant, and user-friendly digital experiences that stand the test of time.
                </p>
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
                      alt="Alex Morgan"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Alex Morgan</span>
                  </div>
                  <div className="text-sm text-neutral-500">June 12, 2023</div>
                  <div className="text-sm text-neutral-500">8 min read</div>
                </div>
                <Link href="/blog/minimalism-in-digital-design" className="btn btn-primary">
                  Read Article
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop"
                  alt="Minimalism in Digital Design"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-t border-neutral-200 dark:border-neutral-800 pt-6"
                >
                  <div className="img-zoom h-60 relative overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="badge badge-primary">
                        {post.category}
                      </span>
                      <span className="text-sm text-neutral-500">{post.date}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 hover:text-secondary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{post.author.name}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="link text-sm">
                        Read
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No articles found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                We couldn&apos;t find any articles matching your current filters. Try adjusting your search or browse all articles.
              </p>
              <button 
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="btn btn-primary"
              >
                View All Articles
              </button>
            </div>
          )}
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
              <h2 className="text-2xl font-bold mb-4">Never Miss an Article</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Subscribe to our newsletter for exclusive content and design insights.
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Main Blog component with Suspense boundary for useSearchParams()
function BlogContent() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading blog content...</div>}>
      <BlogFilterContent />
    </Suspense>
  );
}

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading blog content...</div>}>
      <BlogContent />
    </Suspense>
  );
}


// Categories data
const categories = [
  { id: "all", name: "All Categories" },
  { id: "design principles", name: "Design Principles" },
  { id: "typography", name: "Typography" },
  { id: "color theory", name: "Color Theory" },
  { id: "interaction", name: "Interaction" },
  { id: "ux patterns", name: "UX Patterns" },
  { id: "accessibility", name: "Accessibility" },
];

// Blog posts data
const posts = [
  {
    id: 1,
    title: "The Art of Minimalism in Digital Design",
    slug: "minimalism-in-digital-design",
    excerpt: "Explore how the principles of minimalism can create more effective, elegant, and user-friendly digital experiences.",
    category: "Design Principles",
    date: "June 12, 2023",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
    }
  },
  {
    id: 2,
    title: "Typography Trends for Modern Interfaces",
    slug: "typography-trends",
    excerpt: "Discover the latest typography trends shaping how we read and interact with digital content.",
    category: "Typography",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1770&auto=format&fit=crop",
    author: {
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop"
    }
  },
  {
    id: 3,
    title: "Micro-Interactions: The Details That Matter",
    slug: "micro-interactions",
    excerpt: "How subtle animations and feedback create memorable user experiences that feel more human.",
    category: "Interaction",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop",
    author: {
      name: "Taylor Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop"
    }
  },
  {
    id: 4,
    title: "The Psychology of White Space in Web Design",
    slug: "white-space-psychology",
    excerpt: "Understanding how negative space influences user perception and content readability.",
    category: "Design Principles",
    date: "June 8, 2023",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1780&auto=format&fit=crop",
    author: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
    }
  },
  {
    id: 5,
    title: "Designing for Accessibility: A Comprehensive Guide",
    slug: "accessibility-guide",
    excerpt: "Learn how to create inclusive designs that work for all users, regardless of abilities.",
    category: "Accessibility",
    date: "June 5, 2023",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1770&auto=format&fit=crop",
    author: {
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop"
    }
  },
  {
    id: 6,
    title: "Color Psychology in Modern Interfaces",
    slug: "color-psychology",
    excerpt: "How different color choices influence user behavior and emotional responses.",
    category: "Color Theory",
    date: "June 1, 2023",
    image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1771&auto=format&fit=crop",
    author: {
      name: "Taylor Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop"
    }
  },
  {
    id: 7,
    title: "The Evolution of Design Systems",
    slug: "design-systems-evolution",
    excerpt: "Tracing the development of design systems from print to digital and beyond.",
    category: "Design Principles",
    date: "May 25, 2023",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1770&auto=format&fit=crop",
    author: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
    }
  },
  {
    id: 8,
    title: "Dark Mode Design: Best Practices",
    slug: "dark-mode-design",
    excerpt: "Creating effective and elegant dark mode interfaces that enhance user experience.",
    category: "UX Patterns",
    date: "May 18, 2023",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop",
    author: {
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop"
    }
  },
  {
    id: 9,
    title: "Fluid Typography for Responsive Design",
    slug: "fluid-typography",
    excerpt: "How to implement typography that scales smoothly across different screen sizes.",
    category: "Typography",
    date: "May 10, 2023",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Taylor Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop"
    }
  }
]; 