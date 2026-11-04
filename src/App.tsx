import { useCallback } from 'react';
import type { BriefPreset } from './design-system/tokens';
import { SiteHeader } from './modules/SiteHeader';
import { HeroSceneWipe } from './modules/HeroSceneWipe';
import { VisionEditorialSplit } from './modules/VisionEditorialSplit';
import { ServicesBentoGrid } from './modules/ServicesBentoGrid';
import { ProductsExpandingPanels } from './modules/ProductsExpandingPanels';
import { HowWeWorkSection } from './modules/HowWeWorkSection';
import { WhyLadder7Section } from './modules/WhyLadder7Section';
import { FaqSplitDrawer } from './modules/FaqSplitDrawer';
import { ArchitecturalFooter } from './modules/ArchitecturalFooter';

export function App() {
  // The contact form section was removed; every "contact" action now lands on
  // the footer, which carries the email, phone and office details.
  const handleApplyPreset = useCallback((_preset: BriefPreset) => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#F4F5F8] selection:bg-[#10B981] selection:text-[#08090C]">
      {/* Global Gooey Filter for BlobButton Effect */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed -top-[9999px] -left-[9999px] w-0 h-0 opacity-0"
      >
        <defs>
          <filter id="blob-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <SiteHeader onApplyPreset={handleApplyPreset} />

      <main id="main-content" className="relative z-10">
        <HeroSceneWipe onApplyPreset={handleApplyPreset} />
        <VisionEditorialSplit />
        <ServicesBentoGrid onApplyPreset={handleApplyPreset} />
        <ProductsExpandingPanels onApplyPreset={handleApplyPreset} />
        <HowWeWorkSection />
        <WhyLadder7Section />
        <FaqSplitDrawer />
      </main>

      <ArchitecturalFooter />
    </div>
  );
}

export default App;
