"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthorById, getPostsByAuthor } from "@/app/lib/sanity/api";
import Image from "next/image";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import TransitionLink from "@/app/components/transition-link";
import type { Post, Author } from "@/app/lib/data";

export default function AuthorPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const authorData = await getAuthorById(id as string);
          if (!authorData) {
            notFound();
          }
          
          if (!authorData.social) {
            authorData.social = {};
          }
          
          setAuthor(authorData);
          const authorPosts = await getPostsByAuthor(id as string);
          setPosts(authorPosts);
        } catch (error) {
          console.error("Error fetching author data:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    }
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
          </div>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium">Loading author profile...</p>
        </div>
      </div>
    );
  }

  if (!author) {
    return notFound();
  }

  const social = author.social || {};

  return (
    <>
      {/* Author Hero Section */}
      <section className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              <div className="relative w-40 h-40">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">{author.name}</h1>
                <p className="text-primary font-medium mb-4 text-center md:text-left">{author.role}</p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center md:text-left">
                  {author.bio}
                </p>
                
                <div className="flex gap-4 justify-center md:justify-start">
                  {social.twitter && (
                    <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer" 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  
                  {social.linkedin && (
                    <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                  
                  {social.instagram && (
                    <a href={`https://instagram.com/${social.instagram}`} target="_blank" rel="noopener noreferrer" 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Author's Articles */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">Articles by {author.name}</h2>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id || post.id}
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
                    <TransitionLink href={`/blog/${post.slug.current || post.slug}`}>
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h3>
                    </TransitionLink>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {post.excerpt}
                    </p>
                    <TransitionLink href={`/blog/${post.slug.current || post.slug}`} className="link text-sm">
                      Read article
                    </TransitionLink>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-600 dark:text-neutral-400">
                This author hasn&apos;t published any articles yet.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* All Authors Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Meet Our Writers</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Discover more content from our team of expert writers and contributors.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <TransitionLink href="/authors" className="btn btn-primary">
              View All Authors
            </TransitionLink>
          </div>
        </div>
      </section>
    </>
  );
} 