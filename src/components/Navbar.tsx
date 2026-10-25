import React, { useState, useEffect } from 'react';
import { Home, User, GraduationCap, Layers, FolderKanban, Mail, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StackingNavbar, StackingNavbarItemConfig } from '@/components/ui/stacking-navbar';

export interface NavItemConfig {
  id: string;
  name: string;
  targetId: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'home', name: 'Home', targetId: 'top', icon: Home },
  { id: 'about', name: 'About', targetId: 'about', icon: User },
  { id: 'education', name: 'Education', targetId: 'education', icon: GraduationCap },
  { id: 'stack', name: 'Stack', targetId: 'stack', icon: Layers },
  { id: 'projects', name: 'Projects', targetId: 'projects', icon: FolderKanban },
  { id: 'contact', name: 'Contact', targetId: 'contact', icon: Mail },
];

const STACKING_NAV_ITEMS: StackingNavbarItemConfig[] = NAV_ITEMS.map((item) => ({
  id: item.id,
  label: item.name,
  href: `#${item.targetId}`,
  icon: <item.icon size={15} aria-hidden={true} />,
}));

export const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (scrollY < 120) {
        setActiveId('home');
        return;
      }

      const sections = NAV_ITEMS.map((item) => ({
        id: item.id,
        el:
          document.getElementById(item.targetId) ||
          (item.targetId === 'top' ? document.getElementById('home') : null),
      })).filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      const scrollPosition = scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        if (scrollPosition >= el.offsetTop) {
          setActiveId(id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string, id?: string) => {
    e.preventDefault();
    if (id) {
      setActiveId(id);
    }
    setMobileMenuOpen(false);

    const cleanTargetId = targetId.replace('#', '');
    if (cleanTargetId === 'top' || cleanTargetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(cleanTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between lg:justify-center">
        {/* Mobile / Tablet Floating Bar (< 1024px): Floating pill with Home and Menu toggle */}
        <div className="lg:hidden flex items-center justify-between w-full pointer-events-auto">
          <Button
            variant="secondary"
            size="icon"
            href="#top"
            onClick={(e) => handleNavClick(e, 'top', 'home')}
            aria-label="Home"
            className="shadow-2xs"
          >
            <Home size={18} strokeWidth={2} aria-hidden="true" />
          </Button>

          {/* Floating Pill Center Indicator */}
          <div className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E7E5E0] shadow-2xs backdrop-blur-md text-xs font-medium text-[#111111]">
            <span className="capitalize">{activeId}</span>
          </div>

          <Button
            variant="secondary"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="shadow-2xs cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X size={18} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={18} strokeWidth={2} aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Laptop / Desktop (1024px+): Centered Interactive Floating Stacking Navigation */}
        <div className="hidden lg:flex items-center justify-center pointer-events-auto">
          <div
            className={cn(
              "rounded-full p-1 transition-all duration-300",
              scrolled
                ? "bg-white/80 border border-[#E7E5E0] shadow-[0_8px_30px_rgba(17,17,17,0.06)] backdrop-blur-lg"
                : "bg-white/50 border border-[#E7E5E0]/60 shadow-[0_4px_20px_rgba(17,17,17,0.03)] backdrop-blur-md hover:bg-white/80"
            )}
          >
            <StackingNavbar
              items={STACKING_NAV_ITEMS}
              activeId={activeId}
              onItemClick={(e, href, id) => handleNavClick(e, href, id)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Accessible, >= 44px tap targets) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden pointer-events-auto mt-2 rounded-3xl border border-[#E7E5E0] bg-[#FAFAF8]/95 backdrop-blur-md p-3 shadow-xl max-w-sm mx-auto"
        >
          <nav className="flex flex-col gap-1.5 w-full" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "secondary"}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.id === 'home' ? 'Home' : item.name}
                  className="w-full justify-start px-4 gap-3 text-sm font-medium"
                >
                  <Icon size={16} aria-hidden={true} />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

