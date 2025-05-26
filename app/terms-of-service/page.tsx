"use client";

import { motion } from "framer-motion";

export default function TermsOfService() {
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
              Terms of Service
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

      {/* Terms of Service Content */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <h2>Introduction</h2>
            <p>
              Welcome to Minimal Journal. These terms and conditions outline the rules and regulations for the use of our website.
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
              Minimal Journal if you do not accept all of the terms and conditions stated on this page.
            </p>
            
            <h2>Intellectual Property Rights</h2>
            <p>
              Other than the content you own, which you may have opted to include on this Website, under these Terms, 
              Minimal Journal and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
            <p>
              You are granted limited license only for purposes of viewing the material contained on this Website.
            </p>
            
            <h2>Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any Website material in any other media without proper attribution</li>
              <li>selling, sublicensing and/or otherwise commercializing any Website material</li>
              <li>publicly performing and/or showing any Website material without attribution</li>
              <li>using this Website in any way that is or may be damaging to this Website</li>
              <li>using this Website in any way that impacts user access to this Website</li>
              <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity</li>
              <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website</li>
            </ul>
            
            <h2>Your Content</h2>
            <p>
              In these Terms of Service, "Your Content" means any audio, video, text, images, or other material you choose to 
              submit to this Website, such as comments on blog posts. By submitting Your Content, you grant Minimal Journal 
              a perpetual, worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and 
              distribute Your Content in any existing or future media.
            </p>
            <p>
              Your Content must be your own and must not be invading any third-party's rights. Minimal Journal reserves the 
              right to remove any of Your Content at any time without notice.
            </p>
            
            <h2>No Warranties</h2>
            <p>
              This Website is provided "as is," with all faults, and Minimal Journal expresses no representations or warranties of any kind related to this Website or the materials contained on this Website.
              Nothing contained on this Website shall be construed as providing advice to you.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Minimal Journal, nor any of its officers, directors and employees, be liable to you for 
              anything arising out of or in any way connected with your use of this Website, whether such liability is 
              under contract, tort or otherwise, and Minimal Journal shall not be liable for any indirect, consequential 
              or special liability arising out of or in any way related to your use of this Website.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent Minimal Journal from and against any and all liabilities, costs, 
              demands, causes of action, damages and expenses arising in any way related to your breach of any of the 
              provisions of these Terms.
            </p>
            
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be 
              deleted without affecting the remaining provisions herein.
            </p>
            
            <h2>Variation of Terms</h2>
            <p>
              Minimal Journal is permitted to revise these Terms at any time as it sees fit, and by using this Website you are 
              expected to review these Terms regularly to ensure you understand all terms and conditions governing use of this Website.
            </p>
            
            <h2>Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which the 
              company operates, and you submit to the non-exclusive jurisdiction of the courts located in that jurisdiction 
              for the resolution of any disputes.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:terms@minimaljournal.com">terms@minimaljournal.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 