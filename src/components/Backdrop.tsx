import React from 'react';
import { Floating3DParticles } from '@/components/ui/floating-3d-particles';

/**
 * Full-viewport 3D floating particle background.
 * - Fixed position behind all main content with pointer-events-none.
 * - Gentle vertical drift and 3D perspective projection.
 * - Scales down on mobile devices (< 768px) to 20% particle count for smooth 60fps performance.
 * - Built-in prefers-reduced-motion support renders a clean static frame.
 * - Automatically pauses when tab is hidden or off-screen to preserve battery and CPU.
 */
export const Backdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-[#FAFAF8]"
    >
      <Floating3DParticles
        quantity={180}
        color="#2F4BFF"
        size={3.5}
        opacity={0.07}
        drift={0.5}
        depth={0.5}
      />
    </div>
  );
};

export default Backdrop;
