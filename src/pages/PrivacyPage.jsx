import React from 'react';
import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary font-body text-text-secondary selection:bg-accent-primary/30 selection:text-white flex flex-col">
      <GlobalNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-primary/10 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-secondary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              Last Updated: June 2026
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
            
            <div className="space-y-8 text-base/relaxed">
              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you fill out a form, request customer support, or communicate with us. The types of information we may collect include your name, email address, company details, and any other information you choose to provide.
                </p>
                <p>
                  When you access or use our services, we automatically collect information about your usage, including log data, device information, and analytics to help us improve the Flogrit experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                  <li>Provide, maintain, and improve our services and pipeline architectures;</li>
                  <li>Process transactions and send related information;</li>
                  <li>Send technical notices, updates, security alerts, and support messages;</li>
                  <li>Respond to your comments, questions, and customer service requests.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Sharing of Information</h2>
                <p>
                  We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers (such as payment processors) who need access to such information to carry out work on our behalf.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Security</h2>
                <p>
                  We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:{' '}
                  <a href="mailto:support.flogrit@gmail.com" className="text-accent-primary hover:underline">support.flogrit@gmail.com</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
