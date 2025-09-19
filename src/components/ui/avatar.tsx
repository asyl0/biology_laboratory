import * as React from "react"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
  shape?: "circle" | "square"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base", 
  xl: "h-16 w-16 text-lg"
}

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-lg"
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  shape = "circle",
  className
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-muted text-muted-foreground font-medium overflow-hidden",
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          {fallback ? (
            <span className="font-semibold">
              {fallback.charAt(0).toUpperCase()}
            </span>
          ) : (
            <User className="h-1/2 w-1/2" />
          )}
        </div>
      )}
    </div>
  )
}

interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function AvatarGroup({ 
  avatars, 
  max = 3, 
  size = "md",
  className 
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-background"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center bg-muted text-muted-foreground font-medium ring-2 ring-background",
            sizeClasses[size],
            shapeClasses.circle
          )}
        >
          <span className="text-xs font-semibold">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}

interface UserAvatarProps extends Omit<AvatarProps, "fallback"> {
  name?: string
  email?: string
}

export function UserAvatar({ 
  name, 
  email, 
  alt,
  ...props 
}: UserAvatarProps) {
  const fallback = name || email || "U"
  const displayAlt = alt || name || email || "User avatar"

  return (
    <Avatar
      {...props}
      alt={displayAlt}
      fallback={fallback}
    />
  )
}
