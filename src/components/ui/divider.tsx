import * as React from "react"
import { cn } from "@/lib/utils"

interface DividerProps {
  orientation?: "horizontal" | "vertical"
  variant?: "solid" | "dashed" | "dotted"
  className?: string
  children?: React.ReactNode
}

export function Divider({ 
  orientation = "horizontal", 
  variant = "solid",
  className,
  children 
}: DividerProps) {
  const baseClasses = "border-border"
  
  const orientationClasses = {
    horizontal: "w-full border-t",
    vertical: "h-full border-l"
  }

  const variantClasses = {
    solid: "border-solid",
    dashed: "border-dashed", 
    dotted: "border-dotted"
  }

  if (children) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <div className={cn(
          "flex-1",
          orientationClasses[orientation],
          variantClasses[variant],
          baseClasses
        )} />
        <div className="px-3 text-sm text-muted-foreground bg-background">
          {children}
        </div>
        <div className={cn(
          "flex-1",
          orientationClasses[orientation],
          variantClasses[variant],
          baseClasses
        )} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        orientationClasses[orientation],
        variantClasses[variant],
        className
      )}
    />
  )
}

interface SectionDividerProps {
  title?: string
  description?: string
  className?: string
  variant?: "default" | "gradient" | "accent"
}

export function SectionDivider({ 
  title, 
  description, 
  className,
  variant = "default"
}: SectionDividerProps) {
  const variantClasses = {
    default: "bg-muted",
    gradient: "bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20",
    accent: "bg-accent/30"
  }

  return (
    <div className={cn("py-8", className)}>
      <Divider className={cn("mb-6", variantClasses[variant])} />
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
