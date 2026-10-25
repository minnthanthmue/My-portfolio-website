import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MorphingText } from '@/components/ui/morphing-text';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Camera, Mail, Github, Linkedin } from 'lucide-react';
import { siteContent } from '@/data/content';
import { TextHighlighter } from '@/components/fancy/text/text-highlighter';

const HERO_SUBTITLES = [
  'Digital Business and Innovation Student',
  'Tokyo International University',
];

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % HERO_SUBTITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const CANDIDATES = [
    '/assets/profile.png',
    '/assets/profile.jpg',
    '/assets/profile.webp',
    '/images/profile.png',
    '/images/profile.jpg',
  ];

  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize from localStorage if previously uploaded/selected
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_photo');
      if (saved) {
        setCustomPhoto(saved);
        setImgLoaded(true);
        setImgFailed(false);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleImgError = () => {
    if (customPhoto) {
      // If custom photo failed, fall back to candidate files
      setCustomPhoto(null);
      setCandidateIndex(0);
      setImgLoaded(false);
      return;
    }

    if (candidateIndex < CANDIDATES.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomPhoto(dataUrl);
        setImgLoaded(true);
        setImgFailed(false);
        try {
          localStorage.setItem('portfolio_profile_photo', dataUrl);
        } catch {
          // Ignore storage quota
        }
      }
    };
    reader.readAsDataURL(file);

    // Also persist directly to disk on dev server via /api/upload
    fetch('/api/upload?type=profile', {
      method: 'POST',
      body: file,
    }).catch(() => {
      // Dev server upload fallback
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const currentSrc = customPhoto || CANDIDATES[candidateIndex];

  return (
    <section
      id="top"
      className="relative scroll-mt-24 min-h-[100svh] flex flex-col justify-center items-center text-center px-4 select-text"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-[640px] md:max-w-[760px] lg:max-w-[860px] mx-auto flex flex-col items-center text-center space-y-6"
      >
        {/* Profile photo circle (increased to 144px mobile / 176px desktop, 2px border, shadow) above the name */}
        <div className="select-none relative group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload profile photo"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            title="Click or drag & drop to update profile photo"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
            className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#F7F7F5] border-2 border-[#E7E5E0] shadow-[0_8px_24px_rgba(17,17,17,0.06)] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF] focus-visible:ring-offset-2 ${
              isDragging ? 'ring-2 ring-[#2F4BFF] ring-offset-2 scale-105' : ''
            }`}
          >
            {!imgFailed ? (
              <img
                key={currentSrc}
                src={currentSrc}
                alt="Portrait of Minn Thant Hmue"
                width={176}
                height={176}
                loading="eager"
                onError={handleImgError}
                onLoad={() => {
                  setImgLoaded(true);
                  setImgFailed(false);
                }}
                className={`w-full h-full object-cover object-top rounded-full transition-opacity duration-200 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : null}

            {/* Placeholder (#F7F7F5) with initials "MTH" until profile photo is added */}
            {(!imgLoaded || imgFailed) && (
              <div className="absolute inset-0 rounded-full bg-[#F7F7F5] flex items-center justify-center select-none text-[#111111] font-mono text-3xl sm:text-4xl font-medium tracking-wider">
                MTH
              </div>
            )}

            {/* Subtle camera hover indicator for easy photo selection */}
            <div className="absolute inset-0 rounded-full bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
              <Camera size={24} strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide mt-1.5">Change photo</span>
            </div>
          </div>
        </div>

        {/* 1. Name as h1 with MorphingText */}
        {/* 1. Name as h1 with MorphingText */}
        <h1 className="hero-name-heading text-[#111111] font-bold tracking-[-0.04em] leading-[1.05] select-none text-center w-full">
          <MorphingText
            texts={siteContent.hero.nameTexts || ['Hello,', "I'm Minn Thant Hmue"]}
            className="text-[#111111] font-bold tracking-[-0.035em] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] h-[clamp(2.75rem,7vw,5.25rem)] max-w-full flex items-center justify-center whitespace-nowrap"
          />
        </h1>

        {/* 2. Alternating Student & University subtitle with smooth cross-fade effect */}
        <div className="relative min-h-[2.5rem] sm:min-h-[2.75rem] w-full my-1 grid grid-cols-1 grid-rows-1 place-items-center text-center max-w-full px-2 select-none">
          {HERO_SUBTITLES.map((label, index) => {
            const isActive = subtitleIndex === index;
            return (
              <motion.div
                key={label}
                aria-hidden={!isActive}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: shouldReduceMotion ? 0 : isActive ? 0 : index < subtitleIndex ? -5 : 5,
                  filter: shouldReduceMotion ? 'none' : isActive ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.65,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`[grid-area:1/1] inline-flex items-center justify-center text-center max-w-full ${
                  isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                }`}
              >
                <TextHighlighter
                  className="rounded-[0.25em] px-2 py-0.5 font-medium text-[#111111] text-[clamp(0.85rem,3.2vw,1.25rem)] tracking-[-0.018em] whitespace-nowrap select-none"
                  highlightColor="#F2AD91"
                  transition={{ type: 'spring', duration: 0.9, delay: 0.1, bounce: 0 }}
                  useInViewOptions={{ once: true, amount: 0.1 }}
                >
                  {label}
                </TextHighlighter>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Button structure: stacked & full-width on mobile, auto-width & side-by-side on laptop */}
        <div className="pt-2 flex flex-col items-center gap-3 sm:gap-3.5 w-full">
          {/* Top Row: Primary CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-[320px] sm:max-w-none">
            <MagneticButton distance={0.35} className="w-full sm:w-auto">
              <Button
                variant="default"
                href="#projects"
                showArrow
                className="w-full sm:w-auto h-11 min-h-[44px] px-8 text-sm font-medium"
              >
                View projects
              </Button>
            </MagneticButton>

            <MagneticButton distance={0.35} className="w-full sm:w-auto">
              <Button
                variant="secondary"
                href="#contact"
                className="w-full sm:w-auto h-11 min-h-[44px] px-8 text-sm font-medium"
              >
                Contact me
              </Button>
            </MagneticButton>
          </div>

          {/* Bottom Row: Social links (Email, LinkedIn, GitHub) */}
          <div
            className="flex items-center justify-center gap-2 sm:gap-2.5 w-full max-w-[320px] sm:max-w-none pt-0.5"
            aria-label="Social links"
          >
            <MagneticButton distance={0.25} className="flex-1 sm:flex-initial">
              <Button
                variant="secondary"
                href={siteContent.contact.items.find((i) => i.type === 'email')?.href || 'mailto:minnthanthmue04@gmail.com'}
                aria-label="Email Minn Thant Hmue"
                title="Email"
                className="w-full sm:w-auto px-4 text-xs font-medium"
              >
                <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>Email</span>
              </Button>
            </MagneticButton>

            <MagneticButton distance={0.25} className="flex-1 sm:flex-initial">
              <Button
                variant="secondary"
                href={siteContent.contact.items.find((i) => i.type === 'linkedin')?.href || 'https://www.linkedin.com/in/minn-thant-hmue'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="w-full sm:w-auto px-4 text-xs font-medium"
              >
                <Linkedin size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>LinkedIn</span>
              </Button>
            </MagneticButton>

            <MagneticButton distance={0.25} className="flex-1 sm:flex-initial">
              <Button
                variant="secondary"
                href={siteContent.contact.items.find((i) => i.type === 'github')?.href || 'https://github.com/minnthanthmue'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="w-full sm:w-auto px-4 text-xs font-medium"
              >
                <Github size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>GitHub</span>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
