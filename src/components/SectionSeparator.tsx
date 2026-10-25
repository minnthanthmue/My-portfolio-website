import React from 'react';
import { ProgressiveBlur } from '@/registry/magicui/progressive-blur';

export interface SectionSeparatorProps {
  className?: string;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-12 sm:h-16 my-1 sm:my-2 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Progressive blur softening edge of previous section */}
      <ProgressiveBlur
        position="top"
        height="50%"
        blurLevels={[0.5, 1, 2, 4, 8]}
      />

      {/* Thin 1px divider */}
      <div className="w-full border-t border-[var(--border)] relative z-20" />

      {/* Progressive blur softening entry into next section */}
      <ProgressiveBlur
        position="bottom"
        height="50%"
        blurLevels={[0.5, 1, 2, 4, 8]}
      />
    </div>
  );
};

export default SectionSeparator;
