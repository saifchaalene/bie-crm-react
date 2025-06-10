
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ClearFiltersButtonProps {
  onClearFilters: () => void
}

export function ClearFiltersButton({ onClearFilters }: ClearFiltersButtonProps) {
  return (
    <Button variant="outline" onClick={onClearFilters} className="w-full sm:w-auto">
      <X className="h-4 w-4 mr-2" />
      <span className="sm:hidden">Clear All Filters</span>
      <span className="hidden sm:inline">Clear Filters</span>
    </Button>
  )
}
