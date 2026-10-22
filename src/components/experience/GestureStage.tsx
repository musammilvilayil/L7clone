import { useEffect, useRef } from 'react';
import { GestureEngine } from '../../lib/gesture3d/engine';

/**
 * One fixed, non-interactive canvas that draws the connected-line network and
 * the scroll-driven wireframe hands. Layout "anchors" (GestureAnchor) in each
 * section tell the engine where a gesture should land.
 */
export default function GestureStage() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let engine: GestureEngine | null = null;
    try {
      engine = new GestureEngine(canvas);
    } catch (err) {
      console.warn('[Ladder7] gesture layer unavailable, content remains fully usable.', err);
    }
    return () => engine?.destroy();
  }, []);
  return <canvas ref={ref} className="gesture-stage" aria-hidden="true" />;
}

export { StageBoundary, GestureAnchor } from './GestureAnchor';

