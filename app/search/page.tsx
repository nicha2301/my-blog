"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "@/app/lib/data";
import Image from "next/image";
import { motion } from "framer-motion";
import TransitionLink from "@/app/components/transition-link";
import type { Post } from "@/app/lib/data";
import { Suspense } from "react";

// SearchContent component with useSearchParams
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search when query changes
  useEffect(() => {
    setSearchQuery(query);
    
    if (query) {
      setIsSearching(true);
      
      // Simulate search delay
      setTimeout(() => {
        const results = posts.filter(post => {
          const searchableText = `${post.title} ${post.excerpt} ${post.content} ${post.category} ${post.author.name}`.toLowerCase();
          return searchableText.includes(query.toLowerCase());
        });
        
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [query]);

  // Handle search form submission
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Search Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Search Articles</h1>
            
            <form onSubmit={handleSearch} className="mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full py-4 pl-12 pr-4"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Search Results */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          {query ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">
                {isSearching 
                  ? "Searching..." 
                  : `${searchResults.length} results for "${query}"`}
              </h2>
              
              {isSearching ? (
                <div className="flex items-center justify-center py-16">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
                    <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="space-y-12">
                      {searchResults.map((post, index) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-12"
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
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                      <h3 className="text-xl font-bold mb-4">No results found</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                        We couldn&apos;t find any articles matching &quot;{query}&quot;. Try using different keywords or browse all articles.
                      </p>
                      <TransitionLink href="/blog" className="btn btn-primary">
                        Browse All Articles
                      </TransitionLink>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-8">
              <p className="text-neutral-600 dark:text-neutral-400">
                Enter a search term to find articles
              </p>
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Popular searches:</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {["design", "typography", "minimalism", "accessibility", "react"].map((term) => (
                    <button
                      key={term}
                      onClick={() => router.push(`/search?q=${term}`)}
                      className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Main search page with Suspense boundary
export default function Search() {
  return (
    <Suspense fallback={
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Search Articles</h1>
            <div className="relative">
              <div className="input w-full py-4 pl-12 pr-4 animate-pulse bg-neutral-100 dark:bg-neutral-800"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
} 