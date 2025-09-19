import * as React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  showCount?: boolean
  count?: number
  readonly?: boolean
  onChange?: (value: number) => void
  className?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
}

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  showCount = false,
  count,
  readonly = false,
  onChange,
  className
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const [isHovering, setIsHovering] = React.useState(false)

  const displayValue = isHovering && hoverValue !== null ? hoverValue : value

  const handleStarClick = (starValue: number) => {
    if (!readonly && onChange) {
      onChange(starValue)
    }
  }

  const handleStarHover = (starValue: number) => {
    if (!readonly) {
      setHoverValue(starValue)
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null)
      setIsHovering(false)
    }
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div
        className="flex items-center space-x-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= displayValue
          const isHalfFilled = starValue === Math.ceil(displayValue) && displayValue % 1 !== 0

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              disabled={readonly}
              className={cn(
                "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm",
                !readonly && "cursor-pointer hover:scale-110",
                readonly && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? "text-warning fill-warning"
                    : isHalfFilled
                    ? "text-warning fill-warning/50"
                    : "text-muted-foreground"
                )}
              />
            </button>
          )
        })}
      </div>
      
      {(showValue || showCount) && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {showValue && (
            <span className="font-medium">
              {value.toFixed(1)}
            </span>
          )}
          {showCount && count !== undefined && (
            <span>
              ({count})
            </span>
          )}
        </div>
      )}
    </div>
  )
}

interface RatingDisplayProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  showCount?: boolean
  count?: number
  className?: string
}

export function RatingDisplay({
  value,
  max = 5,
  size = "md",
  showValue = true,
  showCount = false,
  count,
  className
}: RatingDisplayProps) {
  return (
    <Rating
      value={value}
      max={max}
      size={size}
      showValue={showValue}
      showCount={showCount}
      count={count}
      readonly={true}
      className={className}
    />
  )
}

interface RatingSummaryProps {
  ratings: { value: number; count: number }[]
  totalCount: number
  averageRating: number
  className?: string
}

export function RatingSummary({
  ratings,
  totalCount,
  averageRating,
  className
}: RatingSummaryProps) {
  const maxCount = Math.max(...ratings.map(r => r.count))

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center space-x-4">
        <div className="text-3xl font-bold text-foreground">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <RatingDisplay value={averageRating} size="lg" />
          <p className="text-sm text-muted-foreground mt-1">
            {totalCount} отзывов
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        {ratings.map((rating, index) => {
          const percentage = (rating.count / totalCount) * 100
          const stars = 5 - index

          return (
            <div key={stars} className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground w-8">
                {stars}
              </span>
              <Star className="h-4 w-4 text-warning fill-warning" />
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">
                {rating.count}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
