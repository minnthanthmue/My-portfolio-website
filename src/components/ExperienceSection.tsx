import React from 'react';
import { siteContent } from '@/data/content';
import { RevealText } from '@/components/ui/reveal-text';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Chip } from '@/components/ui/chip';
import { AnimatedSection, AnimatedSectionItem } from '@/components/ui/animated-section';

export const ExperienceSection: React.FC = () => {
  const { experience } = siteContent;

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-24 lg:py-28">
      <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column (4 cols on laptop): Sticky heading on desktop */}
        <AnimatedSectionItem className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <RevealText as="h2" className="section-heading text-[#111111]">
            {experience.heading}
          </RevealText>
        </AnimatedSectionItem>

        {/* Right column (8 cols on laptop): Experience Card */}
        <AnimatedSectionItem className="lg:col-span-8 w-full max-w-prose">
          <div className="rounded-2xl p-6 sm:p-7 border border-[#E7E5E0] bg-white shadow-2xs hover:-translate-y-0.5 hover:border-[#2F4BFF] transition-all duration-200 active:scale-[0.98] flex flex-col justify-between min-h-[200px] w-full">
            <div>
              {/* Card Header: Category & Availability indicator */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7E5E0]">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Status
                </span>
                <Chip color="success" size="sm" className="font-mono text-[11px]">
                  Open to Opportunities
                </Chip>
              </div>

              {/* Statement */}
              <p className="text-base sm:text-lg font-normal text-zinc-700 leading-relaxed">
                {experience.statement}
              </p>
            </div>

            {/* Bottom Row: Aligned action row with note and button */}
            <div className="mt-6 pt-4 border-t border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 font-mono">
                Available for internships &amp; entry-level roles
              </span>
              <MagneticButton distance={0.4}>
                <Button
                  variant="default"
                  href="#contact"
                  showArrow
                  className="h-11 min-h-[44px] px-8 text-sm font-medium"
                >
                  {experience.ctaText}
                </Button>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSectionItem>
      </AnimatedSection>
    </section>
  );
};

export default ExperienceSection;
