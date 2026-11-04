import React, { useRef, useState } from 'react';

interface MagneticTriggerProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
  pull?: number;
}

export const MagneticTrigger: React.FC<MagneticTriggerProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  pull = 0.22,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * pull;
    const y = (e.clientY - (rect.top + rect.height / 2)) * pull;
    setDelta({ x, y });
  };

  const onLeave = () => setDelta({ x: 0, y: 0 });

  const inlineStyle: React.CSSProperties = {
    transform: `translate3d(${delta.x.toFixed(1)}px, ${delta.y.toFixed(1)}px, 0)`,
    transition:
      delta.x === 0 && delta.y === 0
        ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)'
        : 'transform 50ms linear',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={inlineStyle}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={inlineStyle}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

