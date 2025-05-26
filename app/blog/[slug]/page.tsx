"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Post, posts, getPostBySlug, getRelatedPosts } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import TransitionLink from "@/app/components/transition-link";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const currentPost = getPostBySlug(slug as string);
      if (!currentPost) {
        notFound();
      }
      
      setPost(currentPost);
      setRelatedPosts(getRelatedPosts(currentPost.id, currentPost.categorySlug, 3));
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [slug]);

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

  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-24">
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
              className="relative aspect-[16/9] mb-12 overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="markdown-content mb-10">
                <Markdown>{post.content}</Markdown>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 mb-16">
                {post.tags.map((tag: string, index: number) => (
                  <Link 
                    key={index}
                    href={`/tag/${tag}`}
                    className="text-sm px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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