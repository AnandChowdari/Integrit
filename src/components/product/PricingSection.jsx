import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';
import { PRICING } from '../../config/pricing';

export default function PricingSection({ onBuyNow }) {
  const [region, setRegion] = useState('india'); // 'india' or 'international'

  // Basic auto-detect (just an example, defaults to india, but you could check Intl.DateTimeFormat().resolvedOptions().timeZone)
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !tz.toLowerCase().includes('calcutta') && !tz.toLowerCase().includes('kolkata')) {
        setRegion('international');
      }
    } catch(e) {}
  }, []);

  const pricingData = PRICING[region];

  const plans = [
    {
      id: 'basic',
      data: pricingData.tiers.basic,
      features: [
        { name: 'English + 5 Indian languages', included: true },
        { name: 'Natural Phrase captions only', included: true },
        { name: 'Basic Caption Editor', included: true },
        { name: 'Premiere Pro only', included: true },
        { name: 'Self-serve documentation', included: true },
        { name: '6 months of updates', included: true },
        { name: 'Phonetic Romanization', included: false },
        { name: 'Custom Dictionary', included: false },
        { name: 'AI Verification Pass', included: false },
        { name: 'After Effects support', included: false },
      ],
      buttonText: 'Get Basic',
      isPopular: false
    },
    {
      id: 'pro',
      data: pricingData.tiers.pro,
      features: [
        { name: 'All 24 languages', included: true },
        { name: 'All 3 caption styles', included: true },
        { name: 'Phonetic Romanization', included: true },
        { name: 'Full Caption Editor', included: true },
        { name: 'Custom Dictionary', included: true },
        { name: 'Premiere Pro + After Effects', included: true },
        { name: 'Video setup guide', included: true },
        { name: '1 year of updates', included: true },
        { name: 'Email support', included: true },
        { name: 'AI Verification Pass', included: false },
        { name: 'Priority support', included: false },
      ],
      buttonText: 'Get Pro',
      isPopular: true
    },
    {
      id: 'extreme',
      data: pricingData.tiers.extreme,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'AI Verification Pass (2nd correction pass)', included: true },
        { name: 'Lifetime updates', included: true },
        { name: '1-on-1 API setup call', included: true },
        { name: '24/7 Priority support', included: true },
      ],
      buttonText: 'Get Extreme',
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Simple, One-Time Pricing</h2>
          <p className="text-text-secondary text-lg mb-8">Pay once. Use forever. No subscriptions, no renewals.</p>
          
          {/* Region Toggle */}
          <div className="inline-flex bg-bg-secondary p-1 rounded-full border border-white/10 relative">
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-white/10 rounded-full transition-transform duration-300 ease-out`} 
              style={{ transform: region === 'india' ? 'translateX(0%)' : 'translateX(100%)' }}
            />
            <button 
              onClick={() => setRegion('india')}
              className={`relative z-10 px-8 py-2.5 rounded-full font-medium text-sm transition-colors ${region === 'india' ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              🇮🇳 India
            </button>
            <button 
              onClick={() => setRegion('international')}
              className={`relative z-10 px-8 py-2.5 rounded-full font-medium text-sm transition-colors ${region === 'international' ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              🌍 International
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, idx) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col h-full ${
                plan.isPopular 
                ? 'bg-bg-secondary border-2 border-accent-primary shadow-[0_0_30px_rgba(198,255,52,0.15)] transform scale-100 lg:scale-105 z-10' 
                : 'glass-card'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-primary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.data.label}</h3>
                <p className="text-text-secondary text-sm">One-Time Purchase</p>
              </div>
              
              <div className="mb-8 h-20">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${region}-${plan.id}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-5xl font-display font-bold text-white">
                      {pricingData.currency}{plan.data.price}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button 
                onClick={() => onBuyNow(plan)}
                className={`w-full py-4 rounded-xl font-bold transition-all mb-8 ${
                  plan.isPopular 
                  ? 'bg-accent-primary hover:bg-accent-secondary text-black shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:-translate-y-1' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/5 hover:-translate-y-1'
                }`}
              >
                {plan.buttonText}
              </button>
              
              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-white/90' : 'text-text-secondary/50'}`}>
                    {feature.included ? (
                      <Check className="w-5 h-5 text-accent-primary shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-white/20 shrink-0" />
                    )}
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-primary" />
            Secure Payment
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div>30-Day Money-Back Guarantee</div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div>Instant Download After Purchase</div>
        </div>
      </div>
    </section>
  );
}
