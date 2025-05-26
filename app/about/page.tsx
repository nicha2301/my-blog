"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AboutContent() {
  useEffect(() => {
    // GSAP animations for scrolling elements
    const textElements = document.querySelectorAll(".animate-text");
    
    textElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          }
        }
      );
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge-primary mb-6 inline-block"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              About Minimal Journal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10"
            >
              A digital journal dedicated to exploring the art of modern design, thoughtful interactions, and clean aesthetics.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1964&auto=format&fit=crop"
                  alt="Our mission"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
            
            <div>
              <h2 className="section-heading text-2xl font-bold mb-8">Our Mission</h2>
              <p className="animate-text text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                At Minimal Journal, we believe that great design is more than just aesthetics—it&apos;s about the thoughtful fusion of form and function to create meaningful, impactful experiences.
              </p>
              <p className="animate-text text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                Our mission is to explore, celebrate, and share the principles of exceptional design across digital and physical spaces. We aim to inspire both creators and consumers to appreciate the subtle details that make designs truly remarkable.
              </p>
              <p className="animate-text text-lg text-neutral-600 dark:text-neutral-400">
                Through thoughtful articles, case studies, and interviews with industry leaders, we bridge the gap between theory and practice, making design principles accessible to everyone with a passion for creativity and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="section-heading text-2xl font-bold">Our Values</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-8">
              The principles that guide our approach to design and content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 dark:border-neutral-800 p-8"
              >
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="section-heading text-2xl font-bold">Our Team</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-8">
              Meet the passionate individuals behind Minimal Journal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className="overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="object-cover w-full aspect-square"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-neutral-600 font-medium mb-4">{member.role}</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border border-neutral-200 dark:border-neutral-800">
            <div className="relative h-72 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1770&auto=format&fit=crop"
                alt="Join our team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <h2 className="text-2xl font-bold text-white">Join Our Team</h2>
              </div>
            </div>
            <div className="p-10">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                We&apos;re always looking for passionate individuals to join our team. If you&apos;re enthusiastic about design, writing, or digital experiences, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="btn btn-primary">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function About() {
  return (
    <Suspense fallback={<div>Loading about page...</div>}>
      <AboutContent />
    </Suspense>
  );
}

// Values data
const values = [
  {
    title: "Thoughtful Design",
    description: "We believe in design that balances aesthetics with functionality, creating experiences that are both beautiful and purposeful."
  },
  {
    title: "Constant Learning",
    description: "Design is ever-evolving. We commit to continuous learning, staying at the forefront of trends and technologies while honoring timeless principles."
  },
  {
    title: "Inclusive Excellence",
    description: "Great design should be accessible to all. We advocate for inclusive design practices that consider all users' needs and experiences."
  },
];

// Team members data
const team = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    bio: "With over 15 years of design experience, Alex founded Minimal Journal to inspire a deeper appreciation for thoughtful design.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
  },
  {
    name: "Jamie Chen",
    role: "Senior Editor",
    bio: "Jamie brings clarity and insight to complex design topics, with a background in both journalism and UX design.",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop"
  },
  {
    name: "Taylor Wilson",
    role: "Design Researcher",
    bio: "Taylor explores emerging trends and technologies to provide readers with cutting-edge insights and practical applications.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop"
  },
]; 