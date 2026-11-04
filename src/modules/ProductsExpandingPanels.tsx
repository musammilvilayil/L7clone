import React, { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import BlobButton from '../components/BlobButton';
import SkewedProductCarousel from '../components/SkewedProductCarousel';
import { PRODUCT_RAIL_ITEMS } from '../catalog/freshContent';
import type { BriefPreset } from '../design-system/tokens';

interface ProductsExpandingPanelsProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

interface ShowcaseProduct {
  id: string;
  displayName: string;
  eyebrow: string;
  headline: string;
  description: string;
  highlights: string[];
  connectors: string[];
  image: string;
  imageAlt: string;
  inquiryName: string;
  ctaLabel: string;
}

const PRODUCT_PRESENTATION: Record<string, Pick<ShowcaseProduct, 'displayName' | 'eyebrow' | 'headline' | 'image'>> = {
  'l7-insights': {
    displayName: 'L7 Insights',
    eyebrow: '01 / PRODUCT ANALYTICS',
    headline: 'Understand what your customers do — and where they drop off.',
    image: '/images/products/product-insights.webp',
  },
  'outreach-engine': {
    displayName: 'Outreach',
    eyebrow: '02 / B2B OUTREACH',
    headline: 'Find the right accounts. Start more relevant conversations.',
    image: '/images/products/product-outreach.webp',
  },
  'infinite-insights': {
    displayName: 'Infinite',
    eyebrow: '03 / PRIVATE KNOWLEDGE',
    headline: 'Make your organisation’s knowledge easier to find and use.',
    image: '/images/products/product-infinite.webp',
  },
  'l7-nexus': {
    displayName: 'L7 Nexus',
    eyebrow: '04 / CUSTOMER COMMUNICATIONS',
    headline: 'Bring every customer conversation into one shared workspace.',
    image: '/images/products/product-nexus.webp',
  },
};

const PRODUCT_ORDER = ['l7-insights', 'outreach-engine', 'infinite-insights', 'l7-nexus'];

const PRODUCTS: ShowcaseProduct[] = PRODUCT_ORDER.flatMap((id) => {
  const product = PRODUCT_RAIL_ITEMS.find((item) => item.id === id);
  const presentation = PRODUCT_PRESENTATION[id];
  if (!product || !presentation) return [];

  return [{
    id: product.id,
    displayName: presentation.displayName,
    eyebrow: presentation.eyebrow,
    headline: presentation.headline,
    description: product.narrative,
    highlights: product.highlights,
    connectors: product.connectors,
    image: presentation.image,
    imageAlt: product.imageAlt,
    inquiryName: product.name,
    ctaLabel: product.ctaLabel,
  }];
});

const CAROUSEL_ITEMS = PRODUCTS.map((product) => ({
  src: product.image,
  alt: product.imageAlt,
  title: product.displayName,
}));

export const ProductsExpandingPanels: React.FC<ProductsExpandingPanelsProps> = ({
  onApplyPreset,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = PRODUCTS[activeIndex] || PRODUCTS[0];

  const selectProduct = useCallback((index: number) => {
    const safeIndex = (index + PRODUCTS.length) % PRODUCTS.length;
    setActiveIndex(safeIndex);
  }, []);

  const applyProductPreset = useCallback((product: ShowcaseProduct) => {
    onApplyPreset({
      serviceTrack: product.inquiryName,
      contextLine: `I'd like to know more about ${product.inquiryName} and request a product walkthrough.`,
    });
  }, [onApplyPreset]);

  return (
    <section
      id="proof"
      aria-labelledby="products-heading"
      className="product-showcase-section relative isolate overflow-clip bg-[#08090C] text-[#F4F5F8] min-h-[100svh] lg:h-screen lg:max-h-[960px] flex flex-col justify-center py-8 sm:py-12 lg:py-4"
    >
      <div aria-hidden="true" className="product-showcase-ambient" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 min-[390px]:px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
        <header className="flex flex-col justify-between gap-3 border-b border-white/[0.08] pb-3 sm:pb-4 lg:flex-row lg:items-end lg:gap-8 lg:pb-3.5">
          <div className="max-w-2xl">
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#60A5FA]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Built in-house at Ladder7
            </div>
            <h2
              id="products-heading"
              className="font-display text-2xl font-bold leading-[1.08] tracking-[-0.05em] text-[#F4F5F8] sm:text-3xl lg:text-[2.2rem]"
            >
              Four platforms.
              <span className="block text-[#2563EB]">One standard of engineering.</span>
            </h2>
            <p className="mt-1 max-w-[58ch] text-xs leading-5 text-[#A3AAB8] sm:text-sm sm:leading-6">
              A closer look at the software products developed by Ladder7 — each focused on a different part of your digital operation.
            </p>
          </div>
          <div className="hidden shrink-0 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#667080] lg:block">
            <span className="text-[#60A5FA]">04</span> platforms <span className="px-1.5 text-white/20">/</span> drag to explore
          </div>
        </header>

        <nav aria-label="In-house platform navigation" className="product-showcase-nav sticky top-14 z-30 -mx-4 border-b border-white/[0.08] bg-[#08090C]/95 px-4 py-2 backdrop-blur-xl min-[390px]:-mx-5 min-[390px]:px-5 min-[900px]:top-16 sm:-mx-8 sm:px-8 sm:py-2.5 lg:-mx-12 lg:px-12 mt-2 sm:mt-2.5">
          <div className="mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain pb-0.5 sm:gap-2">
            {PRODUCTS.map((product, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectProduct(index)}
                  className={`group inline-flex min-h-9 shrink-0 snap-start items-center gap-1.5 rounded-lg border px-3 text-[11px] font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] min-[390px]:gap-2 min-[390px]:px-3.5 sm:px-4 sm:text-xs ${
                    isActive
                      ? 'border-[#2563EB]/45 bg-[#2563EB]/[0.11] text-[#F4F5F8] shadow-[0_0_22px_rgba(37,99,235,0.07)]'
                      : 'border-white/[0.08] bg-white/[0.02] text-[#8F98A8] hover:border-white/20 hover:bg-white/[0.05] hover:text-[#F4F5F8]'
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-wider ${isActive ? 'text-[#60A5FA]' : 'text-[#667080]'}`}>0{index + 1}</span>
                  {product.displayName}
                  <span className={`ml-0.5 h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-[#2563EB]' : 'bg-transparent group-hover:bg-white/30'}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </nav>

        <div className="grid min-w-0 items-center gap-5 pt-3 sm:gap-6 sm:pt-4 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-8 xl:gap-12">
          <div className="product-showcase-carousel order-1 min-w-0 lg:order-2">
            <SkewedProductCarousel
              items={CAROUSEL_ITEMS}
              activeIndex={activeIndex}
              onChange={selectProduct}
            />
            <div className="product-showcase-controls mt-2 mb-4 flex items-center justify-between gap-2 px-1 sm:mb-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#778191] min-[390px]:text-[10px] min-[390px]:tracking-[0.16em]">Drag or swipe to switch</span>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button type="button" aria-label="Previous product" onClick={() => selectProduct(activeIndex - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#C8D0DA] transition hover:border-[#2563EB]/50 hover:text-[#60A5FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="min-w-[3.5rem] text-center font-mono text-xs tabular-nums text-[#60A5FA]">0{activeIndex + 1} <span className="text-white/30">/</span> 0{PRODUCTS.length}</span>
                <button type="button" aria-label="Next product" onClick={() => selectProduct(activeIndex + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#C8D0DA] transition hover:border-[#2563EB]/50 hover:text-[#60A5FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="product-showcase-details order-2 min-w-0 pt-2 sm:pt-0 lg:order-1" aria-live="polite" aria-atomic="true">
            <div key={activeProduct.id} className="product-showcase-copy">
              <p className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
                <span className="h-px w-6 bg-[#2563EB]/70" />
                {activeProduct.eyebrow}
              </p>
              <h3 className="font-display text-3xl font-bold leading-[0.96] tracking-[-0.05em] text-[#F4F5F8] sm:text-4xl lg:text-[2.6rem]">
                {activeProduct.displayName}
              </h3>
              <p className="mt-2.5 max-w-[32ch] text-base font-semibold leading-snug tracking-[-0.02em] text-[#DCE3EB] sm:text-lg">
                {activeProduct.headline}
              </p>
              <p className="mt-2 max-w-[54ch] text-xs leading-5 text-[#A3AAB8] sm:text-[13px] sm:leading-6">
                {activeProduct.description}
              </p>
              <ul className="mt-3.5 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                {activeProduct.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-xs leading-tight text-[#D7DCE5]">
                    <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-[#2563EB]/30 bg-[#2563EB]/[0.07] text-[#60A5FA]">
                      <Check className="h-2 w-2" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <BlobButton variant="primary" size="sm" href="#contact" onClick={() => applyProductPreset(activeProduct)} className="min-h-10 justify-center px-4">
                  {activeProduct.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </BlobButton>
                <span className="text-[10px] font-medium text-[#778191]">Talk to the Ladder7 team</span>
              </div>
              {activeProduct.connectors.length > 0 && (
                <div className="mt-3 border-t border-white/[0.07] pt-2.5">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#667080]">Connected tools & capabilities</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {activeProduct.connectors.map((connector) => (
                      <li key={connector} className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[9.5px] text-[#A3AAB8]">
                        {connector}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsExpandingPanels;
