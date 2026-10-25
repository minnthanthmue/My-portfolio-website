import React from 'react';
import { siteContent } from '@/data/content';
import { AnimatedSection, AnimatedSectionItem } from '@/components/ui/animated-section';
import { TextHighlighter } from '@/components/fancy/text/text-highlighter';
import type { Transition } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const { about } = siteContent;

  const transition: Transition = { type: 'spring', duration: 1, delay: 0.35, bounce: 0 };
  const highlightClass = 'rounded-[0.25em] px-1 text-[#111111] font-medium';
  const highlightColor = '#F2AD91';
  const inViewOptions = { once: true, initial: true, amount: 0.1 };

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column (4 cols on laptop): Sticky section heading */}
        <AnimatedSectionItem className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <h2 className="section-heading text-[#111111]">{about.heading}</h2>
        </AnimatedSectionItem>

        {/* Right column (8 cols on laptop): Bio paragraphs */}
        <AnimatedSectionItem className="lg:col-span-8 w-full max-w-[40ch] sm:max-w-prose space-y-5">
          <p className="text-base sm:text-[17px] font-normal text-zinc-600 leading-relaxed">
            I am Minn Thant Hmue, a{' '}
            <TextHighlighter
              className={highlightClass}
              transition={transition}
              highlightColor={highlightColor}
              useInViewOptions={inViewOptions}
            >
              Digital Business &amp; Innovation student
            </TextHighlighter>{' '}
            at{' '}
            <TextHighlighter
              className={highlightClass}
              transition={transition}
              highlightColor={highlightColor}
              useInViewOptions={inViewOptions}
            >
              Tokyo International University
            </TextHighlighter>
            . I am originally from Myanmar and currently live in Tokyo. I am interested in connecting technical development with product thinking, and I enjoy learning how to build{' '}
            <TextHighlighter
              className={highlightClass}
              transition={transition}
              highlightColor={highlightColor}
              useInViewOptions={inViewOptions}
            >
              fast, reliable web interfaces, machine learning models, and automated AI workflows
            </TextHighlighter>
            .
          </p>
          <p className="text-base sm:text-[17px] font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I like software that is simple and does its job well. Instead of treating AI as a buzzword, I experiment with practical workflows using{' '}
            <TextHighlighter
              className={highlightClass}
              transition={transition}
              highlightColor={highlightColor}
              useInViewOptions={inViewOptions}
            >
              local language models through Ollama, n8n automations, and AI model APIs
            </TextHighlighter>
            . Through these projects, I am learning how to turn repetitive manual tasks into small automated processes that run in the background.
          </p>
        </AnimatedSectionItem>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;
