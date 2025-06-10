
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

interface SortSelectProps {
  sortBy: string
  setSortBy: (value: string) => void
}

export function SortSelect({ sortBy, setSortBy }: SortSelectProps) {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-full sm:w-[300px]">
        <ArrowUpDown className="h-4 w-4 mr-2 shrink-0" />
        <SelectValue placeholder="Sort by" className="text-left" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="name_asc">Name A-Z</SelectItem>
        <SelectItem value="name_desc">Name Z-A</SelectItem>
      </SelectContent>
    </Select>
  )
}
