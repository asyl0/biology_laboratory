import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-hover",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-600 text-primary-foreground shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700",
        destructive:
          "bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700",
        outline:
          "border-2 border-primary/20 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-md hover:shadow-lg",
        secondary:
          "bg-gradient-to-r from-secondary to-muted text-secondary-foreground shadow-md hover:shadow-lg hover:from-muted hover:to-secondary",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-md",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-600",
        success: "bg-gradient-to-r from-success to-green-600 text-success-foreground shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700",
        warning: "bg-gradient-to-r from-warning to-yellow-600 text-warning-foreground shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-yellow-700",
        info: "bg-gradient-to-r from-info to-blue-600 text-info-foreground shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
        xs: "h-8 rounded-md px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }


