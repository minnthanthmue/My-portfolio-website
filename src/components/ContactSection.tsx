import React, { useState, useEffect, useRef } from 'react';
import { siteContent } from '@/data/content';
import { RevealText } from '@/components/ui/reveal-text';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

const CONTACT_ICONS = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
};

export const ContactSection: React.FC = () => {
  const { contact } = siteContent;
  const [copied, setCopied] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent, emailValue: string) => {
    e.preventDefault();
    e.stopPropagation();

    const doCopy = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailValue);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = emailValue;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        setCopied(true);
        setLiveAnnouncement('Email copied');

        if (copyTimerRef.current) {
          window.clearTimeout(copyTimerRef.current);
        }
        copyTimerRef.current = window.setTimeout(() => {
          setCopied(false);
          setLiveAnnouncement('');
        }, 1500);
      } catch {
        // Fallback gracefully
      }
    };

    doCopy();
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24 lg:py-28">
      {/* Aria-live region for screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column (4 cols on laptop): Sticky heading on desktop */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <RevealText as="h2" className="section-heading text-[#111111]">
            {contact.heading}
          </RevealText>
          <p className="mt-3 text-sm text-zinc-600 font-normal leading-relaxed max-w-[36ch]">
            Get in touch for internships, software projects, or collaboration.
          </p>
        </div>

        {/* Right column (8 cols on laptop): Three cards stacked on mobile, 3-col on tablet/laptop */}
        <div className="lg:col-span-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {contact.items.map((item, idx) => {
              const Icon = CONTACT_ICONS[item.type];
              const isEmail = item.type === 'email';

              return (
                <motion.a
                  key={item.type}
                  href={item.href}
                  target={!isEmail ? '_blank' : undefined}
                  rel={!isEmail ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex flex-col justify-between min-h-[114px] p-5 rounded-2xl bg-white border border-[#E7E5E0] shadow-2xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#2F4BFF] active:scale-[0.98] outline-none select-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {/* Top row: Icon and action button (Copy or Arrow) */}
                  <div className="flex items-center justify-between gap-2">
                    <Icon size={18} strokeWidth={1.5} className="text-[#111111] shrink-0" aria-hidden="true" />

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isEmail && (
                        <Button
                          variant="secondary"
                          size="icon-xs"
                          onClick={(e) => handleCopyEmail(e, item.value)}
                          aria-label={copied ? 'Email copied' : 'Copy email address'}
                          title={copied ? 'Copied!' : 'Copy email'}
                        >
                          {copied ? (
                            <Check size={14} strokeWidth={2} className="text-[#10B981]" aria-hidden="true" />
                          ) : (
                            <Copy size={13} strokeWidth={1.5} aria-hidden="true" />
                          )}
                        </Button>
                      )}

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="text-zinc-400 group-hover:text-[#2F4BFF] transition-all duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] shrink-0 motion-reduce:transform-none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Bottom: Label and Value */}
                  <div className="mt-4 flex flex-col min-w-0">
                    <span className="text-[0.6875rem] font-mono font-medium uppercase tracking-[0.14em] text-zinc-500">
                      {item.label}
                    </span>
                    <span className="text-[0.875rem] font-medium text-[#111111] group-hover:text-[#2F4BFF] transition-colors break-anywhere mt-0.5">
                      {item.value}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Action row below the boxes: "Email" Primary CTA button */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <MagneticButton distance={0.4}>
              <Button
                variant="default"
                href={contact.items.find((i) => i.type === 'email')?.href || 'mailto:minnthanthmue04@gmail.com'}
                showArrow
                className="w-full sm:w-auto h-11 min-h-[44px] px-8 text-sm font-medium"
              >
                {contact.primaryCtaText}
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
