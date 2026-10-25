import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom" | "both" | "left" | "right";
  height?: string;
  width?: string;
  blurLevels?: number[];
  className?: string;
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  position = "bottom",
  height = "30%",
  width = "30%",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 24, 32],
  className,
  ...props
}) => {
  const isHorizontal = position === "left" || position === "right";

  const getMask = (index: number, total: number) => {
    const start = (index / total) * 100;
    const end = ((index + 1) / total) * 100;

    switch (position) {
      case "bottom":
        return `linear-gradient(to bottom, transparent ${start}%, black ${end}%)`;
      case "top":
        return `linear-gradient(to top, transparent ${start}%, black ${end}%)`;
      case "left":
        return `linear-gradient(to left, transparent ${start}%, black ${end}%)`;
      case "right":
        return `linear-gradient(to right, transparent ${start}%, black ${end}%)`;
      case "both":
      default:
        return `linear-gradient(to bottom, black 0%, transparent 50%, black 100%)`;
    }
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 overflow-hidden",
        position === "top" && "top-0 inset-x-0",
        position === "bottom" && "bottom-0 inset-x-0",
        position === "both" && "inset-0",
        position === "left" && "left-0 inset-y-0",
        position === "right" && "right-0 inset-y-0",
        className
      )}
      style={{
        height: isHorizontal ? "100%" : position === "both" ? "100%" : height,
        width: !isHorizontal ? "100%" : width,
      }}
      {...props}
    >
      {blurLevels.map((blur, index) => {
        const mask = getMask(index, blurLevels.length);
        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
};

export default ProgressiveBlur;
