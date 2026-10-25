import React, { useState, useEffect } from 'react';
import { siteContent } from '@/data/content';
import { RevealText } from '@/components/ui/reveal-text';
import GlassFolder from '@/components/ui/glass-folder-cards';

export const WorkSection: React.FC = () => {
  const { projects } = siteContent;
  const [folderWidth, setFolderWidth] = useState(320);

  // Responsive folder width calculation to avoid horizontal overflow on mobile screens
  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 350) {
        setFolderWidth(270);
      } else if (w < 380) {
        setFolderWidth(290);
      } else if (w < 480) {
        setFolderWidth(310);
      } else {
        setFolderWidth(330);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24 lg:py-28" aria-label="Projects">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column (4 cols on laptop): Sticky section heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <RevealText as="h2" className="section-heading text-[#111111]">
            {projects.heading}
          </RevealText>
          <p className="mt-3 text-sm text-zinc-600 font-normal leading-relaxed max-w-[36ch]">
            {projects.placeholder.text}
          </p>
        </div>

        {/* Right column (8 cols on laptop): Stacked full-width cards on mobile, 2-3 column grid on laptop */}
        <div className="lg:col-span-8 w-full">
          {projects.items && projects.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full">
              {projects.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-[#E7E5E0] bg-white shadow-2xs flex flex-col justify-between h-full hover:-translate-y-0.5 hover:border-[#2F4BFF] transition-all duration-200 active:scale-[0.98] group"
                >
                  <div>
                    <h3 className="font-semibold text-base text-[#111111] group-hover:text-[#2F4BFF] transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.meta && (
                    <span className="font-mono text-[11px] text-zinc-400 mt-4 uppercase tracking-wider">
                      {item.meta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="w-full max-w-[340px] sm:max-w-none flex flex-col items-center p-6 sm:p-8 rounded-2xl border border-[#E7E5E0] bg-white shadow-2xs hover:-translate-y-0.5 hover:border-[#2F4BFF] transition-all duration-200 active:scale-[0.98]">
                <GlassFolder
                  label="Projects"
                  meta="Coming soon"
                  art="none"
                  seed={5}
                  tone="light"
                  width={folderWidth}
                  appearDelay={0}
                  files={[]}
                  action="none"
                  labelPlacement="bottom-left"
                />
                <span className="mt-4 font-mono text-[11px] text-zinc-500 tracking-wider uppercase select-none">
                  {projects.placeholder.badge}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
