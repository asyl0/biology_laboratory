import * as React from "react"
import { cn } from "@/lib/utils"
import { Chip } from "./chip"
import { X, Filter } from "lucide-react"
import { Button } from "./button"

interface FilterTag {
  id: string
  label: string
  value: string
  count?: number
}

interface FilterTagsProps {
  tags: FilterTag[]
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearAll: () => void
  maxVisible?: number
  className?: string
  showClearAll?: boolean
  showCount?: boolean
}

export function FilterTags({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
  maxVisible = 10,
  className,
  showClearAll = true,
  showCount = true
}: FilterTagsProps) {
  const [showAll, setShowAll] = React.useState(false)
  const visibleTags = showAll ? tags : tags.slice(0, maxVisible)
  const hasMoreTags = tags.length > maxVisible

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Фильтры ({selectedTags.length})
          </span>
        </div>
        {showClearAll && selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Очистить все
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2" >
        {visibleTags.map((tag) => (
          <Chip
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            onClick={() => onTagToggle(tag.id)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            {tag.label}
            {showCount && tag.count !== undefined && (
              <span className="ml-1 text-xs opacity-70">
                ({tag.count})
              </span>
            )}
          </Chip>
        ))}
        
        {hasMoreTags && (
          <Chip
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            {showAll ? "Показать меньше" : `+${tags.length - maxVisible} еще`}
          </Chip>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Выбранные фильтры:</p>
          <div className="flex flex-wrap gap-2" >
            {selectedTags.map((tagId) => {
              const tag = tags.find(t => t.id === tagId)
              if (!tag) return null
              
              return (
                <Chip
                  key={tagId}
                  variant="default"
                  removable
                  onRemove={() => onTagToggle(tagId)}
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {tag.label}
                </Chip>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface SearchableFilterTagsProps extends Omit<FilterTagsProps, 'tags'> {
  tags: FilterTag[]
  searchValue: string
  onSearchChange: (value: string) => void
  placeholder?: string
}

export function SearchableFilterTags({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
  searchValue,
  onSearchChange,
  placeholder = "Поиск фильтров...",
  ...props
}: SearchableFilterTagsProps) {
  const filteredTags = React.useMemo(() => {
    if (!searchValue) return tags
    return tags.filter(tag =>
      tag.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [tags, searchValue])

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
        />
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      <FilterTags
        tags={filteredTags}
        selectedTags={selectedTags}
        onTagToggle={onTagToggle}
        onClearAll={onClearAll}
        {...props}
      />
    </div>
  )
}

interface FilterTagsState {
  selectedTags: string[]
  searchValue: string
}

export function useFilterTags(initialTags: FilterTag[]) {
  const [state, setState] = React.useState<FilterTagsState>({
    selectedTags: [],
    searchValue: ""
  })

  const toggleTag = React.useCallback((tagId: string) => {
    setState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }))
  }, [])

  const clearAll = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedTags: []
    }))
  }, [])

  const setSearchValue = React.useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      searchValue: value
    }))
  }, [])

  const reset = React.useCallback(() => {
    setState({
      selectedTags: [],
      searchValue: ""
    })
  }, [])

  return {
    selectedTags: state.selectedTags,
    searchValue: state.searchValue,
    toggleTag,
    clearAll,
    setSearchValue,
    reset
  }
}
