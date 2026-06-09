import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';

import AgencyHero from '../components/agency/AgencyHero';
import AgencySocialProof from '../components/agency/AgencySocialProof';
import WhatWeDoSection from '../components/agency/WhatWeDoSection';
import AgencyServicesPreview from '../components/agency/AgencyServicesPreview';
import HowItWorksAgency from '../components/agency/HowItWorksAgency';
import AgencyProductsSection from '../components/agency/AgencyProductsSection';
import WhoWeWorkWithSection from '../components/agency/WhoWeWorkWithSection';
import AgencyFinalCta from '../components/agency/AgencyFinalCta';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <GlobalNavbar />
      
      <main className="flex-grow">
        <AgencyHero />
        <AgencySocialProof />
        <WhatWeDoSection />
        <AgencyServicesPreview />
        <HowItWorksAgency />
        <AgencyProductsSection />
        <WhoWeWorkWithSection />
        {/* HIDDEN: uncomment when case studies are ready */}
        {/* <CaseStudiesPreview /> */}
        <AgencyFinalCta />
      </main>

      <GlobalFooter />
    </div>
  );
}
