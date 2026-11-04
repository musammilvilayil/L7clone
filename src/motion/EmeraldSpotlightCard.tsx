import React, { useRef, useState } from 'react';

interface EmeraldSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const EmeraldSpotlightCard: React.FC<EmeraldSpotlightCardProps> = ({
  children,
  className = '',
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, inside: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = hostRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    setPos({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      inside: true,
    });
  };

  return (
    <div
      ref={hostRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos((p) => ({ ...p, inside: false }))}
      className={`relative overflow-hidden rounded-card border border-white/[0.08] bg-[#0F1117]/90 shadow-panel-depth transition-colors duration-300 hover:border-[#3B82F6]/40 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: pos.inside ? 1 : 0,
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, rgba(59, 130, 246, 0.13), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

