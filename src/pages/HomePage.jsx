import GlobalFooter from '../components/layout/GlobalFooter';

import FlogritHero from '../components/agency/FlogritHero';
import BrandReveal from '../components/agency/BrandReveal';
import AgencySocialProof from '../components/agency/AgencySocialProof';
import WhatWeDoSection from '../components/agency/WhatWeDoSection';
import FindYourProblemSection from '../components/agency/FindYourProblemSection';
import HowItWorksAgency from '../components/agency/HowItWorksAgency';
import AgencyProductsSection from '../components/agency/AgencyProductsSection';
import WhoWeWorkWithSection from '../components/agency/WhoWeWorkWithSection';
import AgencyTestimonialsTeaser from '../components/agency/AgencyTestimonialsTeaser';
import AgencyFinalCta from '../components/agency/AgencyFinalCta';
import ContactSection from '../components/agency/ContactSection';
import SectionDivider from '../components/ui/SectionDivider';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      
      <main className="flex-grow">
        <FlogritHero />
        <BrandReveal />
        <AgencySocialProof />
        <SectionDivider direction="down" />
        <WhatWeDoSection />
        <SectionDivider direction="down" />
        <FindYourProblemSection />
        <HowItWorksAgency />
        <SectionDivider direction="down" />
        <AgencyProductsSection />
        <SectionDivider direction="down" />
        <WhoWeWorkWithSection />
        <AgencyTestimonialsTeaser />
        <AgencyFinalCta />
        <ContactSection />
      </main>

      <GlobalFooter />
    </div>
  );
}
