import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors select-none",
  {
    variants: {
      color: {
        default: "bg-default-soft text-default-soft-foreground",
        warning: "bg-warning-soft text-warning-soft-foreground",
        success: "bg-success-soft text-success-soft-foreground",
        primary: "bg-primary-soft text-primary-soft-foreground",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  color?: "default" | "warning" | "success" | "primary"
  size?: "sm" | "md" | "lg"
}

export function Chip({
  className,
  color = "default",
  size = "md",
  children,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ color, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { chipVariants }
