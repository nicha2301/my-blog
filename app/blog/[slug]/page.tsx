"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/app/lib/sanity/api";
import Image from "next/image";
import TransitionLink from "@/app/components/transition-link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { formatDate } from "@/app/lib/utils";

// Function to extract headings from markdown content
function extractHeadings(content: string) {
  if (!content) return [];
  
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
    async function fetchPost() {
      if (slug) {
        try {
          const currentPost = await getPostBySlug(slug as string);
          if (!currentPost) {
            notFound();
          }
          
          setPost(currentPost);
          
          // Get related posts if category exists
          if (currentPost._id && currentPost.categorySlug) {
            try {
              const related = await getRelatedPosts(currentPost._id, currentPost.categorySlug, 3);
              setRelatedPosts(related);
            } catch (error) {
              console.error("Error fetching related posts:", error);
              setRelatedPosts([]);
            }
          }
          
          // Extract headings from content if available
          if (currentPost.content) {
            setHeadings(extractHeadings(currentPost.content));
          }
          
          // Simulate loading
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } catch (error) {
          console.error("Error fetching post:", error);
          notFound();
        }
      }
    }
    
    fetchPost();
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

  useEffect(() => {
    if (contentRendered && contentRef.current) {
      // Create intersection observer for headings
      const headingElements = contentRef.current.querySelectorAll('h1, h2, h3');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '0px 0px -80% 0px',
          threshold: 0.1,
        }
      );
      
      headingElements.forEach((el) => {
        observer.observe(el);
      });
      
      return () => {
        headingElements.forEach((el) => {
          observer.unobserve(el);
        });
      };
    }
  }, [contentRendered]);
  
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  // Format post date
  const formattedDate = formatDate(post.date);

  // Custom renderer for markdown components
  const components = {
    h1: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h1 id={id} className="text-3xl font-bold mt-10 mb-6 text-neutral-900 dark:text-neutral-400" {...props} />;
    },
    h2: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h2 id={id} className="text-2xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-400" {...props} />;
    },
    h3: ({ node, ...props }: any) => {
      const id = props.children?.toString().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
      return <h3 id={id} className="text-xl font-bold mt-6 mb-3 text-neutral-700 dark:text-neutral-400" {...props} />;
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
              {post.categorySlug && (
                <TransitionLink href={`/category/${post.categorySlug}`} className="badge badge-primary mb-6 inline-block">
                  {post.category}
                </TransitionLink>
              )}
              <h1 className="text-3xl md:text-5xl font-bold mb-8">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  {post.author?.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name || 'Author'}
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  )}
                  {post.author?.id && (
                    <TransitionLink href={`/author/${post.author.id}`} className="text-sm hover:text-primary transition-colors">
                      {post.author.name || 'Author'}
                    </TransitionLink>
                  )}
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{formattedDate}</span>
                {post.readTime && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{post.readTime}</span>
                )}
              </div>
            </motion.div>
            
            {/* Featured image */}
            {post.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  <div 
                    className="absolute inset-0 opacity-10 z-[1] mix-blend-soft-light"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '12px 12px'
                    }}
                  ></div>
                  
                  {/* Category badge */}
                  {post.category && (
                    <div className="absolute top-4 left-4 z-[2]">
                      <span className="badge badge-primary py-2 px-4 text-sm shadow-md">
                        {post.category}
                      </span>
                    </div>
                  )}
                  
                  {/* Reading time indicator */}
                  {post.readTime && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1.5 backdrop-blur-sm z-[2]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Content Section with Table of Contents */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Desktop Table of Contents - Fixed on the right */}
              {headings.length > 0 && (
                <div className="hidden lg:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
                    <h4 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Table of Contents</h4>
                    <nav>
                      <ul className="space-y-3">
                        {headings.map((heading, index) => (
                          <li 
                            key={index} 
                            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                          >
                            <a 
                              href={`#${heading.id}`}
                              className={`text-sm hover:text-primary transition-colors block ${
                                activeId === heading.id ? 'text-primary font-medium' : 'text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              {heading.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
              
              {/* Mobile Table of Contents - Collapsible */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8">
                  <details ref={mobileDetailsRef} className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer">
                      <span className="font-medium">Table of Contents</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 border-t border-neutral-200 dark:border-neutral-700">
                      <nav>
                        <ul className="space-y-3">
                          {headings.map((heading, index) => (
                            <li 
                              key={index} 
                              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                            >
                              <a 
                                href={`#${heading.id}`}
                                className={`text-sm hover:text-primary transition-colors block ${
                                  activeId === heading.id ? 'text-primary font-medium' : 'text-neutral-600 dark:text-neutral-400'
                                }`}
                                onClick={() => mobileDetailsRef.current?.removeAttribute('open')}
                              >
                                {heading.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </details>
                </div>
              )}
              
              {/* Article content */}
              <div
                ref={contentRef} 
                className="markdown-content prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24"
              >
                {post.content ? (
                  <Markdown components={components}>
                    {post.content}
                  </Markdown>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-400">This post has no content.</p>
                )}
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 mb-16">
                  {post.tags.map((tag: string, index: number) => (
                    <TransitionLink 
                      key={index}
                      href={`/tag/${tag}`}
                      className="text-sm px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-full"
                    >
                      #{tag}
                    </TransitionLink>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Author Section */}
      {post.author && (
        <section className="py-16 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name || 'Author'}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-600 dark:text-neutral-50">{post.author.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Author of insightful articles on design and technology.
                  </p>
                  {post.author.id && (
                    <TransitionLink href={`/author/${post.author.id}`} className="link">
                      View all posts
                    </TransitionLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-10">You might also like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-t border-neutral-200 dark:border-neutral-800 pt-6"
                  >
                    {relatedPost.image && (
                      <div className="img-zoom h-48 relative overflow-hidden mb-4">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="badge badge-primary mb-2 inline-block">
                      {relatedPost.category}
                    </span>
                    <TransitionLink href={`/blog/${relatedPost.slug.current || relatedPost.slug}`}>
                      <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </TransitionLink>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {formatDate(relatedPost.date)}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
} 