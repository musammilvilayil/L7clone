import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delayMs = 0,
}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (entered) return;
    const element = nodeRef.current;
    if (!element) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -36px 0px' }
    );

    io.observe(element);
    return () => io.disconnect();
  }, [entered]);

  return (
    <div
      ref={nodeRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface WordStageProps {
  text: string;
  accentWords?: string[];
  className?: string;
}

export const WordStage: React.FC<WordStageProps> = ({
  text,
  accentWords = [],
  className = '',
}) => {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState<boolean>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (visible) return;
    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const tokens = text.split(' ');
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase()));

  return (
    <span ref={hostRef} className={`inline ${className}`} aria-label={text}>
      {tokens.map((token, idx) => {
        const stripped = token.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isAccent = accentSet.has(stripped);
        return (
          <span
            key={`${token}-${idx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
            aria-hidden="true"
          >
            <span
              style={{ transitionDelay: `${idx * 34}ms` }}
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[105%] opacity-0'
              } ${
                isAccent
                  ? 'bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {token}
              {idx < tokens.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        );
      })}
    </span>
  );
};

