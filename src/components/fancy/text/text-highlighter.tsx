"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type HTMLMotionProps,
  type UseInViewOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type HighlightDirection = "left" | "right" | "top" | "bottom";

export interface TextHighlighterProps
  extends Omit<HTMLMotionProps<"span">, "transition" | "children"> {
  children?: React.ReactNode;
  highlightColor?: string;
  className?: string;
  transition?: Transition;
  direction?: HighlightDirection;
  useInViewOptions?: UseInViewOptions;
}

export const TextHighlighter = forwardRef<HTMLSpanElement, TextHighlighterProps>(
  (
    {
      children,
      highlightColor = "#F2AD91",
      className,
      transition = { type: "spring", duration: 1, delay: 0.2, bounce: 0 },
      direction = "left",
      useInViewOptions = { once: true, initial: true, amount: 0.1 },
      style,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLSpanElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLSpanElement);

    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(internalRef, useInViewOptions);

    // Directional gradient & position configuration
    const getBackgroundProps = () => {
      switch (direction) {
        case "right":
          return {
            gradient: `to left, ${highlightColor}, ${highlightColor}`,
            position: "right center",
            initialSize: "0% 100%",
            animatedSize: "100% 100%",
          };
        case "top":
          return {
            gradient: `to bottom, ${highlightColor}, ${highlightColor}`,
            position: "center top",
            initialSize: "100% 0%",
            animatedSize: "100% 100%",
          };
        case "bottom":
          return {
            gradient: `to top, ${highlightColor}, ${highlightColor}`,
            position: "center bottom",
            initialSize: "100% 0%",
            animatedSize: "100% 100%",
          };
        case "left":
        default:
          return {
            gradient: `to right, ${highlightColor}, ${highlightColor}`,
            position: "left center",
            initialSize: "0% 100%",
            animatedSize: "100% 100%",
          };
      }
    };

    const bg = getBackgroundProps();

    return (
      <motion.span
        ref={internalRef}
        className={cn(
          "inline box-decoration-clone leading-inherit",
          className
        )}
        initial={shouldReduceMotion ? false : { backgroundSize: bg.initialSize }}
        animate={{
          backgroundSize: isInView || shouldReduceMotion ? bg.animatedSize : bg.initialSize,
        }}
        transition={transition}
        style={{
          backgroundImage: `linear-gradient(${bg.gradient})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: bg.position,
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

TextHighlighter.displayName = "TextHighlighter";

export default TextHighlighter;
