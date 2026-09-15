import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { HERO_SLIDES } from '../data/heroSlides';

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[calc(100vh-64px)] min-h-[580px] overflow-hidden group bg-slate-900">
      {/* Slides Container */}
      <div className="w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: '400%',
            transform: `translateX(-${currentSlide * 25}%)`,
          }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex items-center h-full bg-slate-900 overflow-hidden"
              style={{ width: '25%', flexShrink: 0 }}
            >
              {/* Slide Background Image */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradient Overlays for optimal typography readability */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgb(3, 18, 38) 0%, rgba(3, 18, 38, 0.8) 25%, rgba(3, 18, 38, 0.2) 60%, transparent 100%), linear-gradient(to right, rgb(3, 18, 38) 0%, rgba(3, 18, 38, 0.9) 20%, rgba(3, 18, 38, 0.4) 50%, transparent 100%)',
                }}
              />

              {/* Slide Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl py-6 mb-16 md:mb-0 lg:py-10 mt-8 md:mt-0">
                  <div className="min-h-[200px] sm:min-h-[220px] md:min-h-[200px] lg:min-h-[280px] flex flex-col justify-start space-y-4 lg:space-y-8 md:space-y-5">
                    {/* Pulsing Pill Badge */}
                    <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                      </span>
                      {slide.badge}
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-black text-white leading-[1.1] tracking-tight">
                      {slide.title}
                      <span className="text-blue-300 font-extrabold">{slide.titleHighlight}</span>
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="text-sm sm:text-base lg:text-base text-slate-300 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* CTAs & Controls */}
                  <div className="flex flex-col items-start pt-6 w-full">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start w-full sm:w-auto">
                      {/* Primary CTA */}
                      <a
                        href="#contact"
                        className="relative w-full sm:w-auto text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold text-[13px] sm:text-[14px] lg:text-[15px] shadow-lg transition-transform duration-300 transform flex items-center justify-center gap-2 hover:scale-105 active:scale-95 bg-[#0056b2] hover:bg-[#004494]"
                      >
                        <span>{slide.primaryCta}</span>
                        <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </a>

                      {/* Secondary CTA */}
                      <a
                        href="#capabilities"
                        className="group relative bg-white/5 backdrop-blur-md text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-bold text-[13px] sm:text-[14px] lg:text-[15px] transition-transform duration-300 transform flex items-center justify-center overflow-hidden border border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95"
                      >
                        <span>{slide.secondaryCta}</span>
                      </a>
                    </div>

                    {/* Slider Indicator Controls */}
                    <div className="flex items-center justify-start gap-4 mt-8 md:mt-12 w-full">
                      {/* Autoplay Pause/Play */}
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                        title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                        className="size-7 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300"
                      >
                        {isPlaying ? (
                          <Pause className="w-3 h-3 fill-white stroke-none" />
                        ) : (
                          <Play className="w-3 h-3 fill-white stroke-none ml-0.5" />
                        )}
                      </button>

                      {/* Dot Indicators */}
                      <div className="flex gap-2 sm:gap-3">
                        {HERO_SLIDES.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-current={currentSlide === idx ? 'true' : 'false'}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              currentSlide === idx
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Chevrons (Desktop) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden xl:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 size-12 lg:size-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <span className="material-symbols-outlined text-2xl">chevron_left</span>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden xl:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 size-12 lg:size-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <span className="material-symbols-outlined text-2xl">chevron_right</span>
      </button>

      {/* Scroll Down Mouse Indicator */}
      <a
        href="#products"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
      >
        <div className="w-5 h-7 border-2 border-white/40 rounded-full flex justify-center pt-1 transition-colors duration-300 group-hover:border-white/70">
          <div className="w-1 h-1.5 rounded-full bg-white/70 animate-bounce" />
        </div>
      </a>
    </section>
  );
};
