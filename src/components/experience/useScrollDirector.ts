import { useEffect, useState } from 'react';

/**
 * A deliberately lightweight cinematic director.
 * Section progress, parallax and the overall chapter progress are scrubbed
 * directly through CSS custom properties, never React state per frame.
 * Reduced-motion readers get every scene in its final, fully readable state.
 */
export const CHAPTERS = [
  { id: 'top', short: 'Opening' },
  { id: 'thinking', short: 'Vision' },
  { id: 'about', short: 'Who we are' },
  { id: 'capabilities', short: 'Services' },
  { id: 'products', short: 'Products' },
  { id: 'engineering', short: 'Engineering' },
  { id: 'why-ladder7', short: 'Why Ladder7' },
  { id: 'faq', short: 'FAQ' },
  { id: 'contact', short: 'Connect' },
] as const;

export function useScrollDirector() {
  const [activeId, setActiveId] = useState<string>('top');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('main .scene'));
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-cin-reveal]'));
    const progressBar = document.getElementById('cin-scroll-progress');
    let frame = 0;
    let active = 'top';
    let visibleScenes: HTMLElement[] = [];

    const reveal = new IntersectionObserver(entries => {
      for (const item of entries) {
        if (item.isIntersecting) (item.target as HTMLElement).classList.add('is-visible');
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    for (const node of revealNodes) reveal.observe(node);

    const visibility = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (!visibleScenes.includes(el)) visibleScenes.push(el);
        } else visibleScenes = visibleScenes.filter(scene => scene !== el);
      }
      schedule();
    }, { rootMargin: '35% 0px 35% 0px' });
    scenes.forEach(scene => visibility.observe(scene));

    const update = () => {
      frame = 0;
      const height = window.innerHeight || 1;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      if (progressBar) progressBar.style.transform = 'scaleX(' + progress.toFixed(5) + ')';
      let closest: HTMLElement | undefined;
      let nearest = Infinity;
      for (const scene of visibleScenes) {
        const rect = scene.getBoundingClientRect();
        const distance = Math.abs(rect.top - height * .25);
        if (distance < nearest) { nearest = distance; closest = scene; }
        const value = Math.max(0, Math.min(1, (height - rect.top) / (height + rect.height)));
        scene.style.setProperty('--chapter-progress', value.toFixed(4));
        // No opacity manipulation of text: all essential content stays visible.
        const depth = reduced.matches ? 0 : (value - .5) * 2;
        scene.style.setProperty('--chapter-depth', depth.toFixed(4));
      }
      if (closest && active !== closest.id) {
        active = closest.id;
        setActiveId(closest.id);
      }
    };
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    const reset = () => {
      if (reduced.matches) revealNodes.forEach(node => node.classList.add('is-visible'));
      schedule();
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    reduced.addEventListener('change', reset);
    // On direct hash loads, reveal the target as soon as it enters the viewport.
    reset();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', reset);
      visibility.disconnect();
      reveal.disconnect();
    };
  }, []);

  return activeId;
}
