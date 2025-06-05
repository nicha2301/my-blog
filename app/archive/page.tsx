"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/app/components/transition-link";
import { getAllPosts } from "@/app/lib/sanity/api";
import type { Post } from "@/app/lib/data";
import { formatDate } from "@/app/lib/utils";
import { urlFor } from "@/app/lib/sanity/client";

// Hình mặc định
const DEFAULT_POST_IMAGE = "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

// Group posts by month and year
const groupPostsByDate = (posts: Post[]) => {
  if (!posts || posts.length === 0) return {};
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date || "");
    const dateB = new Date(b.date || "");
    return dateB.getTime() - dateA.getTime();
  });
  
  // Group by month and year
  const grouped: Record<string, Post[]> = {};
  
  sortedPosts.forEach(post => {
    if (!post.date) return;
    
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedPosts, setGroupedPosts] = useState<Record<string, Post[]>>({});
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // Hàm helper để xử lý URL hình ảnh
  const getImageUrl = (imageSource: any): string => {
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
    async function fetchPosts() {
      try {
        const postsData = await getAllPosts();
        
        // Xử lý dữ liệu và đảm bảo tất cả bài viết đều có đầy đủ thông tin
        const formattedPosts = postsData.map(post => {
          // Xử lý hình ảnh bài viết
          let imageUrl = DEFAULT_POST_IMAGE;
          if (post.mainImage) {
            imageUrl = getImageUrl(post.mainImage);
          } else if (post.image) {
            imageUrl = getImageUrl(post.image);
          }
          
          // Xử lý avatar của tác giả
          let authorAvatar = DEFAULT_AVATAR;
          if (post.author && post.author.image) {
            authorAvatar = getImageUrl(post.author.image);
          } else if (post.author && post.author.avatar) {
            authorAvatar = getImageUrl(post.author.avatar);
          }
          
          // Trả về đối tượng Post đã được định dạng
          return {
            id: post._id || "",
            title: post.title || "Untitled",
            slug: typeof post.slug === 'string' ? post.slug : (post.slug?.current || ""),
            excerpt: post.excerpt || "No excerpt available",
            content: post.content || "",
            date: post.date || new Date().toISOString(),
            readTime: post.readTime || "3 min read",
            image: imageUrl,
            category: post.category || "Uncategorized",
            categorySlug: post.categorySlug || "uncategorized",
            author: {
              id: post.author?.id || "",
              name: post.author?.name || "Unknown Author",
              avatar: authorAvatar
            },
            tags: post.tags || []
          };
        });
        
        setPosts(formattedPosts);
        
        // Nhóm bài viết theo tháng
        const grouped = groupPostsByDate(formattedPosts);
        setGroupedPosts(grouped);
        
        // Đặt tháng đầu tiên làm mặc định
        const firstMonth = Object.keys(grouped)[0] || null;
        setActiveMonth(firstMonth);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
                  <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
                </div>
                <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium">Loading archives...</p>
              </div>
            </div>
          ) : Object.keys(groupedPosts).length > 0 ? (
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
                          key={post.id || index}
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
                              <span className="text-sm text-neutral-500">{formatDate(post.date)}</span>
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
                No articles found in the archive.
              </p>
              <TransitionLink href="/blog" className="btn btn-primary">
                Browse All Articles
              </TransitionLink>
            </div>
          )}
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