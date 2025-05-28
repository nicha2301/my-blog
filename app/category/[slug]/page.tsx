"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import TransitionLink from "@/app/components/transition-link";
import { getCategoryBySlug, getPostsByCategory } from "@/app/lib/sanity/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (slug) {
        try {
          setLoading(true);
          const categoryData = await getCategoryBySlug(slug as string);
          
          if (!categoryData) {
            notFound();
          }
          
          setCategory(categoryData);
          const categoryPosts = await getPostsByCategory(slug as string);
          setPosts(categoryPosts);
        } catch (error) {
          console.error("Error fetching category data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!category) {
    return notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge-primary mb-6 inline-block"
            >
              Category
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              {category.title}
            </motion.h1>
            {category.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-neutral-600 dark:text-neutral-400"
              >
                {category.description}
              </motion.p>
            )}
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
                      <span className="text-sm text-neutral-500">{post.date}</span>
                    </div>
                    <TransitionLink href={`/blog/${post.slug.current || post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h3>
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
              <h3 className="text-xl mb-4">No posts found in this category</h3>
              <TransitionLink href="/blog" className="btn btn-primary">
                View All Posts
              </TransitionLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
} 