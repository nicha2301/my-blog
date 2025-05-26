"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { posts } from "@/app/lib/data";
import Image from "next/image";
import TransitionLink from "@/app/components/transition-link";

// Group posts by month and year
const groupPostsByDate = () => {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Group by month and year
  const grouped: Record<string, typeof posts> = {};
  
  sortedPosts.forEach(post => {
    const date = new Date(post.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(post);
  });
  
  return grouped;
};

export default function Archive() {
  const groupedPosts = groupPostsByDate();
  const [activeMonth, setActiveMonth] = useState<string | null>(Object.keys(groupedPosts)[0] || null);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              Archive
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 text-center"
            >
              Browse our collection of articles organized by date.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar with months */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <h2 className="text-xl font-bold mb-6">Timeline</h2>
                <ul className="space-y-3">
                  {Object.keys(groupedPosts).map((month) => (
                    <li key={month}>
                      <button 
                        onClick={() => setActiveMonth(month)}
                        className={`block w-full text-left py-2 px-4 transition-colors ${
                          activeMonth === month
                            ? "bg-primary text-white"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {month} ({groupedPosts[month].length})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Articles for selected month */}
            <div className="md:col-span-3">
              {activeMonth && (
                <>
                  <h2 className="text-2xl font-bold mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    {activeMonth}
                  </h2>
                  
                  <div className="space-y-10">
                    {groupedPosts[activeMonth].map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                      >
                        <div className="md:col-span-1">
                          <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <div className="flex justify-between items-center mb-2">
                            <TransitionLink href={`/category/${post.categorySlug}`} className="badge badge-primary">
                              {post.category}
                            </TransitionLink>
                            <span className="text-sm text-neutral-500">{post.date}</span>
                          </div>
                          <TransitionLink href={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                          </TransitionLink>
                          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={24}
                                height={24}
                                className="object-cover rounded-full"
                              />
                              <TransitionLink 
                                href={`/author/${post.author.id}`}
                                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
                              >
                                {post.author.name}
                              </TransitionLink>
                            </div>
                            <TransitionLink href={`/blog/${post.slug}`} className="link text-sm">
                              Read
                            </TransitionLink>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-neutral-50 dark:bg-neutral-900 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Never miss an article</h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
                Subscribe to our newsletter and receive updates on new articles and exclusive content.
              </p>
            </div>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input flex-1"
                  required
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
} 