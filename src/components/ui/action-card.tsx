import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { LucideIcon } from "lucide-react"

interface ActionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  actions?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost"
    icon?: LucideIcon
  }[]
  variant?: "default" | "gradient" | "bordered" | "elevated"
  className?: string
  children?: React.ReactNode
}

const variantClasses = {
  default: "bg-card border-border",
  gradient: "bg-gradient-to-br from-card to-muted/30 border-border/50",
  bordered: "bg-card border-2 border-primary/20",
  elevated: "bg-card border-border shadow-xl"
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  actions = [],
  variant = "default",
  className,
  children
}: ActionCardProps) {
  return (
    <Card className={cn(
      "card-hover group transition-all duration-300",
      variantClasses[variant],
      className
    )}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
      
      {actions.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {actions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={action.onClick}
                  className="btn-hover"
                >
                  {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              )
            })}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

interface QuickActionCardProps {
  title: string
  description?: string
  icon: LucideIcon
  onClick: () => void
  variant?: "default" | "primary" | "success" | "warning" | "info"
  className?: string
}

const quickActionVariantClasses = {
  default: "bg-card hover:bg-muted/50",
  primary: "bg-primary/5 hover:bg-primary/10 border-primary/20",
  success: "bg-success/5 hover:bg-success/10 border-success/20",
  warning: "bg-warning/5 hover:bg-warning/10 border-warning/20",
  info: "bg-info/5 hover:bg-info/10 border-info/20"
}

const quickActionIconClasses = {
  default: "text-muted-foreground group-hover:text-primary",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  info: "text-info"
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
  className
}: QuickActionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer card-hover group transition-all duration-300",
        quickActionVariantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <Icon className={cn(
            "h-12 w-12 mx-auto transition-colors duration-200",
            quickActionIconClasses[variant]
          )} />
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
