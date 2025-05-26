"use client";

import { motion } from "framer-motion";
import { categories } from "@/app/lib/data";
import TransitionLink from "@/app/components/transition-link";

export default function Categories() {
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
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              Categories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10"
            >
              Browse our articles by topic to find exactly what you're looking for. We've organized our content into the following categories.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-lg transition-all"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {category.description}
                  </p>
                  <TransitionLink
                    href={`/category/${category.id}`}
                    className="link text-primary"
                  >
                    Browse {category.name} articles
                  </TransitionLink>
                </div>
              </motion.div>
            ))}
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
                Subscribe to our newsletter and receive updates on new articles across all categories.
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
              <p className="text-xs text-neutral-500 mt-3 text-center">
                By subscribing, you agree to our privacy policy. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
} 