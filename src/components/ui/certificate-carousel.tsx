"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  image: string;
  alt: string;
  credentialUrl?: string;
  description?: string;
}

export interface CertificateCarouselProps {
  certificates?: CertificateItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: "google-ai-cert",
    title: "Google AI Professional Certificate",
    issuer: "Google",
    issuerLogo: "/assets/logos/google.svg",
    date: "Jun 20, 2026",
    image: "/assets/certificates/google-ai.svg",
    alt: "Google AI Professional Certificate credential for Minn Thant Hmue",
    credentialUrl: "https://coursera.org/verify/professional-cert/545Z2IG6REOZ",
    description: "Comprehensive 7-course professional program covering applied generative AI, prompt engineering, and automated workflows.",
  },
];

export const CertificateCarousel: React.FC<CertificateCarouselProps> = ({
  certificates = DEFAULT_CERTIFICATES,
  autoplay = false,
  autoplayInterval = 5000,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxCert, setLightboxCert] = useState<CertificateItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(certificates.length > 1);

  // Update active slide and arrow states on scroll
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);

    // Calculate which item is currently centered/leading
    const slideWidth = track.clientWidth;
    if (slideWidth > 0) {
      const newIndex = Math.round(scrollLeft / (track.firstElementChild?.clientWidth || slideWidth));
      setActiveIndex(Math.max(0, Math.min(certificates.length - 1, newIndex)));
    }
  }, [certificates.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to target slide index
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.children;
    if (slides[index]) {
      (slides[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, []);

  const handlePrev = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -(track.clientWidth * 0.8), behavior: "smooth" });
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
  };

  // Keyboard navigation (Left / Right Arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Lightbox Esc key to close
  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxCert) {
        setLightboxCert(null);
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, [lightboxCert]);

  // Optional gentle autoplay
  useEffect(() => {
    if (!autoplay || isPaused || lightboxCert || certificates.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % certificates.length;
      scrollToIndex(nextIndex);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isPaused, activeIndex, certificates.length, scrollToIndex, lightboxCert]);

  return (
    <div
      className={`cert-carousel relative w-full touch-pan-y ${className}`}
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Certificate carousel"
    >
      {/* Controls Header: Track indicators and minimal round arrows (for multiple certificates) */}
      {certificates.length > 1 && (
        <div className="flex items-center justify-between pb-3 px-1">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Certificate slides">
            {certificates.map((cert, idx) => (
              <button
                key={cert.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to certificate ${idx + 1}: ${cert.title}`}
                onClick={() => scrollToIndex(idx)}
                className={`cert-dot h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                  idx === activeIndex ? "w-6 bg-[#111111]" : "w-1.5 bg-[#E7E5E0] hover:bg-[#9A9A93]"
                }`}
              />
            ))}
          </div>

          {/* Minimal circular prev / next buttons (hidden on touch devices) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next certificate"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Single certificate: Centered, clean, no touch-trapping or horizontal scroll */}
      {certificates.length === 1 ? (
        <div className="w-full flex justify-center py-2 px-1">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setLightboxCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxCert(cert);
                }
              }}
              aria-label={`View ${cert.title} certificate details`}
              className="cert-card"
            >
              {/* 1. Certificate Preview Media */}
              <div className="cert-card__media">
                <img
                  src={cert.image}
                  alt={cert.alt}
                  loading="lazy"
                  className="cert-card__img"
                />
                <div className="cert-card__gradient" aria-hidden="true" />
              </div>

              {/* 2. Card Content Body */}
              <div className="cert-card__body">
                {/* 3. Issuer Row */}
                <div className="cert-card__issuer-row">
                  {cert.issuerLogo ? (
                    <img
                      src={cert.issuerLogo}
                      alt=""
                      className="cert-card__issuer-logo"
                    />
                  ) : (
                    <span className="cert-card__issuer-dot" aria-hidden="true" />
                  )}
                  <span className="cert-card__issuer">{cert.issuer}</span>
                </div>

                {/* 4. Title */}
                <h4 className="cert-card__title">
                  {cert.title}
                </h4>

                {/* 5. Footer Row */}
                <div className="cert-card__footer">
                  <span className="cert-card__date">{cert.date}</span>
                  <span className="cert-card__view">
                    <span>View</span>
                    <ArrowRight className="cert-card__arrow" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Multiple certificates: Horizontal Carousel Track with touch-action pan-y */
        <div
          ref={trackRef}
          className="cert-track flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-y", overscrollBehaviorX: "contain" }}
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="cert-slide shrink-0 snap-start snap-always w-[285px] sm:w-[310px] max-w-[320px]"
            >
              <div
                onClick={() => setLightboxCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxCert(cert);
                  }
                }}
                aria-label={`View ${cert.title} certificate details`}
                className="cert-card"
              >
                {/* 1. Certificate Preview Media */}
                <div className="cert-card__media">
                  <img
                    src={cert.image}
                    alt={cert.alt}
                    loading="lazy"
                    className="cert-card__img"
                  />
                  <div className="cert-card__gradient" aria-hidden="true" />
                </div>

                {/* 2. Card Content Body */}
                <div className="cert-card__body">
                  {/* 3. Issuer Row */}
                  <div className="cert-card__issuer-row">
                    {cert.issuerLogo ? (
                      <img
                        src={cert.issuerLogo}
                        alt=""
                        className="cert-card__issuer-logo"
                      />
                    ) : (
                      <span className="cert-card__issuer-dot" aria-hidden="true" />
                    )}
                    <span className="cert-card__issuer">{cert.issuer}</span>
                  </div>

                  {/* 4. Title */}
                  <h4 className="cert-card__title">
                    {cert.title}
                  </h4>

                  {/* 5. Footer Row */}
                  <div className="cert-card__footer">
                    <span className="cert-card__date">{cert.date}</span>
                    <span className="cert-card__view">
                      <span>View</span>
                      <ArrowRight className="cert-card__arrow" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Lightbox Modal */}
      {lightboxCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxCert.title}
          onClick={() => setLightboxCert(null)}
          className="cert-lightbox fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-2xl bg-white border border-[#E7E5E0] shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header: Title and Close button */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E7E5E0]">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-[#111111] leading-snug">
                  {lightboxCert.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {lightboxCert.issuer} &middot; {lightboxCert.date}
                </p>
              </div>

              <Button
                variant="secondary"
                size="icon-sm"
                onClick={() => setLightboxCert(null)}
                aria-label="Close certificate lightbox"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Certificate Large Preview */}
            <div className="flex-1 min-h-0 overflow-auto py-4 flex items-center justify-center bg-[#FAFAF8] rounded-xl my-3 p-2">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.alt}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-xs"
              />
            </div>

            {/* Footer action link if verified credential URL is provided */}
            {lightboxCert.credentialUrl && (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="default"
                  href={lightboxCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCarousel;
