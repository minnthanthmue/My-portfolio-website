import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-default-soft text-default-soft-foreground",
        secondary: "bg-default-soft text-default-soft-foreground",
        warning: "bg-warning-soft text-warning-soft-foreground",
        success: "bg-success-soft text-success-soft-foreground",
        primary: "bg-primary-soft text-primary-soft-foreground",
        destructive: "bg-red-100 text-red-800",
        outline: "border border-[var(--border)] text-[var(--text-secondary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

