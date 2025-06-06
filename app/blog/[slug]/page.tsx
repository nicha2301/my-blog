"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/app/lib/utils";
import { urlFor } from "@/app/lib/sanity/client";
import TransitionLink from "@/app/components/transition-link";
import { PostComments } from "@/app/components/post-comments";
import { PostShare } from "@/app/components/post-share";
import { PostQuoteShare } from "@/app/components/post-quote-share";
import { getPostBySlug } from "@/app/lib/sanity/api";

// Hình ảnh mặc định
const DEFAULT_POST_IMAGE = "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

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

// Hàm đơn giản để chuyển đổi Markdown sang HTML
function simpleMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";
  
  let html = markdown
    // Chuyển đổi heading
    .replace(/^### (.*$)/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 id="$1">$1</h1>')
    
    // Chuyển đổi đoạn văn
    .replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /^<(\/)?(h1|h2|h3|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    })
    
    // Chuyển đổi in đậm và in nghiêng
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    
    // Chuyển đổi danh sách
    .replace(/^\s*\n\*/gm, '<ul>\n*')
    .replace(/^(\*)(.*)/gm, '<li>$2</li>')
    .replace(/<\/ul>\s*\n/gm, '</ul>\n')
    
    // Chuyển đổi blockquote
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    
    // Chuyển đổi code
    .replace(/`(.*?)`/gm, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
    
    // Chuyển đổi liên kết
    .replace(/\[([^\[]+)\]\(([^\)]+)\)/gm, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Loại bỏ các thẻ p lồng nhau
  html = html.replace(/<p><\/p>/g, '');
  
  return html;
}

// Chỉnh sửa type để phù hợp với cả API Sanity và dữ liệu tĩnh
interface ExtendedPost {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date: string;
  readTime?: string;
  image?: string;
  mainImage?: Record<string, any>;
  category: string;
  categorySlug: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    image?: Record<string, any>;
  };
  tags: string[];
}

// Cập nhật lại kiểu dữ liệu của hàm getRelatedPosts
declare function getRelatedPosts(postId: string, categoryId: string, limit?: number): Promise<ExtendedPost[]>;

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<ExtendedPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<ExtendedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{id: string, title: string, level: number}[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);
  
  // Force observer setup after content fully renders
  const [contentRendered, setContentRendered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pageUrl, setPageUrl] = useState<string>("");
  
  // Hàm helper để xử lý URL hình ảnh
  const getImageUrl = (imageSource: string | Record<string, any>): string => {
    if (!imageSource) return DEFAULT_POST_IMAGE;
    
    // Nếu là URL đầy đủ, trả về nguyên vẹn
    if (typeof imageSource === 'string' && imageSource.startsWith('http')) {
      return imageSource;
    }
    
    // Nếu là đối tượng tham chiếu Sanity, sử dụng urlFor
    try {
      return urlFor(imageSource).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return DEFAULT_POST_IMAGE;
    }
  };
  
  useEffect(() => {
    async function fetchPost() {
      if (slug) {
        try {
          const currentPost = await getPostBySlug(slug);
          if (!currentPost) {
            notFound();
          }
          
          setPost(currentPost);
          
          // Get related posts if category exists
          if (currentPost.id && currentPost.categorySlug) {
            try {
              const related = await getRelatedPosts(currentPost.id, currentPost.categorySlug, 3);
              
              // Đảm bảo mỗi bài viết liên quan đều có hình ảnh và slug hợp lệ
              const relatedWithDefaults = related.map((relatedPost: any) => ({
                ...relatedPost,
                image: relatedPost.mainImage ? getImageUrl(relatedPost.mainImage) : 
                       (relatedPost.image ? getImageUrl(relatedPost.image) : DEFAULT_POST_IMAGE),
                slug: typeof relatedPost.slug === 'string' ? relatedPost.slug : 
                      (relatedPost.slug && relatedPost.slug.current ? relatedPost.slug.current : '')
              }));
              
              setRelatedPosts(relatedWithDefaults);
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
  
  useEffect(() => {
    setIsMounted(true);
    setPageUrl(window.location.href);
  }, []);
  
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
  
  // Đảm bảo lại một lần nữa các giá trị không bị rỗng khi render
  const postImage = post.image && post.image !== '' ? post.image : DEFAULT_POST_IMAGE;
  const authorAvatar = post.author?.avatar && post.author.avatar !== '' ? post.author.avatar : DEFAULT_AVATAR;
  
  // Chuyển đổi nội dung Markdown thành HTML
  const contentHtml = simpleMarkdownToHtml(post.content || '');

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
                  {/* Luôn hiển thị avatar, sử dụng giá trị mặc định nếu cần */}
                  <Image
                    src={authorAvatar}
                    alt={post.author.name || 'Author'}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
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
            
            {/* Featured image - luôn hiển thị với giá trị mặc định nếu cần */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={postImage}
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
                  
                  {/* Social Share Component - Desktop */}
                  {isMounted && (
                    <div className="mt-10">
                      <PostShare title={post.title || ""} url={pageUrl} />
                    </div>
                  )}
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
              
              {/* Quote Share component */}
              {isMounted && <PostQuoteShare selector=".markdown-content" />}
              
              {/* Article content */}
              <div
                ref={contentRef} 
                className="markdown-content prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              >
                {/* Content is inserted via dangerouslySetInnerHTML */}
              </div>
              
              {/* Mobile Social Share */}
              {isMounted && (
                <div className="mt-8 mb-10 block lg:hidden">
                  <div className="flex justify-center">
                    <PostShare title={post.title || ""} url={pageUrl} />
                  </div>
                </div>
              )}
              
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
              
              {/* Comments Section */}
              {isMounted && <PostComments slug={post.slug} />}
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
                {/* Luôn hiển thị avatar với giá trị mặc định nếu cần */}
                <Image
                  src={authorAvatar}
                  alt={post.author.name || 'Author'}
                  width={100}
                  height={100}
                  className="object-cover rounded-full"
                />
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
                {relatedPosts.map((relatedPost, index) => {
                  // Đảm bảo hình ảnh của bài viết liên quan không rỗng
                  const relatedImage = relatedPost.image && relatedPost.image !== '' ? relatedPost.image : DEFAULT_POST_IMAGE;
                  
                  return (
                    <motion.article
                      key={relatedPost._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-t border-neutral-200 dark:border-neutral-800 pt-6"
                    >
                      <div className="img-zoom h-48 relative overflow-hidden mb-4">
                        <Image
                          src={relatedImage}
                          alt={relatedPost.title || 'Related post'}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <span className="badge badge-primary mb-2 inline-block">
                        {relatedPost.category || 'Uncategorized'}
                      </span>
                      <TransitionLink href={`/blog/${relatedPost.slug}`}>
                        <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                          {relatedPost.title || 'Untitled Post'}
                        </h3>
                      </TransitionLink>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {formatDate(relatedPost.date) || 'No date'}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
} 