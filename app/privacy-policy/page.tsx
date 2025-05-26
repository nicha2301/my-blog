"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 text-center"
            >
              Last updated: June 1, 2023
            </motion.p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <h2>Introduction</h2>
            <p>
              At Minimal Journal, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2>The Data We Collect About You</h2>
            <p>
              Personal data refers to any information that can identify you. It does not include anonymized data.
              We may collect, use, store, and transfer different kinds of personal data about you including:
            </p>
            <ul>
              <li>Identity Data: name, username</li>
              <li>Contact Data: email address</li>
              <li>Technical Data: IP address, browser type and version, location</li>
              <li>Usage Data: information about how you use our website</li>
              <li>Marketing and Communications Data: preferences in receiving marketing from us</li>
            </ul>
            
            <h2>How We Collect Your Personal Data</h2>
            <p>We collect data through:</p>
            <ul>
              <li>Direct interactions when you subscribe to our newsletter</li>
              <li>Automated technologies or interactions through cookies</li>
              <li>Third parties including analytics providers</li>
            </ul>
            
            <h2>How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To deliver content you've requested (e.g., newsletter)</li>
              <li>To improve our website and your browsing experience</li>
              <li>To personalize content and recommendations</li>
              <li>To measure or understand the effectiveness of content we serve to you</li>
            </ul>
            
            <h2>Cookies</h2>
            <p>
              Our website uses cookies to distinguish you from other users. This helps us to provide you 
              with a good experience when you browse our website and also allows us to improve our site.
            </p>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when 
              websites set or access cookies. If you disable or refuse cookies, please note that some 
              parts of this website may become inaccessible or not function properly.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, 
              we limit access to your personal data to those employees, agents, contractors and other third 
              parties who have a business need to know.
            </p>
            
            <h2>Data Retention</h2>
            <p>
              We will only retain your personal data for as long as necessary to fulfill the purposes we 
              collected it for, including for the purposes of satisfying any legal, accounting, or 
              reporting requirements.
            </p>
            
            <h2>Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
            </p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time by publishing a new version on our website. 
              You should check this page occasionally to ensure that you are happy with any changes.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              <a href="mailto:privacy@minimaljournal.com">privacy@minimaljournal.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 