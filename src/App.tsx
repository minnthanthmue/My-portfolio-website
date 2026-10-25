import React, { useState, useEffect, useRef } from 'react';
import { Backdrop } from './components/Backdrop';
import { StackingNavbar } from '@/components/ui/stacking-navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ToolsSection } from './components/ToolsSection';
import { WorkSection } from './components/WorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SectionSeparator } from './components/SectionSeparator';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { SECTIONS_ORDER, SectionId } from './data/content';

const SECTION_COMPONENTS: Record<SectionId, React.ReactElement> = {
  top: <Hero key="top" />,
  about: <AboutSection key="about" />,
  education: <EducationSection key="education" />,
  stack: <ToolsSection key="stack" />,
  projects: <WorkSection key="projects" />,
  experience: <ExperienceSection key="experience" />,
  contact: <ContactSection key="contact" />,
};

export default function App() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      setShowBackToTop(scrollY > 500);

      // Scroll Spy for active navigation section
      if (scrollY < 120) {
        setActiveSection('top');
        return;
      }

      const sectionIds = ['contact', 'projects', 'stack', 'education', 'about', 'top'];
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string, id?: string) => {
    e.preventDefault();
    const targetId = id || href.replace('#', '');
    setActiveSection(targetId);

    if (targetId === 'top' || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-[var(--text)] bg-[var(--bg)] overflow-x-clip selection:bg-[#2F4BFF]/15 selection:text-[#111111]">
      {/* 1. Skip link for accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-white focus:text-[var(--text)] focus:text-sm focus:font-semibold focus:rounded-full focus:shadow-md focus:border focus:border-[var(--border)] focus:outline-2 focus:outline-[var(--accent)]"
      >
        Skip to content
      </a>

      {/* 2. Scroll Progress Bar: thin 2px accent line at very top of viewport */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#2F4BFF] origin-left z-[100] pointer-events-none transform scale-x-0 will-change-transform motion-reduce:hidden"
      />

      {/* 3. Floating Stacking Navigation Bar */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <div className="pointer-events-auto rounded-full bg-white/80 border border-[#E7E5E0] shadow-[0_8px_30px_rgba(17,17,17,0.06)] backdrop-blur-lg p-1 max-w-[calc(100vw-1.5rem)] overflow-x-auto scrollbar-none">
            <StackingNavbar
              activeId={activeSection}
              onItemClick={handleNavClick}
            />
          </div>
        </div>
      </header>

      {/* 4. Interactive Dot Background */}
      <Backdrop />

      {/* 5. Main Container: max-w-6xl, centered, px-4 mobile, px-8 laptop */}
      <main
        id="main-content"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-clip pt-16 sm:pt-20 pb-20 sm:pb-24"
      >
        {SECTIONS_ORDER.map((section, index) => (
          <React.Fragment key={section.id}>
            {index > 0 && <SectionSeparator />}
            {SECTION_COMPONENTS[section.id]}
          </React.Fragment>
        ))}

        {/* Footer */}
        <Footer />
      </main>

      {/* 6. Back to Top Button */}
      <Button
        size="icon"
        variant="secondary"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-[calc(76px+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(82px+env(safe-area-inset-bottom,0px))] right-5 lg:right-10 z-30 transition-all duration-200 ${
          showBackToTop
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-2 scale-95'
        }`}
      >
        <ArrowUp size={18} strokeWidth={2} aria-hidden="true" />
      </Button>
    </div>
  );
}
