import React from 'react';
import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';

export default function RefundPage() {
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
              Strict Policy
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">Refund Policy</h1>
            
            <div className="space-y-8 text-base/relaxed">
              <section>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl mb-8">
                  <h2 className="text-xl font-display font-bold text-white mb-2">All Sales Are Final</h2>
                  <p className="text-sm">
                    Flogrit enforces a strict no-refund policy across all our services and digital product pipelines. By completing a purchase, you acknowledge and agree to these terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Digital Products & Pipeline Architectures</h2>
                <p className="mb-4">
                  For our software and digital tools (including Captiongrit), <strong>all sales are strictly final and non-refundable</strong>. 
                </p>
                <p className="mb-4">
                  Because we are selling a proprietary pipeline architecture and digital software that is instantly accessible, the product cannot be un-downloaded or "returned." Therefore, we do not offer refunds under any circumstances, including "change of mind."
                </p>
                <div className="bg-accent-primary/10 border border-accent-primary/20 p-5 rounded-lg">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Our Support Guarantee
                  </h3>
                  <p className="text-sm text-white/80">
                    We stand entirely behind the flawless execution of our architecture. In the unlikely event you experience any issues with downloading, installing, or running the software, our customer support team will work with you proactively to resolve the issue completely. We guarantee functionality, not refunds.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">2. Agency & Consulting Services</h2>
                <p>
                  For content marketing, AI automation implementation, and other agency services, no refunds are provided once work has commenced or deliverables have been handed over. The nature of human labor, strategy consulting, and custom production makes these services non-returnable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Dispute Resolution</h2>
                <p>
                  If you encounter technical difficulties, you must contact our support team to allow us to resolve the issue. Initiating chargebacks or payment disputes for flawless architectural delivery will be handled legally, citing your acceptance of these binding terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Contact Support</h2>
                <p>
                  For any technical assistance or installation issues, please contact our support team immediately at:{' '}
                  <a href="mailto:support.flogrit@gmail.com" className="text-accent-primary hover:underline font-bold">support.flogrit@gmail.com</a>
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
