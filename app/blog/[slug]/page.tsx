"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Post, posts, getPostBySlug, getRelatedPosts } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import TransitionLink from "@/app/components/transition-link";

// Function to extract headings from markdown content
function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { level: number; title: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
    headings.push({ level, title, id });
  }

  return headings;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);
  
  // Force observer setup after content fully renders
  const [contentRendered, setContentRendered] = useState(false);
  
  useEffect(() => {
    if (slug) {
      const currentPost = getPostBySlug(slug as string);
      if (!currentPost) {
        notFound();
      }
      
      setPost(currentPost);
      setRelatedPosts(getRelatedPosts(currentPost.id, currentPost.categorySlug, 3));
      setHeadings(extractHeadings(currentPost.content));
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [slug]);

  useEffect(() => {
    if (!loading && post) {
      // Small delay to ensure content is fully rendered
      const timer = setTimeout(() => {
        setContentRendered(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading, post]);

  // Replace the existing intersection observer effect with this simpler approach
  useEffect(() => {
    if (!loading && post && contentRef.current) {
      // Function to determine which heading is in view
      const determineActiveHeading = () => {
        if (!contentRef.current) return;
        
        const headings = Array.from(contentRef.current.querySelectorAll('h1[id], h2[id], h3[id]'));
        if (headings.length === 0) return;
        
        // Get all headings with their positions
        const headingPositions = headings.map(heading => {
          const { top } = heading.getBoundingClientRect();
          return { id: heading.id, top };
        });
        
        // Find the first heading that is below the threshold (accounting for header height)
        const headerOffset = 150; // Adjust based on your header height
        const currentHeading = headingPositions.find(heading => heading.top >= -10 && heading.top < headerOffset);
        
        // If we found a heading or use the first heading that's above viewport but closest
        if (currentHeading) {
          setActiveId(currentHeading.id);
        } else {
          // Find the last heading that's above the viewport
          const headingsAbove = headingPositions.filter(heading => heading.top < -10);
          if (headingsAbove.length > 0) {
            const closestHeading = headingsAbove.reduce((prev, current) => 
              (current.top > prev.top) ? current : prev
            );
            setActiveId(closestHeading.id);
          }
        }
      };
      
      // Run once immediately
      setTimeout(() => {
        determineActiveHeading();
      }, 500);
      
      // Set up scroll listener
      window.addEventListener('scroll', determineActiveHeading, { passive: true });
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', determineActiveHeading);
      };
    }
  }, [loading, post]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Set active ID immediately for better UX
      setActiveId(id);
      
      // Scroll to the element with smooth behavior
      const yOffset = -100; // Adjust as needed to account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
          </div>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  // Custom renderer for markdown components
  const components = {
    h1: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h1 id={id} className="text-3xl font-bold mt-10 mb-6 text-neutral-900 dark:text-neutral-500" {...props} />;
    },
    h2: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-500" {...props} />;
    },
    h3: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h3 id={id} className="text-xl font-bold mt-6 mb-3 text-neutral-700 dark:text-neutral-500" {...props} />;
    },
    p: ({ node, ...props }: any) => <p className="mb-6 leading-relaxed" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
    li: ({ node, ...props }: any) => <li className="mb-1" {...props} />,
    blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-primary pl-4 py-2 mb-6 italic bg-neutral-50 dark:bg-neutral-800/50" {...props} />,
    code: ({ node, inline, ...props }: any) => <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />,
    pre: ({ node, ...props }: any) => <pre className="bg-neutral-800 text-neutral-200 p-4 rounded-md overflow-x-auto mb-6" {...props} />,
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link href={`/category/${post.categorySlug}`} className="badge badge-primary mb-6 inline-block">
                {post.category}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-8">{post.title}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                  <Link href={`/author/${post.author.id}`} className="text-sm hover:text-primary transition-colors">
                    {post.author.name}
                  </Link>
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{post.date}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{post.readTime}</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[16/9] mb-12 overflow-hidden shadow-lg"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary opacity-60 z-10"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary opacity-60 z-10"></div>
              
              {/* Image with overlay */}
              <div className="relative w-full h-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full h-full"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover z-0"
                    priority
                  />
                </motion.div>
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-[1]"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent z-[1]"></div>
                
                {/* Subtle pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-10 z-[1] mix-blend-soft-light"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '12px 12px'
                  }}
                ></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-[2]">
                  <span className="badge badge-primary py-2 px-4 text-sm shadow-md">
                    {post.category}
                  </span>
                </div>
                
                {/* Reading time indicator */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1.5 backdrop-blur-sm z-[2]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Content Section with Table of Contents */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents (Desktop) */}
            {headings.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden lg:block lg:w-64 shrink-0 sticky top-24 self-start overflow-y-auto max-h-[calc(100vh-150px)] pr-4"
              >
                <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
                  <h4 className="text-sm font-bold uppercase text-neutral-500 dark:text-neutral-500 mb-4">Table of Contents</h4>
                  <nav className="toc">
                    <ul className="space-y-3 text-sm">
                      {headings.map((heading, index) => (
                        <li 
                          key={index}
                          className={`${
                            heading.level === 1 ? 'ml-0' : 
                            heading.level === 2 ? 'ml-3' : 
                            'ml-6'
                          }`}
                        >
                          <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={`toc-link-item hover:text-primary transition-colors inline-block text-left py-1 ${
                              activeId === heading.id ? 'text-primary font-medium toc-link-active' : 'text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            {heading.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.aside>
            )}
            
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-3xl"
            >
              {/* Table of Contents (Mobile) */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <details className="toc-mobile" ref={mobileDetailsRef}>
                    <summary className="text-sm font-bold uppercase text-neutral-500 dark:text-neutral-400 cursor-pointer">
                      Table of Contents
                    </summary>
                    <nav className="pt-4">
                      <ul className="space-y-3 text-sm">
                        {headings.map((heading, index) => (
                          <li 
                            key={index}
                            className={`${
                              heading.level === 1 ? 'ml-0' : 
                              heading.level === 2 ? 'ml-3' : 
                              'ml-6'
                            }`}
                          >
                            <button
                              onClick={() => {
                                scrollToHeading(heading.id);
                                mobileDetailsRef.current?.removeAttribute('open');
                              }}
                              className={`toc-link-item hover:text-primary transition-colors inline-block py-1 text-neutral-600 dark:text-neutral-400 ${
                                activeId === heading.id ? 'text-primary font-medium toc-link-active' : ''
                              }`}
                            >
                              {heading.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </details>
                </div>
              )}
              
              {/* Article content */}
              <div
                ref={contentRef} 
                className="markdown-content prose prose-lg dark:prose-invert max-w-none"
              >
                <Markdown components={components}>
                  {post.content}
                </Markdown>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 mb-16">
                {post.tags.map((tag: string, index: number) => (
                  <Link 
                    key={index}
                    href={`/tag/${tag}`}
                    className="text-sm px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-full"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Author Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={100}
                height={100}
                className="object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Author of insightful articles on design and technology.
                </p>
                <Link href={`/author/${post.author.id}`} className="link">
                  View all posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-10">You might also like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-t border-neutral-200 dark:border-neutral-800 pt-6"
                >
                  <div className="img-zoom h-48 relative overflow-hidden mb-4">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="badge badge-primary mb-2 inline-block">
                    {relatedPost.category}
                  </span>
                  <TransitionLink href={`/blog/${relatedPost.slug}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </TransitionLink>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {relatedPost.date}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 