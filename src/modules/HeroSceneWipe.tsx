import React, { useEffect, useState } from 'react';
import type { BriefPreset } from '../design-system/tokens';
import SpectralDrape from '../components/SpectralDrape';
import BlobButton from '../components/BlobButton';

interface HeroSceneWipeProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

export const HeroSceneWipe: React.FC<HeroSceneWipeProps> = ({
  onApplyPreset,
}) => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Ladder7 Hero Overview"
      className="relative h-[100svh] max-h-[100svh] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 bg-[#08090C] overflow-hidden"
    >
      {/* Top Anchor for Header / Footer Logo Jump */}
      <span id="hook" aria-hidden="true" className="absolute top-0 pointer-events-none" />
      {/* 1. React Bits Pro Interactive Spectral Drape 3D WebGL Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-auto z-0 opacity-80 mix-blend-screen"
      >
        <SpectralDrape
          colors={['#1E3A8A', '#3B82F6']}
          backgroundColor="transparent"
          density={1.3}
          dotSize={1.3}
          strands={16}
          amplitude={1.5}
          frequency={0.7}
          thickness={1.05}
          depth={1.65}
          softness={0.55}
          intensity={1.35}
          colorShift={0.35}
          tilt={-34}
          turn={-36}
          roll={108}
          zoom={1.3}
          flow={1.0}
          speed={reducedMotion ? 0 : 0.8}
          interactive={!reducedMotion}
          brush={1.25}
          brushRadius={0.25}
          parallax={1.2}
          clickRipples={true}
          className="w-full h-full"
        />
      </div>

      {/* 2. Architectural Radial Vignette / Gradient Scrim for WCAG AAA Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_30%,transparent_0%,rgba(8,9,12,0.8)_60%,#08090C_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#08090C]/50 via-transparent to-[#08090C]"
      />

      {/* 3. Main Hero Content Container (Centrally Aligned & Perfectly Proportioned) */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] text-center flex flex-col items-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0B0D13]/85 backdrop-blur-md text-[11px] sm:text-xs font-medium text-[#A3AAB8] shadow-[0_2px_12px_rgba(0,0,0,0.5)] mb-3.5 sm:mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]" />
          </span>
          <span className="text-[#F4F5F8] font-semibold">Enterprise Technology &amp; AI Studio</span>
          <span className="text-white/20">•</span>
          <span className="text-[#93C5FD] font-medium hidden sm:inline">2026 Production Architecture</span>
        </div>

        {/* Central Headline - Guaranteed Exactly 2 Lines with Flawless Proportions & Zero Clipping */}
        <h1 className="font-display font-bold tracking-tight text-[#F4F5F8] text-center mx-auto mb-3 sm:mb-4 text-[clamp(1.15rem,3.7vw,3.5rem)] leading-[1.14]">
          <span className="block whitespace-nowrap">We engineer the software &amp; AI platforms</span>
          <span className="block text-[#3B82F6] whitespace-nowrap">that run your business.</span>
        </h1>

        {/* Central Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#C4C9D4] leading-relaxed max-w-[58ch] mx-auto mb-5 sm:mb-7 text-balance font-normal">
          Ladder7 architects and builds custom software, multi-agent AI ecosystems, and high-throughput cloud infrastructure — engineered by senior pods with zero vendor lock-in.
        </p>

        {/* Dual Call-to-Action Group with Blobs Button Effect */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <BlobButton
            variant="primary"
            size="md"
            href="#contact"
            onClick={() => {
              onApplyPreset({
                serviceTrack: 'Enterprise Software & AI Architecture',
                contextLine:
                  'Initiate technical discovery for custom enterprise software and AI platforms.',
              });
            }}
            className="w-full sm:w-auto"
          >
            Schedule Technical Discovery
            <span className="font-bold">→</span>
          </BlobButton>

          <BlobButton
            variant="secondary"
            size="md"
            href="#proof"
            className="w-full sm:w-auto"
          >
            Explore 4 In-House Platforms ↓
          </BlobButton>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#vision"
        aria-label="Scroll to discover"
        className="pointer-events-auto absolute bottom-4 z-20 hidden sm:flex flex-col items-center gap-1.5 text-[10px] font-semibold text-[#A3AAB8]/60 hover:text-[#3B82F6] transition-colors"
      >
        <span className="tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" />
        </div>
      </a>

      {/* 4. Bottom Seamless Gradient Fade into Next Section (Zero Harsh Cut) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#08090C] to-transparent z-10"
      />
    </section>
  );
};

export default HeroSceneWipe;
