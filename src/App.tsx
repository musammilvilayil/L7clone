import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ProductsShowcase } from './components/ProductsShowcase';
import { JourneySection } from './components/JourneySection';
import { Capabilities } from './components/Capabilities';
import { WhyLadder7 } from './components/WhyLadder7';
import { AdvisorCTA } from './components/AdvisorCTA';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f1923] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main id="main-content" className="flex-1 w-full overflow-x-hidden">
        <HeroSlider />
        <ProductsShowcase />
        <JourneySection />
        <Capabilities />
        <WhyLadder7 />
        <AdvisorCTA />
        <FAQSection />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default App;
