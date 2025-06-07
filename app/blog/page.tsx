"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import RippleButton from "../components/ripple-button";
import { getAllPosts, getAllCategories } from "../lib/sanity/api";
import { Post } from "../lib/data";
import TransitionLink from "../components/transition-link";
import { urlFor } from "../lib/sanity/client";
import { formatDate } from "../lib/utils";
import { trackEvent, trackSearch } from "../lib/analytics";

// Wrap the component that uses useSearchParams in Suspense
function BlogFilterContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([
    { id: "all", name: "All Categories" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        
        const fetchedCategories = await getAllCategories();
        setCategories([
          { id: "all", name: "All Categories" },
          ...fetchedCategories.map(category => ({
            id: category.slug,
            name: category.title
          }))
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    // Get category from URL on first load if present
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.categorySlug === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.length > 0 ? posts[0] : null;

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Track category filter usage
    trackEvent('category_filter', {
      category_id: categoryId,
      category_name: categories.find(cat => cat.id === categoryId)?.name || 'Unknown'
    });
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Track search when user stops typing
  useEffect(() => {
    if (searchQuery) {
      const debounceTimer = setTimeout(() => {
        trackSearch(searchQuery);
      }, 1000); // Wait 1 second after typing stops
      
      return () => clearTimeout(debounceTimer);
    }
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

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
                <RippleButton
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  active={activeCategory === category.id}
                  className="filter-btn-custom"
                >
                  {category.name}
                </RippleButton>
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
                  className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
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
      {featuredPost && activeCategory === "all" && searchQuery === "" && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="badge badge-primary mb-4">Featured</span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">{featuredPost.title}</h2>
                  <p className="text-lg mb-6 text-neutral-600 dark:text-neutral-400">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      {featuredPost.author.avatar && (
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-sm">{featuredPost.author.name}</span>
                    </div>
                    <span className="text-sm text-neutral-500">
                      {formatDate(featuredPost.date)}
                    </span>
                  </div>
                  <TransitionLink
                    href={`/blog/${featuredPost.slug.current || featuredPost.slug}`}
                    className="btn btn-primary"
                  >
                    Read Article
                  </TransitionLink>
                </motion.div>
              </div>
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
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
                  key={post._id}
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
                      <span className="text-sm text-neutral-500">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <TransitionLink href={`/blog/${post.slug.current || post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 hover:text-secondary transition-colors">{post.title}</h3>
                    </TransitionLink>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {post.author.avatar && (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="object-cover rounded-full"
                          />
                        )}
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{post.author.name}</span>
                      </div>
                      <TransitionLink href={`/blog/${post.slug.current || post.slug}`} className="link text-sm">
                        Read
                      </TransitionLink>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl mb-4">No posts found for this category</h3>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="btn btn-primary"
              >
                View All Posts
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
  { id: "philosophy", name: "Philosophy" }
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
    title: "The Philosophy of a Deflated Ball: Value, Neglect, and Memory",
    slug: "philosophy-of-deflated-ball",
    excerpt: "A philosophical exploration of the paradox of neglect and value through the metaphor of an abandoned, deflated soccer ball.",
    category: "Philosophy",
    date: "July 15, 2023",
    image: "https://png.pngtree.com/background/20230703/original/pngtree-old-soccer-ball-poor-school-soccer-field-leisure-ground-tile-photo-picture-image_4124623.jpg",
    author: {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop"
    }
  }
]; 