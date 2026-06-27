import React from 'react';
import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';

export default function TermsPage() {
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
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">Terms of Service</h1>
            
            <div className="space-y-8 text-base/relaxed">
              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the services provided by Flogrit, including our website, agency services, and digital products (such as Captiongrit), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">2. Description of Service</h2>
                <p>
                  Flogrit provides a combination of AI automation consulting, content marketing agency services, and proprietary digital pipeline architectures. We reserve the right to modify or discontinue any part of our service at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Intellectual Property</h2>
                <p className="mb-4">
                  <strong>Digital Products & Architecture:</strong> Flogrit retains all ownership, copyright, and intellectual property rights to its proprietary software, pipeline architectures, codebases, and digital tools (including Captiongrit). You are granted a limited, non-exclusive license to use these tools in accordance with your purchase.
                </p>
                <p>
                  <strong>Agency Content:</strong> For custom content marketing services, the client retains the rights to the final delivered assets (e.g., videos, copy) upon full and final payment, unless otherwise specified in a separate agency agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Acceptable Use</h2>
                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell, reverse-engineer, or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by Flogrit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Limitation of Liability</h2>
                <p>
                  In no event shall Flogrit, its directors, employees, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">6. Contact</h2>
                <p>
                  Questions about the Terms of Service should be sent to us at:{' '}
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
