import type React from 'react';

export interface FlexCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export type FlexCarouselPreset = 'liquid' | 'ribbon' | 'vortex' | 'arch';
export type FlexCarouselIntro = 'rise' | 'bloom' | 'spin' | 'deal' | 'none';
export type FlexCarouselFit = 'natural' | 'portrait' | 'square' | 'landscape';

export interface FlexCarouselHandle {
  goTo: (index: number) => void;
  openFocus: (index: number) => void;
  closeFocus: () => void;
}

export interface FlexCarouselProps {
  items?: FlexCarouselItem[];
  preset?: FlexCarouselPreset;
  intro?: FlexCarouselIntro;
  cardHeight?: number;
  gap?: number;
  radius?: number;
  fit?: FlexCarouselFit;
  lensWidth?: number;
  lensHeight?: number;
  tilt?: number;
  roundness?: number;
  bend?: number;
  reach?: number;
  curl?: number;
  dispersion?: number;
  liquid?: number;
  followCursor?: number;
  squeeze?: number;
  focusOnClick?: boolean;
  autoplay?: boolean;
  interval?: number;
  captions?: boolean;
  captureWheel?: boolean;
  onReady?: (handle: FlexCarouselHandle | null) => void;
  onChange?: (index: number, item?: FlexCarouselItem) => void;
  onSelect?: (index: number, item?: FlexCarouselItem) => void;
  className?: string;
  style?: React.CSSProperties & Record<string, any>;
}

