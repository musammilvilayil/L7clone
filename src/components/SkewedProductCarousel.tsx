import React, { useCallback, useMemo, useRef } from 'react';

export interface SkewedProductCarouselItem {
  src: string;
  alt: string;
  title: string;
}

interface SkewedProductCarouselProps {
  items: SkewedProductCarouselItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const wrapIndex = (index: number, length: number) => (index + length) % length;

export const SkewedProductCarousel: React.FC<SkewedProductCarouselProps> = ({
  items,
  activeIndex,
  onChange,
}) => {
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const visibleItems = useMemo(() => items.map((item, index) => {
    const rawOffset = index - activeIndex;
    let offset = rawOffset;
    if (rawOffset > items.length / 2) offset -= items.length;
    if (rawOffset < -items.length / 2) offset += items.length;
    return { ...item, index, offset };
  }), [activeIndex, items]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(deltaX) < 38 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
    dragged.current = true;
    onChange(wrapIndex(activeIndex + (deltaX < 0 ? 1 : -1), items.length));
  }, [activeIndex, items.length, onChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      onChange(wrapIndex(activeIndex + 1, items.length));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onChange(wrapIndex(activeIndex - 1, items.length));
    } else if (event.key === 'Home') {
      event.preventDefault();
      onChange(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      onChange(items.length - 1);
    }
  }, [activeIndex, items.length, onChange]);

  if (!items.length) return null;

  return (
    <div
      className="skewed-product-carousel"
      role="region"
      aria-label="Product image carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <div className="skewed-product-carousel__stage">
        {visibleItems.map(({ src, alt, title, index, offset }) => {
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          return (
            <button
              key={title}
              type="button"
              className={`skewed-product-carousel__card${isActive ? ' is-active' : ''}`}
              data-offset={offset}
              aria-label={`Show ${title}`}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={isActive ? 0 : -1}
              style={{
                zIndex: 20 - distance,
                opacity: distance > 2 ? 0 : 1,
                pointerEvents: distance > 2 ? 'none' : 'auto',
                transform: `translate(-50%, -50%) translateX(${offset * 49}%) perspective(1100px) rotateY(${offset * -17}deg) scale(${isActive ? 1 : Math.max(0.76, 0.91 - distance * 0.055)})`,
              }}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                if (!isActive) onChange(index);
              }}
            >
              <img src={src} alt={alt} draggable={false} />
              <span className="skewed-product-carousel__shade" />
              <span className="skewed-product-carousel__caption">
                <span className="skewed-product-carousel__index">0{index + 1} / 0{items.length}</span>
                <span className="skewed-product-carousel__title">{title}</span>
              </span>
              {isActive && <span className="skewed-product-carousel__active-mark" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div className="skewed-product-carousel__progress" aria-hidden="true">
        {items.map((item, index) => (
          <span key={item.title} className={index === activeIndex ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  );
};

export default SkewedProductCarousel;
