import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "What's the difference between Basic, Pro, and Extreme?", a: "Basic gives you standard captions in English + 5 Indian languages. Pro unlocks all 24 languages, phonetic modes, and custom dictionaries. Extreme adds a second AI verification pass for maximum accuracy, lifetime updates, and 1-on-1 setup support." },
    { q: "Is this a one-time payment or a subscription?", a: "It's a strict one-time payment for the software license. You bring your own API key for the generation model (which costs pennies per hour of video), so we don't have to charge you a monthly subscription." },
    { q: "How do I receive the plugin after purchase?", a: "You'll receive an email instantly with a secure download link for the .zxp plugin file, along with your license key and installation instructions." },
    { q: "Do you offer refunds?", a: "Yes, we have a 30-day money-back guarantee. If the plugin doesn't save you time, just email us and we'll refund your purchase in full." },
    { q: "Can I upgrade from Basic to Pro later?", a: "Yes, you can upgrade at any time by paying just the difference in price between the two tiers." },
    { q: "Why is the pricing different for India?", a: "We believe in Purchasing Power Parity (PPP). We've priced the Indian version locally to make it accessible to regional creators while maintaining global standards for international users." },
    { q: "What Adobe versions are supported?", a: "Caption Integrit works natively with Adobe Premiere Pro CC 2022 and newer, and Adobe After Effects CC 2022 and newer (Pro/Extreme tiers)." },
    { q: "Do I need my own API key?", a: "Yes. To keep the plugin a one-time purchase, you use your own API key (like OpenAI or Groq). This means you pay wholesale rates (often less than $0.10 per hour of video) directly to the provider. We guide you through the 2-minute setup." },
    { q: "Which Indian languages are supported?", a: "We support Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, and Odia — all with Phonetic Romanization support in Pro/Extreme." },
    { q: "Does it work offline?", a: "No, the AI transcription models require an internet connection to process the audio and generate the text." }
  ];

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-white pr-8">{faq.q}</span>
                {openIndex === idx ? (
                  <Minus className="w-5 h-5 text-accent-primary shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-text-secondary shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
