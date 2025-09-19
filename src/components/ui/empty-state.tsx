import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    icon: "h-12 w-12",
    title: "text-lg",
    description: "text-sm",
    spacing: "space-y-3"
  },
  md: {
    icon: "h-16 w-16", 
    title: "text-xl",
    description: "text-base",
    spacing: "space-y-4"
  },
  lg: {
    icon: "h-20 w-20",
    title: "text-2xl", 
    description: "text-lg",
    spacing: "space-y-6"
  }
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md"
}: EmptyStateProps) {
  const classes = sizeClasses[size]

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center py-12 px-4",
      classes.spacing,
      className
    )}>
      {Icon && (
        <div className={cn(
          "rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground",
          classes.icon
        )}>
          <Icon className={cn("h-1/2 w-1/2")} />
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className={cn("font-semibold text-foreground", classes.title)}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-muted-foreground max-w-sm", classes.description)}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <Button onClick={action.onClick} className="btn-hover">
          {action.label}
        </Button>
      )}
    </div>
  )
}

interface EmptyStateCardProps extends EmptyStateProps {
  variant?: "default" | "bordered" | "gradient"
}

export function EmptyStateCard({
  variant = "default",
  className,
  ...props
}: EmptyStateCardProps) {
  const variantClasses = {
    default: "bg-card",
    bordered: "bg-card border border-border",
    gradient: "bg-gradient-to-br from-card to-muted/30 border border-border/50"
  }

  return (
    <div className={cn(
      "rounded-xl p-8 shadow-sm",
      variantClasses[variant],
      className
    )}>
      <EmptyState {...props} />
    </div>
  )
}
