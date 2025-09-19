import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, XCircle, Clock, Loader2 } from "lucide-react"

interface StatusIndicatorProps {
  status: "online" | "offline" | "away" | "busy" | "loading" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

const statusClasses = {
  online: "bg-success text-success-foreground",
  offline: "bg-muted text-muted-foreground",
  away: "bg-warning text-warning-foreground", 
  busy: "bg-destructive text-destructive-foreground",
  loading: "bg-info text-info-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-destructive text-destructive-foreground"
}

const sizeClasses = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4"
}

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4", 
  lg: "h-5 w-5"
}

const statusIcons = {
  online: CheckCircle,
  offline: XCircle,
  away: Clock,
  busy: XCircle,
  loading: Loader2,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle
}

export function StatusIndicator({
  status,
  size = "md",
  showIcon = false,
  className
}: StatusIndicatorProps) {
  const Icon = statusIcons[status]

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        statusClasses[status],
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            iconSizeClasses[size],
            status === "loading" && "animate-spin"
          )} 
        />
      )}
    </div>
  )
}

interface StatusBadgeProps {
  status: StatusIndicatorProps["status"]
  label?: string
  showIcon?: boolean
  className?: string
}

export function StatusBadge({
  status,
  label,
  showIcon = true,
  className
}: StatusBadgeProps) {
  const statusLabels = {
    online: "Онлайн",
    offline: "Офлайн", 
    away: "Отошел",
    busy: "Занят",
    loading: "Загрузка",
    success: "Успешно",
    warning: "Предупреждение",
    error: "Ошибка"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium",
        statusClasses[status],
        className
      )}
    >
      <StatusIndicator status={status} size="sm" showIcon={showIcon} />
      {label && <span>{label}</span>}
      {!label && <span>{statusLabels[status]}</span>}
    </div>
  )
}

interface ConnectionStatusProps {
  isConnected: boolean
  isReconnecting?: boolean
  className?: string
}

export function ConnectionStatus({
  isConnected,
  isReconnecting = false,
  className
}: ConnectionStatusProps) {
  const getStatus = () => {
    if (isReconnecting) return "loading"
    return isConnected ? "online" : "offline"
  }

  const getLabel = () => {
    if (isReconnecting) return "Переподключение..."
    return isConnected ? "Подключено" : "Отключено"
  }

  return (
    <StatusBadge
      status={getStatus()}
      label={getLabel()}
      className={className}
    />
  )
}
