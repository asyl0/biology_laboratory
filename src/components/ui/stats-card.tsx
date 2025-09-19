import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  className?: string
  style?: React.CSSProperties
  variant?: "default" | "success" | "warning" | "destructive" | "info"
}

const variantClasses = {
  default: "from-primary to-primary-600",
  success: "from-success to-green-600", 
  warning: "from-warning to-yellow-600",
  destructive: "from-destructive to-red-600",
  info: "from-info to-blue-600"
}

const textVariantClasses = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning", 
  destructive: "text-destructive",
  info: "text-info"
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  style,
  variant = "default"
}: StatsCardProps) {
  return (
    <Card className={cn("card-hover group", className)} style={style}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            "p-2 rounded-lg bg-gradient-to-r shadow-lg group-hover:scale-110 transition-transform duration-300",
            variantClasses[variant]
          )}>
            <Icon className={cn("h-4 w-4", textVariantClasses[variant])} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center space-x-1">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  stats: StatsCardProps[]
  className?: string
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          {...stat}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  )
}
