"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, User, GraduationCap, Layers, FolderKanban, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface StackingNavbarItemConfig {
  href: string;
  label: string;
  id?: string;
  icon?: React.ReactNode;
}

export interface StackingNavbarProps {
  items?: StackingNavbarItemConfig[];
  activeId?: string;
  onItemClick?: (e: React.MouseEvent<HTMLElement>, href: string, id?: string) => void;
  className?: string;
}

/**
 * Returns a simple lucide-react icon matching the navigation item,
 * used as a default fallback if an item does not provide a custom icon.
 */
export function getSimpleNavIcon(label: string, id?: string): React.ReactNode {
  const normalized = (id || label).toLowerCase();
  if (normalized.includes("home") || normalized.includes("top")) {
    return <Home size={17} aria-hidden={true} />;
  }
  if (normalized.includes("about") || normalized.includes("user") || normalized.includes("profile")) {
    return <User size={17} aria-hidden={true} />;
  }
  if (normalized.includes("edu") || normalized.includes("degree") || normalized.includes("school")) {
    return <GraduationCap size={17} aria-hidden={true} />;
  }
  if (
    normalized.includes("stack") ||
    normalized.includes("comp") ||
    normalized.includes("tech") ||
    normalized.includes("tool")
  ) {
    return <Layers size={17} aria-hidden={true} />;
  }
  if (normalized.includes("proj") || normalized.includes("work")) {
    return <FolderKanban size={17} aria-hidden={true} />;
  }
  if (normalized.includes("contact") || normalized.includes("mail") || normalized.includes("info")) {
    return <Mail size={17} aria-hidden={true} />;
  }
  return <Layers size={17} aria-hidden={true} />;
}

export const DEFAULT_STACKING_NAV_ITEMS: StackingNavbarItemConfig[] = [
  { href: "#top", label: "Home", id: "top", icon: <Home size={17} aria-hidden={true} /> },
  { href: "#about", label: "About", id: "about", icon: <User size={17} aria-hidden={true} /> },
  { href: "#education", label: "Education", id: "education", icon: <GraduationCap size={17} aria-hidden={true} /> },
  { href: "#stack", label: "Stack", id: "stack", icon: <Layers size={17} aria-hidden={true} /> },
  { href: "#projects", label: "Projects", id: "projects", icon: <FolderKanban size={17} aria-hidden={true} /> },
  { href: "#contact", label: "Contact", id: "contact", icon: <Mail size={17} aria-hidden={true} /> },
];

export const StackingNavbar: React.FC<StackingNavbarProps> = ({
  items = DEFAULT_STACKING_NAV_ITEMS,
  activeId = "top",
  onItemClick,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      aria-label="Floating Navigation Bar"
      className={cn(
        "flex items-center gap-x-1 sm:gap-x-2 py-0.5 px-0.5 pointer-events-auto select-none",
        className
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setExpanded(false);
        }
      }}
      onClick={(e) => {
        // Allow mobile users without hover to toggle expansion by tapping nav container edge
        if (e.target === e.currentTarget) {
          setExpanded((prev) => !prev);
        }
      }}
    >
      {items.map((item, index) => {
        const itemTarget = item.id || item.href.replace("#", "");
        const isActive =
          activeId === itemTarget ||
          (itemTarget === "top" && (activeId === "home" || activeId === "top"));
        const icon = item.icon || getSimpleNavIcon(item.label, item.id);

        return (
          <StackingNavbarItem
            href={item.href}
            label={item.label}
            expanded={expanded}
            key={item.id || item.href || index}
            index={index}
            isActive={isActive}
            onClick={(e) => {
              if (!expanded && typeof window !== "undefined" && window.innerWidth < 640) {
                // If collapsed on touch device, expand upon interaction
                setExpanded(true);
              }
              if (onItemClick) {
                onItemClick(e, item.href, itemTarget);
              }
            }}
          >
            {/* Simple lucide-react icon rendered across all viewports */}
            <span className="shrink-0 flex items-center justify-center">
              {icon}
            </span>
            {/* Display text labels ONLY when screen width is >= 640px (hidden below 640px for compact mobile nav) */}
            <span className="hidden sm:inline font-medium">{item.label}</span>
          </StackingNavbarItem>
        );
      })}
    </nav>
  );
};

export const StackingNavbarItem = ({
  href,
  label,
  children,
  style,
  expanded,
  index,
  isActive = false,
  onClick,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  expanded: boolean;
  index: number;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  // When screen width < 640px (mobile): 28px offset gives a compact 16px peek tab.
  // When screen width >= 640px (desktop): 78px offset gives a 25-32px peek tab.
  const offsetDistance = isMobile ? 28 : 78;

  return (
    <motion.div
      initial={{ x: shouldReduceMotion ? 0 : -offsetDistance * index }}
      animate={{ x: expanded || shouldReduceMotion ? 0 : -offsetDistance * index }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: "circInOut",
        delay: shouldReduceMotion ? 0 : 0.025 * index,
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
      style={{
        zIndex: 100 - index,
        ...style,
      }}
      className="relative shrink-0"
    >
      <Button
        variant={isActive ? "default" : "secondary"}
        size="default"
        href={href}
        onClick={onClick}
        aria-label={label}
        title={label}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          // Screen width < 640px: Compact circular 44px tap target with icon only
          // Screen width >= 640px: Auto-width button with icon + text label
          "h-11 min-h-[44px] min-w-[44px] w-11 sm:w-auto p-0 sm:px-4 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap shadow-xs gap-1.5 transition-all duration-200",
          isActive
            ? "border-[#111111] bg-[#111111] text-white shadow-[0_2px_8px_rgba(17,17,17,0.12)] hover:bg-[#2F4BFF] hover:border-[#2F4BFF]"
            : "border-[#E7E5E0] bg-white text-[#111111] shadow-[0_1px_3px_rgba(17,17,17,0.04)] hover:border-[#2F4BFF] hover:text-[#2F4BFF] hover:bg-[#FAFAF8]"
        )}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default StackingNavbar;
