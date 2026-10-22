import { Component } from 'react';
import type { ReactNode } from 'react';

/** Keeps the page usable if the animation layer throws. */
export class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Empty, decorative layout slot that reserves space for a gesture. */
export function GestureAnchor({ scene, build, className = '' }: { scene: string; build?: string; className?: string }) {
  return <div className={`gesture-dock ${className}`} data-scene={scene} data-variant={scene} data-build={build} aria-hidden="true" />;
}
