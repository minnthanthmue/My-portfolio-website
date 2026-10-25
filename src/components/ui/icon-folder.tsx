"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Icon Folder Component                                             */
/*  Supports theme="dark" | "light", touch toggle, keyboard a11y,     */
/*  custom tile backgrounds, and responsive auto-scale.               */
/* ------------------------------------------------------------------ */

export type FolderIcon = {
  /** Image URL of an app icon (SVG or PNG). */
  src?: string;
  /** Or any custom node (SVG, Lucide icon, React node). */
  node?: React.ReactNode;
  /** Tile background behind icon. Defaults to theme dark/light gradient. */
  background?: string;
  label?: string;
};

export type IconFolderProps = {
  title?: string;
  tags?: string[];
  icons?: FolderIcon[];
  theme?: "dark" | "light";
  /** Start spread open. Defaults to true. */
  defaultOpen?: boolean;
  /** Horizontal distance between fanned icons in pixels. Defaults to 70. */
  spread?: number;
  /** Small preview pill in the bottom-right corner of the folder. */
  showPill?: boolean;
  size?: "sm" | "default";
  className?: string;
};

export const DEFAULT_ICONS: FolderIcon[] = [
  { label: "React", src: "/assets/logos/react.svg" },
  { label: "TypeScript", src: "/assets/logos/typescript.svg" },
  { label: "Python", src: "/assets/logos/python.svg" },
  { label: "Figma", src: "/assets/logos/figma.svg" },
];

const W = 340;
const H = 272;
const FRONT_TOP = 74;
const FRONT_H = H - FRONT_TOP; // 198

// Back panel geometry with tab on top-right
const BACK_PATH =
  "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";

// Front pocket geometry with tab on top-left
const FRONT_PATH =
  "M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 " +
  (FRONT_H - 22) +
  "A22 22 0 0 1 318 " +
  FRONT_H +
  "L22 " +
  FRONT_H +
  "A22 22 0 0 1 0 " +
  (FRONT_H - 22) +
  "Z";

function Tile({ icon, isDark }: { icon: FolderIcon; isDark: boolean }) {
  const bg =
    icon.background ||
    (isDark
      ? "linear-gradient(135deg, #27272a, #141418)"
      : "linear-gradient(180deg, #ffffff 0%, #fafaf8 100%)");

  return (
    <div
      className={cn(
        "grid h-full w-full place-items-center overflow-hidden rounded-[inherit] transition-transform duration-200",
        isDark
          ? "border border-white/10 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]"
          : "border border-[#e7e5e0] shadow-[0_2px_8px_-2px_rgba(17,17,17,0.05),0_1px_2px_rgba(17,17,17,0.03)]"
      )}
      style={{ background: bg }}
    >
      {icon.src ? (
        <img
          src={icon.src}
          alt={icon.label || ""}
          draggable={false}
          className="h-full w-full object-contain p-2.5 pointer-events-none select-none text-[#111111]"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center p-2.5",
            isDark ? "text-zinc-100" : "text-[#111111]"
          )}
        >
          {icon.node}
        </div>
      )}
    </div>
  );
}

export function IconFolder({
  title = "Stack",
  tags = [],
  icons = [],
  theme = "light",
  defaultOpen = true,
  spread = 70,
  showPill = true,
  className = "",
}: IconFolderProps) {
  const uid = React.useId().replace(/:/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = React.useState(340);
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);
  const [hi, setHi] = React.useState<number | null>(null);
  const [reduced, setReduced] = React.useState(false);

  const isDark = theme === "dark";

  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  // Responsive scale factor to adapt to container cell width without horizontal scroll
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const updateWidth = () => {
      const w = el.offsetWidth;
      if (w > 0) {
        setContainerWidth(Math.min(340, Math.max(260, w)));
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const k = Math.min(1, containerWidth / W);
  const n = icons.length;
  const wide = open || hover;
  const rs = n > 1 ? 22 / (n - 1) : 0;
  const ease = "cubic-bezier(.2,.8,.2,1)";

  const effectiveSpread = spread !== undefined ? spread : 70;

  const toggle = () => setOpen((o) => !o);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-block w-full max-w-[340px] select-none touch-manipulation",
        className
      )}
      style={{
        height: (H + 42) * k,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        className="absolute left-1/2 top-0"
        style={{
          width: W,
          height: H,
          transform: `translateX(-50%) translateY(${28 * k}px) scale(${k})`,
          transformOrigin: "50% 0",
        }}
      >
        {/* Soft ground shadow */}
        <div
          className="pointer-events-none absolute left-4 right-4 bottom-[-8px] h-[50px] rounded-[30px] transition-all duration-500"
          style={{
            background: isDark
              ? "rgba(0, 0, 0, 0.55)"
              : "rgba(17, 17, 17, 0.05)",
            opacity: isDark ? 0.85 : 0.6,
            filter: "blur(14px)",
            transform: wide ? "scale(1.05) translateY(4px)" : "none",
          }}
          aria-hidden="true"
        />

        {/* 1. Back panel with right tab */}
        <div
          className="absolute inset-0 overflow-hidden shadow-xs"
          style={{
            clipPath: `path('${BACK_PATH}')`,
            background: isDark
              ? "linear-gradient(180deg, #1c1c22 0%, #111115 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f6f6f4 100%)",
          }}
          aria-hidden="true"
        >
          {/* Subtle sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 35%)"
                : "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 30%)",
            }}
          />
        </div>

        {/* Back rim stroke */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
        >
          <path
            d={BACK_PATH}
            fill="none"
            stroke={isDark ? "rgba(255, 255, 255, 0.12)" : "#e7e5e0"}
            strokeWidth="1.2"
          />
        </svg>

        {/* 2. Fanned tech stack icons */}
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{ clipPath: "inset(-200px -200px 10px -200px)" }}
          aria-hidden="true"
        >
          {icons.map((icon, i) => {
            const step = i - (n - 1) / 2;
            const gap = wide ? effectiveSpread * 1.12 : effectiveSpread;
            const y = (wide ? -14 : 0) - (n > 4 ? Math.abs(step) * 1.5 : 0);
            const rot = step * rs * (wide ? 1.15 : 1);

            return (
              <div
                key={i}
                className="absolute left-1/2 top-[30px] -ml-[27px] h-[54px] w-[54px] rounded-[13px] [backface-visibility:hidden]"
                style={{
                  zIndex: hi === i ? 25 : i + 5,
                  transform: `translate3d(${step * gap}px, ${y}px, 0) rotate(${rot}deg)`,
                  transition: reduced
                    ? "none"
                    : `transform ${wide ? 0.55 : 0.75}s ${ease}`,
                  transitionDelay: reduced
                    ? "0s"
                    : wide
                    ? `${i * 0.03}s`
                    : `${0.1 + i * 0.04}s`,
                }}
              >
                <div
                  className="pointer-events-auto relative h-full w-full rounded-[inherit] active:scale-95"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHi(i)}
                  onPointerLeave={() => setHi((h) => (h === i ? null : h))}
                  style={{
                    transform:
                      hi === i
                        ? `translateY(-16px) rotate(${-rot}deg) scale(1.15)`
                        : hi !== null
                        ? "scale(.96)"
                        : "none",
                    filter:
                      hi !== null && hi !== i
                        ? "saturate(.85) opacity(.9)"
                        : "none",
                    transition: reduced
                      ? "none"
                      : `transform .35s ${ease}, filter .25s ease`,
                  }}
                >
                  <Tile icon={icon} isDark={isDark} />

                  {/* Icon label tooltip */}
                  {icon.label && (
                    <span
                      className={cn(
                        "pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-4 shadow-md backdrop-blur-[8px] select-none transition-all",
                        isDark
                          ? "border border-zinc-700/80 bg-zinc-900/95 text-zinc-100"
                          : "border border-[#e7e5e0] bg-white text-[#111111]"
                      )}
                      style={{
                        opacity: hi === i ? 1 : 0,
                        transform: `translateX(-50%) translateY(${
                          hi === i ? 0 : 5
                        }px)`,
                        transition: reduced
                          ? "none"
                          : `opacity .2s ease, transform .3s ${ease}`,
                      }}
                    >
                      {icon.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Frosted front panel with left tab */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-[10] cursor-pointer overflow-hidden backdrop-blur-[20px] backdrop-saturate-150 transition-transform duration-500",
            "outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF]"
          )}
          style={{
            top: FRONT_TOP,
            height: FRONT_H,
            clipPath: `path('${FRONT_PATH}')`,
            transformOrigin: "50% 100%",
            transform: wide
              ? "perspective(760px) rotateX(-14deg)"
              : "perspective(760px) rotateX(0deg)",
            background: isDark
              ? "linear-gradient(180deg, rgba(26, 26, 32, 0.88) 0%, rgba(18, 18, 22, 0.96) 45%, rgba(14, 14, 18, 0.99) 100%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.94) 45%, rgba(255, 255, 255, 0.99) 100%)",
          }}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => {
            setHover(false);
            setHi(null);
          }}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-label={`${title} folder with ${icons.length} tools. Press Enter or Space to toggle.`}
        >
          {/* Specular reflection */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: isDark
                ? "radial-gradient(240px 180px at 50% 30%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 70%)"
                : "radial-gradient(240px 180px at 50% 30%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 70%)",
            }}
          />

          {/* Front rim glowing highlight */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${W} ${FRONT_H}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`gf-rim-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0"
                  stopColor={isDark ? "#ffffff" : "#ffffff"}
                  stopOpacity={isDark ? "0.3" : "0.95"}
                />
                <stop
                  offset="0.35"
                  stopColor={isDark ? "#ffffff" : "#e7e5e0"}
                  stopOpacity={isDark ? "0.1" : "0.85"}
                />
                <stop
                  offset="1"
                  stopColor={isDark ? "#ffffff" : "#d1d1cb"}
                  stopOpacity={isDark ? "0.03" : "0.35"}
                />
              </linearGradient>
            </defs>
            <path
              d={FRONT_PATH}
              fill="none"
              stroke={`url(#gf-rim-${uid})`}
              strokeWidth="1.4"
            />
          </svg>

          {/* Folder Category Title and Tags */}
          <div className="absolute left-[22px] top-[22px] pointer-events-none pr-4 max-w-[230px]">
            <h3
              className={cn(
                "m-0 text-[16px] sm:text-[17px] font-semibold tracking-[-0.015em] leading-snug",
                isDark ? "text-zinc-100" : "text-[#111111]"
              )}
            >
              {title}
            </h3>
            <span
              className={cn(
                "font-mono text-[11px] tracking-wider uppercase mt-0.5 block",
                isDark ? "text-zinc-400" : "text-[#5C5C57]"
              )}
            >
              {icons.length} {icons.length === 1 ? "tool" : "tools"}
            </span>
          </div>

          {/* Corner preview pill */}
          {showPill && (
            <span
              className={cn(
                "absolute right-[16px] bottom-[16px] flex h-[28px] items-center gap-1 rounded-full px-1.5 shadow-2xs select-none",
                isDark
                  ? "border border-zinc-800 bg-zinc-900/90"
                  : "border border-[#e7e5e0] bg-white/95"
              )}
              aria-hidden="true"
            >
              {icons.map((icon, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-[19px] w-[19px] overflow-hidden rounded-[5px] border",
                    isDark
                      ? "border-zinc-800 bg-zinc-950"
                      : "border-[#e7e5e0] bg-white"
                  )}
                  style={{
                    background: icon.background || undefined,
                  }}
                >
                  <span className="grid h-full w-full place-items-center p-0.5">
                    {icon.src ? (
                      <img
                        src={icon.src}
                        alt=""
                        className="h-full w-full object-contain pointer-events-none"
                      />
                    ) : (
                      <div className="flex items-center justify-center text-zinc-200">
                        {icon.node}
                      </div>
                    )}
                  </span>
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default IconFolder;
