"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

export const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out outline-none hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#2F4BFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none select-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-11 min-h-[44px] px-6 sm:px-8 text-sm",
        cta: "h-11 min-h-[44px] px-6 sm:px-8 text-sm",
        lg: "h-12 min-h-[48px] px-8 sm:px-10 text-sm sm:text-base",
        sm: "h-10 min-h-[40px] px-5 text-xs sm:text-sm",
        xs: "h-9 min-h-[36px] px-4 text-xs",
        icon: "size-11 min-h-[44px] min-w-[44px] p-0",
        "icon-lg": "size-12 min-h-[48px] min-w-[48px] p-0",
        "icon-sm": "size-9 min-h-[36px] min-w-[36px] p-0",
        "icon-xs": "size-8 min-h-[32px] min-w-[32px] p-0",
        "icon-xl": "size-12 min-h-[48px] min-w-[48px] p-0",
        xl: "h-12 min-h-[48px] px-8 text-base",
      },
      variant: {
        default:
          "border-[#111111] bg-[#111111] text-white shadow-[0_2px_8px_rgba(17,17,17,0.08)] hover:bg-[#2F4BFF] hover:border-[#2F4BFF] hover:text-white",
        cta:
          "border-[#111111] bg-[#111111] text-white shadow-[0_2px_8px_rgba(17,17,17,0.08)] hover:bg-[#2F4BFF] hover:border-[#2F4BFF] hover:text-white",
        secondary:
          "border-[#E7E5E0] bg-white text-[#111111] shadow-[0_1px_3px_rgba(17,17,17,0.04)] hover:border-[#2F4BFF] hover:text-[#2F4BFF] hover:bg-[#FAFAF8]",
        outline:
          "border-[#E7E5E0] bg-white text-[#111111] shadow-[0_1px_3px_rgba(17,17,17,0.04)] hover:border-[#2F4BFF] hover:text-[#2F4BFF] hover:bg-[#FAFAF8]",
        destructive:
          "border-destructive bg-destructive text-white hover:bg-destructive/90",
        "destructive-outline":
          "border-destructive/30 bg-white text-destructive hover:bg-destructive/10",
        ghost:
          "border-transparent bg-transparent text-[#111111] hover:bg-[#111111]/5 hover:text-[#2F4BFF]",
        link:
          "border-transparent bg-transparent text-[#111111] underline-offset-4 hover:underline hover:text-[#2F4BFF]",
      },
    },
  }
)

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  loading?: boolean
  href?: string
  target?: string
  rel?: string
  showArrow?: boolean
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  href,
  target,
  rel,
  showArrow = false,
  asChild,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled: boolean = Boolean(loading || disabledProp)
  const isLink = Boolean(href)
  const defaultTagName = isLink ? "a" : "button"
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render || isLink ? undefined : "button"

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight className="ml-1 w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      {loading && (
        <Spinner
          className="pointer-events-none absolute"
          data-slot="button-loading-indicator"
        />
      )}
    </>
  )

  const defaultProps = {
    children: content,
    className: cn(buttonVariants({ className, size, variant })),
    "aria-disabled": loading || undefined,
    "data-loading": loading ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
    ...(href ? { href, target, rel } : {}),
  }

  return useRender({
    defaultTagName,
    props: mergeProps(defaultProps, props),
    render,
  })
}

export default Button
