import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import BlobButton from '../components/BlobButton';
import { PRODUCT_RAIL_ITEMS } from '../catalog/freshContent';
import type { BriefPreset, ProductRailItem } from '../design-system/tokens';

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

const ProductImage: React.FC<{
  product: ShowcaseProduct;
  index: number;
}> = ({ product, index }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="product-showcase-frame group relative">
      <div className="product-showcase-toolbar">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/35" />
          <span className="h-2 w-2 rounded-full bg-[#34D399]/80" />
        </div>
        <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[#7D8597] sm:text-[10px]">
          LADDER7 <span className="text-white/20">/</span> {product.displayName}
        </span>
        <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-[#A3AAB8]">
          0{index + 1}
        </span>
      </div>

      <div className="product-showcase-image-wrap">
        {!hasError ? (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setHasError(true)}
            className="product-showcase-image"
          />
        ) : (
          <div
            role="img"
            aria-label={product.imageAlt}
            className="flex min-h-[260px] w-full flex-col items-center justify-center gap-3 px-6 text-center sm:min-h-[340px]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-[#34D399]/[0.07] text-[#6EE7B7]">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-[#DCE3EB]">{product.displayName}</span>
            <span className="max-w-xs text-xs leading-5 text-[#7D8597]">
              Product preview is temporarily unavailable.
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-[#0D1016] px-4 py-3 sm:px-5">
        <span className="text-[10px] font-medium text-[#A3AAB8] sm:text-xs">
          {product.displayName} <span className="text-[#596273]">/ Product preview</span>
        </span>
        <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6EE7B7] sm:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
          In-house platform
        </span>
      </div>
    </div>
  );
};

export const ProductsExpandingPanels: React.FC<ProductsExpandingPanelsProps> = ({
  onApplyPreset,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(
      (section): section is HTMLElement => section !== null,
    );

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!current) return;
        const index = sections.indexOf(current.target as HTMLElement);
        if (index !== -1) setActiveIndex(index);
      },
      {
        rootMargin: '-22% 0px -48% 0px',
        threshold: [0.1, 0.25, 0.45, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateToProduct = useCallback((index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;

    setActiveIndex(index);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const applyProductPreset = useCallback((product: ShowcaseProduct) => {
    onApplyPreset({
      serviceTrack: product.inquiryName,
      contextLine: `I'd like to know more about ${product.inquiryName} and request a product walkthrough.`,
    });
  }, [onApplyPreset]);

  const handleNavigationKeyDown = useCallback((
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % PRODUCTS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + PRODUCTS.length) % PRODUCTS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = PRODUCTS.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    document.getElementById(`product-nav-${PRODUCTS[nextIndex].id}`)?.focus();
    navigateToProduct(nextIndex);
  }, [navigateToProduct]);

  return (
    <section
      id="proof"
      aria-labelledby="products-heading"
      className="product-showcase-section relative isolate overflow-clip bg-[#08090C] text-[#F4F5F8]"
    >
      <div aria-hidden="true" className="product-showcase-ambient" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-5 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        <header className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-7 lg:flex-row lg:items-end lg:gap-10 lg:pb-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#6EE7B7] sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Built in-house at Ladder7
            </div>
            <h2
              id="products-heading"
              className="font-display text-3xl font-bold leading-[1.06] tracking-[-0.05em] text-[#F4F5F8] sm:text-4xl lg:text-[3.35rem]"
            >
              Four platforms.
              <span className="block text-[#34D399]">One standard of engineering.</span>
            </h2>
            <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[#A3AAB8] sm:text-[15px] sm:leading-7">
              A closer look at the software products developed by Ladder7 — each focused on a different part of your digital operation.
            </p>
          </div>
          <div className="hidden shrink-0 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#667080] lg:block">
            <span className="text-[#6EE7B7]">04</span> products <span className="px-1.5 text-white/20">/</span> scroll to explore
          </div>
        </header>

        <nav
          aria-label="In-house platform navigation"
          className="product-showcase-nav sticky top-16 z-30 -mx-5 border-b border-white/[0.08] bg-[#08090C]/90 px-5 py-3 backdrop-blur-xl min-[900px]:top-20 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        >
          <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto overscroll-x-contain pb-0.5">
            {PRODUCTS.map((product, index) => {
              const isActive = activeIndex === index;

              return (
                <a
                  key={product.id}
                  id={`product-nav-${product.id}`}
                  href={`#${product.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToProduct(index);
                  }}
                  onKeyDown={(event) => handleNavigationKeyDown(event, index)}
                  className={`group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5 text-xs font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] sm:px-4 sm:text-sm ${
                    isActive
                      ? 'border-[#34D399]/45 bg-[#34D399]/[0.11] text-[#F4F5F8] shadow-[0_0_22px_rgba(16,185,129,0.07)]'
                      : 'border-white/[0.08] bg-white/[0.02] text-[#8F98A8] hover:border-white/20 hover:bg-white/[0.05] hover:text-[#F4F5F8]'
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-wider ${
                    isActive ? 'text-[#6EE7B7]' : 'text-[#667080]'
                  }`}>
                    0{index + 1}
                  </span>
                  {product.displayName}
                  <span className={`ml-0.5 h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? 'bg-[#34D399]' : 'bg-transparent group-hover:bg-white/30'
                  }`} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>

        <div className="divide-y divide-white/[0.08]">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              aria-labelledby={`${product.id}-heading`}
              className="product-showcase-panel grid scroll-mt-28 grid-cols-1 items-center gap-8 py-12 sm:gap-10 sm:py-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:py-10 xl:gap-16"
            >
              <div className="order-2 min-w-0 lg:order-1">
                <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6EE7B7] sm:text-[11px]">
                  <span className="h-px w-7 bg-[#34D399]/70" />
                  {product.eyebrow}
                </p>

                <h3
                  id={`${product.id}-heading`}
                  className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-[#F4F5F8] sm:text-5xl xl:text-[4.4rem]"
                >
                  {product.displayName}
                </h3>

                <p className="mt-5 max-w-[24ch] text-xl font-semibold leading-snug tracking-[-0.03em] text-[#DCE3EB] sm:text-2xl">
                  {product.headline}
                </p>

                <p className="mt-4 max-w-[56ch] text-sm leading-7 text-[#A3AAB8] sm:text-[15px]">
                  {product.description}
                </p>

                <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs leading-5 text-[#D7DCE5] sm:text-[13px]"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/[0.07] text-[#6EE7B7]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <BlobButton
                    variant="primary"
                    size="md"
                    href="#contact"
                    onClick={() => applyProductPreset(product)}
                    className="min-h-11 justify-center px-5"
                  >
                    {product.ctaLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </BlobButton>
                  <span className="text-[10px] font-medium text-[#778191] sm:text-[11px]">
                    Talk to the Ladder7 team
                  </span>
                </div>

                {product.connectors.length > 0 && (
                  <div className="mt-7 border-t border-white/[0.07] pt-4">
                    <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#667080]">
                      Connected tools & capabilities
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {product.connectors.map((connector) => (
                        <li
                          key={connector}
                          className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-[#A3AAB8]"
                        >
                          {connector}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="order-1 min-w-0 lg:order-2">
                <div className="product-showcase-visual">
                  <ProductImage product={product} index={index} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsExpandingPanels;
