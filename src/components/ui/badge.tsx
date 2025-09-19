import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-primary-600 text-primary-foreground shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700",
        secondary:
          "border-transparent bg-gradient-to-r from-secondary to-muted text-secondary-foreground shadow-sm hover:shadow-md hover:from-muted hover:to-secondary",
        destructive:
          "border-transparent bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700",
        outline: "text-foreground border-2 border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary",
        success:
          "border-transparent bg-gradient-to-r from-success to-green-600 text-success-foreground shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700",
        warning:
          "border-transparent bg-gradient-to-r from-warning to-yellow-600 text-warning-foreground shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-700",
        info:
          "border-transparent bg-gradient-to-r from-info to-blue-600 text-info-foreground shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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


