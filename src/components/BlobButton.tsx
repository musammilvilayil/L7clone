import React from 'react';

export interface BlobButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'primary' | 'solid' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const BlobButton: React.FC<BlobButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  target,
  rel,
  ariaLabel,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl',
    lg: 'px-8 py-4 text-sm sm:text-base rounded-2xl',
  }[size];

  // Variant classes & blob backgrounds
  let variantClasses = '';
  let blobBg = 'bg-[#3B82F6]';

  switch (variant) {
    case 'primary':
      // Dark emerald border + neon emerald blobs that fill on hover and turn text dark
      variantClasses =
        'bg-[#08090C]/90 text-[#3B82F6] border-2 border-[#3B82F6] shadow-[0_0_24px_rgba(59,130,246,0.22)] hover:shadow-[0_0_36px_rgba(59,130,246,0.5)] hover:text-[#08090C] hover:border-[#3B82F6]';
      blobBg = 'bg-[#3B82F6]';
      break;

    case 'solid':
      // Solid emerald button + lime blobs that surge on hover
      variantClasses =
        'bg-[#2563EB] text-[#08090C] font-bold border-2 border-[#2563EB] hover:border-[#93C5FD] shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_40px_rgba(190,242,100,0.45)] hover:text-[#08090C]';
      blobBg = 'bg-[#93C5FD]';
      break;

    case 'secondary':
      // Translucent obsidian + emerald blobs on hover
      variantClasses =
        'bg-white/[0.04] text-[#F4F5F8] border border-white/15 hover:border-[#3B82F6]/60 hover:text-[#08090C]';
      blobBg = 'bg-[#3B82F6]';
      break;

    case 'ghost':
      // Sleek minimal border + subtle white/emerald blobs
      variantClasses =
        'bg-transparent text-[#A3AAB8] border border-white/10 hover:border-white/30 hover:text-[#08090C]';
      blobBg = 'bg-white/80';
      break;
  }

  const baseClasses = `blob-btn group relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] select-none ${sizeClasses} ${variantClasses} ${className}`;

  const blobsInner = (
    <span aria-hidden="true" className="blob-btn__inner">
      <span className="blob-btn__blobs">
        <span
          className={`blob-btn__blob ${blobBg}`}
          style={{ left: '-8%', transitionDelay: '0s' }}
        />
        <span
          className={`blob-btn__blob ${blobBg}`}
          style={{ left: '22%', transitionDelay: '0.06s' }}
        />
        <span
          className={`blob-btn__blob ${blobBg}`}
          style={{ left: '52%', transitionDelay: '0.12s' }}
        />
        <span
          className={`blob-btn__blob ${blobBg}`}
          style={{ left: '82%', transitionDelay: '0.18s' }}
        />
      </span>
    </span>
  );

  const contentSpan = (
    <span className="blob-btn__content relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-300">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={baseClasses}
      >
        {blobsInner}
        {contentSpan}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {blobsInner}
      {contentSpan}
    </button>
  );
};

export default BlobButton;

