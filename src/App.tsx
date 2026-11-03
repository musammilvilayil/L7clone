import React, { useState } from 'react';
import type { InquiryContext } from './tokens/designTokens';
import { FloatingGlassNav } from './sections/FloatingGlassNav';
import { HeroShowcase } from './sections/HeroShowcase';
import { VisionManifesto } from './sections/VisionManifesto';
import { AudienceArchitecture } from './sections/AudienceArchitecture';
import { CapabilitiesBento } from './sections/CapabilitiesBento';
import { ProductDeckRail } from './sections/ProductDeckRail';
import { ProcessTimeline } from './sections/ProcessTimeline';
import { TrustMetricsMatrix } from './sections/TrustMetricsMatrix';
import { ObjectionsAccordion } from './sections/ObjectionsAccordion';
import { ActionBriefForm } from './sections/ActionBriefForm';
import { MonumentFooter } from './sections/MonumentFooter';

export const App: React.FC = () => {
  const [inquiryContext, setInquiryContext] = useState<InquiryContext | null>(null);
  const [contextKey, setContextKey] = useState(0);

  const handleSelectInquiry = (ctx: InquiryContext) => {
    setInquiryContext(ctx);
    setContextKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-[#F8FAFC] flex flex-col selection:bg-[#2563EB] selection:text-white">
      <FloatingGlassNav onSelectInquiry={handleSelectInquiry} />

      <main className="flex-1">
        {/* 01. Hook */}
        <HeroShowcase onSelectInquiry={handleSelectInquiry} />

        {/* 02. Vision / Why We Exist */}
        <VisionManifesto />

        {/* 03. Who We Are */}
        <AudienceArchitecture onSelectInquiry={handleSelectInquiry} />

        {/* 04. What We Do (Bento Grid) */}
        <CapabilitiesBento onSelectInquiry={handleSelectInquiry} />

        {/* 05. Proof / Products (Horizontal Rail + Depth Stage) */}
        <ProductDeckRail onSelectInquiry={handleSelectInquiry} />

        {/* 06. How We Build (Illuminated Spine Timeline) */}
        <ProcessTimeline />

        {/* 07. Why Trust Us (Telemetry & Pillars) */}
        <TrustMetricsMatrix />

        {/* 08. Objections (FAQ Drawers) */}
        <ObjectionsAccordion />

        {/* 09. Action (Contact & Brief Console) */}
        <ActionBriefForm key={contextKey} inquiryContext={inquiryContext} />
      </main>

      {/* 10. Footer */}
      <MonumentFooter />
    </div>
  );
};

export default App;
