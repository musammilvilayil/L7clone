import React, { useRef, useState } from 'react';

interface MagneticActionProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
  intensity?: number;
}

export const MagneticAction: React.FC<MagneticActionProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  intensity = 0.22,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
    ) {
      return;
    }

    const target = elementRef.current;
    if (!target) return;
    const box = target.getBoundingClientRect();
    const dx = (e.clientX - (box.left + box.width / 2)) * intensity;
    const dy = (e.clientY - (box.top + box.height / 2)) * intensity;
    setShift({ x: dx, y: dy });
  };

  const resetShift = () => setShift({ x: 0, y: 0 });

  const motionStyle: React.CSSProperties = {
    transform: `translate3d(${shift.x.toFixed(1)}px, ${shift.y.toFixed(1)}px, 0)`,
    transition:
      shift.x === 0 && shift.y === 0
        ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
        : 'transform 50ms linear',
  };

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetShift}
        style={motionStyle}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetShift}
      style={motionStyle}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

