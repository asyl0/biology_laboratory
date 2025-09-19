import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        success: "bg-success text-success-foreground hover:bg-success/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        muted: "bg-muted text-muted-foreground hover:bg-muted/80"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, removable, onRemove, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 h-4 w-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"

interface ChipGroupProps {
  children: React.ReactNode
  className?: string
  spacing?: "sm" | "md" | "lg"
}

export function ChipGroup({ children, className, spacing = "md" }: ChipGroupProps) {
  const spacingClasses = {
    sm: "gap-1",
    md: "gap-2", 
    lg: "gap-3"
  }

  return (
    <div className={cn("flex flex-wrap items-center", spacingClasses[spacing], className)}>
      {children}
    </div>
  )
}

interface FilterChipProps extends ChipProps {
  active?: boolean
  count?: number
}

export function FilterChip({ 
  active = false, 
  count, 
  children, 
  className, 
  ...props 
}: FilterChipProps) {
  return (
    <Chip
      variant={active ? "default" : "outline"}
      className={cn(
        "cursor-pointer hover:scale-105 transition-transform",
        active && "shadow-md",
        className
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className="ml-1 text-xs opacity-70">
          ({count})
        </span>
      )}
    </Chip>
  )
}

export { Chip, chipVariants }
