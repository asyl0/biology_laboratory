import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock, Calendar, User } from "lucide-react"

interface TimestampProps {
  date: Date | string
  format?: "relative" | "absolute" | "both"
  showIcon?: boolean
  icon?: "clock" | "calendar" | "user"
  className?: string
  locale?: string
}

export function Timestamp({
  date,
  format = "relative",
  showIcon = true,
  icon = "clock",
  className,
  locale = "ru"
}: TimestampProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("h-4 w-20 bg-muted rounded animate-pulse", className)} />
  }

  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const formatRelative = () => {
    if (diffInSeconds < 60) return "только что"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} дн назад`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} мес назад`
    return `${Math.floor(diffInSeconds / 31536000)} г назад`
  }

  const formatAbsolute = () => {
    return dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getIcon = () => {
    const iconClasses = "h-4 w-4 text-muted-foreground"
    switch (icon) {
      case "calendar":
        return <Calendar className={iconClasses} />
      case "user":
        return <User className={iconClasses} />
      default:
        return <Clock className={iconClasses} />
    }
  }

  const getContent = () => {
    switch (format) {
      case "relative":
        return formatRelative()
      case "absolute":
        return formatAbsolute()
      case "both":
        return `${formatRelative()} (${formatAbsolute()})`
      default:
        return formatRelative()
    }
  }

  return (
    <div className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {showIcon && getIcon()}
      <span>{getContent()}</span>
    </div>
  )
}

interface TimeAgoProps {
  date: Date | string
  className?: string
  showIcon?: boolean
}

export function TimeAgo({ date, className, showIcon = false }: TimeAgoProps) {
  return (
    <Timestamp
      date={date}
      format="relative"
      showIcon={showIcon}
      icon="clock"
      className={className}
    />
  )
}

interface DateDisplayProps {
  date: Date | string
  format?: "short" | "long" | "time"
  className?: string
  showIcon?: boolean
}

export function DateDisplay({ 
  date, 
  format = "short", 
  className, 
  showIcon = true 
}: DateDisplayProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("h-4 w-24 bg-muted rounded animate-pulse", className)} />
  }

  const dateObj = typeof date === "string" ? new Date(date) : date

  const formatDate = () => {
    switch (format) {
      case "short":
        return dateObj.toLocaleDateString("ru", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      case "long":
        return dateObj.toLocaleDateString("ru", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      case "time":
        return dateObj.toLocaleTimeString("ru", {
          hour: "2-digit",
          minute: "2-digit"
        })
      default:
        return dateObj.toLocaleDateString("ru")
    }
  }

  return (
    <div className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {showIcon && <Calendar className="h-4 w-4 text-muted-foreground" />}
      <span>{formatDate()}</span>
    </div>
  )
}
