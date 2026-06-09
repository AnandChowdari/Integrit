import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import CaptionIntegritNavbar from '../../components/layout/CaptionIntegritNavbar';
import CaptionIntegritFooter from '../../components/layout/CaptionIntegritFooter';

// Sections
import HeroSection from '../../components/product/HeroSection';
import SocialProofBar from '../../components/product/SocialProofBar';
import CaptionModesSection from '../../components/product/CaptionModesSection';
import HowItWorksSection from '../../components/product/HowItWorksSection';
import FeaturesSection from '../../components/product/FeaturesSection';
import LanguageMarquee from '../../components/product/LanguageMarquee';
import PricingSection from '../../components/product/PricingSection';
import TestimonialsSection from '../../components/product/TestimonialsSection';
import ComparisonSection from '../../components/product/ComparisonSection';
import FaqSection from '../../components/product/FaqSection';
import FinalCtaSection from '../../components/product/FinalCtaSection';
import CheckoutModal from '../../components/product/CheckoutModal';

// Hidden Sections
// import CaseStudiesSection from '../../components/product/CaseStudiesSection';
// import AutomationWorkflowsSection from '../../components/product/AutomationWorkflowsSection';

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // When clicking generic 'Buy Now' buttons, we can just scroll to pricing or open modal with a default plan
  const handleGenericBuyNow = () => {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <CaptionIntegritNavbar onBuyNow={handleGenericBuyNow} />
      
      <main className="flex-grow">
        <HeroSection onBuyNow={handleGenericBuyNow} />
        <SocialProofBar />
        <CaptionModesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LanguageMarquee />
        <PricingSection onBuyNow={handleSelectPlan} />
        <ComparisonSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection onBuyNow={handleGenericBuyNow} />
        
        {/* Hidden Sections */}
        {/* <CaseStudiesSection /> */}
        {/* <AutomationWorkflowsSection /> */}
      </main>

      <CaptionIntegritFooter />

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            isOpen={isCheckoutOpen} 
            onClose={() => setIsCheckoutOpen(false)} 
            selectedPlan={selectedPlan}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
