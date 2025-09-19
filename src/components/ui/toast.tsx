"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"
import { Button } from "./button"

interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  duration?: number
  onClose: (id: string) => void
}

const variantClasses = {
  default: "bg-card border-border text-card-foreground",
  success: "bg-success/10 border-success/20 text-success",
  warning: "bg-warning/10 border-warning/20 text-warning", 
  destructive: "bg-destructive/10 border-destructive/20 text-destructive",
  info: "bg-info/10 border-info/20 text-info"
}

const iconClasses = {
  default: <Info className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  warning: <AlertCircle className="h-4 w-4" />,
  destructive: <XCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />
}

export function Toast({
  id,
  title,
  description,
  variant = "default",
  duration = 5000,
  onClose
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300) // Wait for animation to complete
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300)
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all duration-300",
        variantClasses[variant],
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {iconClasses[variant]}
        </div>
        <div className="flex-1 space-y-1">
          {title && (
            <p className="text-sm font-semibold">{title}</p>
          )}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClose}
        className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-transparent"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export function ToastContainer({ 
  toasts, 
  onClose, 
  position = "top-right" 
}: ToastContainerProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4", 
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  }

  return (
    <div className={cn(
      "fixed z-50 flex flex-col space-y-2 max-w-sm w-full",
      positionClasses[position]
    )}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      ...toast,
      id,
      onClose: (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }
    }
    
    setToasts((prev) => [...prev, newToast])
    return id
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts
  }
}
