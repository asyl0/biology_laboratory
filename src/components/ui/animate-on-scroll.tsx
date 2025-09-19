"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "slide-in" | "scale-in" | "bounce-in"
  delay?: number
  duration?: number
  threshold?: number
}

export function AnimateOnScroll({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  duration = 300,
  threshold = 0.1
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const animationClasses = {
    "fade-in": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    "slide-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "slide-in": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
    "bounce-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  animation?: "fade-in" | "slide-up" | "slide-in" | "scale-in"
}

export function StaggeredAnimation({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-in"
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimateOnScroll
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  )
}
