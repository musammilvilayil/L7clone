import React, { useRef, useState } from 'react';

interface SpotlightSurfaceProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const SpotlightSurface: React.FC<SpotlightSurfaceProps> = ({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.14)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-bento border border-slate-800/80 bg-[#0B101E]/90 shadow-bento-card transition-colors duration-300 hover:border-[#38BDF8]/40 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: cursor.active ? 1 : 0,
          background: `radial-gradient(460px circle at ${cursor.x}px ${cursor.y}px, ${glowColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

