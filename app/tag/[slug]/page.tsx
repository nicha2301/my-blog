"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostsByTag } from "@/app/lib/sanity/api";
import Image from "next/image";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import TransitionLink from "@/app/components/transition-link";
import type { Post } from "@/app/lib/data";

export default function TagPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const tagName = slug ? decodeURIComponent(slug as string) : "";

  useEffect(() => {
    async function fetchData() {
      if (slug) {
        try {
          setLoading(true);
          const tagPosts = await getPostsByTag(tagName);
          setPosts(tagPosts);
        } catch (error) {
          console.error("Error fetching posts by tag:", error);
          setPosts([]);
        } finally {
          // Simulate loading
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    }
    
    fetchData();
  }, [slug, tagName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
          </div>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="badge badge-primary inline-block">Tag</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              #{tagName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10"
            >
              Articles tagged with &quot;{tagName}&quot;
            </motion.p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
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
                      <TransitionLink href={`/category/${post.categorySlug}`} className="badge badge-primary">
                        {post.category}
                      </TransitionLink>
                      <span className="text-sm text-neutral-500">{post.date}</span>
                    </div>
                    <TransitionLink href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h3>
                    </TransitionLink>
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
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No articles found</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                We couldn&apos;t find any articles with the tag &quot;{tagName}&quot;.
              </p>
              <TransitionLink href="/blog" className="btn btn-primary">
                Browse All Articles
              </TransitionLink>
            </div>
          )}
        </div>
      </section>
      
      {/* Other Tags */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Other Popular Tags</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["design", "user experience", "typography", "development", "accessibility", "react", "javascript", "color theory"].map((tag) => (
              tag !== tagName && (
                <TransitionLink 
                  key={tag} 
                  href={`/tag/${tag}`}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  #{tag}
                </TransitionLink>
              )
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 