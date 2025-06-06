"use client";

import { motion } from "framer-motion";
import { useState, Suspense } from "react";
import TransitionLink from "@/app/components/transition-link";

function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      formData.append("_to", "nqt230103a@gmail.com");
      
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message || "表单提交失败，请稍后再试");
      }
    } catch (err) {
      console.error("表单提交错误:", err);
      setError(err instanceof Error ? err.message : "提交过程中发生错误，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge-primary mb-6 inline-block"
            >
              Get In Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10"
            >
              Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <h2 className="section-heading text-2xl font-bold mb-8">Send Us a Message</h2>
              
              <div className="flex-1">
                {isSubmitted ? (
                  <div className="border border-neutral-200 dark:border-neutral-800 p-8">
                    <div className="text-center">
                      <div className="flex justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4">Thank You!</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                        Your message has been sent successfully. We will get back to you as soon as possible.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="btn btn-primary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="border border-neutral-200 dark:border-neutral-800 p-8 h-full">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="input w-full"
                          placeholder="Nguyễn Quốc Trung"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="input w-full"
                          placeholder="nqt230103a@gmail.com"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Article Suggestion">Article Suggestion</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="input w-full"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <h2 className="section-heading text-2xl font-bold mb-8">Connect With Us</h2>
              
              <div className="border border-neutral-200 dark:border-neutral-800 p-8 space-y-8 h-full">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      The fastest way to reach us.
                    </p>
                    <a href="mailto:nqt230103a@gmail.com" className="link">nqt230103a@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Office</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      Visit us for coffee and conversation.
                    </p>
                    <address className="not-italic text-neutral-600 dark:text-neutral-400">
                      Nguyễn Quốc Trung<br />
                      Thủ Đức, Hồ Chí Minh
                    </address>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      Direct line to our customer support.
                    </p>
                    <a href="tel:0823150025" className="link">0823150025</a>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Office Hours</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Monday-Friday: 9am to 5pm<br />
                      Saturday: 10am to 2pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-2xl font-bold mb-8 text-center">Find Us</h2>
            <div className="border border-neutral-200 dark:border-neutral-800 p-1 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d177365.45146577794!2d106.69086761121176!3d10.791403414711983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d85e042bf04b%3A0xbb26baec1664394d!2zVGjhu6cgxJDhu6ljLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1749213388831!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="py-24 flex justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neutral-300 dark:border-neutral-700 animate-pulse"></div>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}

// FAQs data
const faqs = [
  {
    question: "What topics does Minimal Journal cover?",
    answer: "Minimal Journal focuses on design principles, typography, color theory, UX patterns, accessibility, and other aspects of modern design and digital experiences.",
  },
  {
    question: "How can I contribute an article to Minimal Journal?",
    answer: "We welcome submissions from experienced designers and writers. Please use our contact form with the subject 'Article Submission' and include your pitch or draft.",
  },
  {
    question: "Do you offer design consultations?",
    answer: "Yes, our team is available for consultations on design projects. Please reach out through the contact form with details about your project needs.",
  },
  {
    question: "How often do you publish new articles?",
    answer: "We aim to publish new content at least twice a week, typically on Tuesdays and Thursdays. Subscribe to our newsletter to stay updated.",
  },
]; 