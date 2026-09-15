import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';

export const ProductsShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const currentProduct = PRODUCTS[currentIndex];

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-white dark:bg-[#0f1923] border-y border-slate-200 dark:border-white/5">
      {/* Ambient background light blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ backgroundColor: 'rgb(0, 86, 178)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-slate-900 dark:text-white">
            Intelligent Products for Every Corner of Your Business
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From web performance and marketing analytics to sales, data, and operations, each product is designed to end in an action rather than a report.
          </p>
        </div>

        {/* Carousel Showcase Card */}
        <div
          className="relative rounded-[2.5rem] p-4 sm:p-8 lg:p-10 bg-white border border-slate-100 dark:bg-white/[0.03] dark:border-white/10 dark:backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-2xl"
          role="region"
          aria-label="Ladder7 product suite"
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevProduct}
            aria-label="Previous product"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200 bg-white text-slate-600 hover:text-primary dark:border-white/20 dark:bg-[#0f1923]/70 dark:backdrop-blur-md dark:text-white/70 shadow-md"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextProduct}
            aria-label="Next product"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200 bg-white text-slate-600 hover:text-primary dark:border-white/20 dark:bg-[#0f1923]/70 dark:backdrop-blur-md dark:text-white/70 shadow-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Product Detail Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center px-6 sm:px-12 lg:px-10">
            {/* Left Info Column */}
            <div className="lg:min-h-[440px] flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-slate-900 dark:text-white transition-all">
                {currentProduct.name}
              </h3>
              <p className="text-base sm:text-lg font-medium mb-4 text-slate-800 dark:text-slate-200">
                {currentProduct.tagline}
              </p>
              <p className="text-sm sm:text-base mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                {currentProduct.description}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-3 mb-8">
                {currentProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgb(0, 86, 178)' }}
                    >
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl font-bold text-[13px] transition-all duration-300 flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 text-white shadow-lg hover:shadow-xl hover:brightness-110 bg-[#0056b2]"
                >
                  <span>{currentProduct.ctaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl font-bold text-[13px] transition-all duration-300 flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0 border border-slate-300 text-slate-700 hover:bg-slate-100 hover:shadow-md dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                >
                  <span>Book a demo</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="relative">
              {/* Ambient Glow */}
              <div
                className="absolute -inset-4 blur-2xl rounded-full opacity-25"
                style={{ backgroundColor: 'rgb(0, 86, 178)' }}
              />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#0f1923] group">
                <img
                  src={currentProduct.image}
                  alt={`${currentProduct.name} interface`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Bottom Tabs / Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause carousel' : 'Start carousel'}
              className="size-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 border border-slate-300 text-slate-500 hover:text-slate-800 dark:border-white/20 dark:text-white/60 dark:hover:text-white"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-current stroke-none" />
              ) : (
                <Play className="w-3 h-3 fill-current stroke-none ml-0.5" />
              )}
            </button>

            {/* Tab indicator pills */}
            {PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to ${prod.name}`}
                aria-current={currentIndex === idx ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-12 bg-[#0056b2]'
                    : 'w-3 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
