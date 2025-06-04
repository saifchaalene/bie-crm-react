
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DelegateResultsHeaderProps {
  selectMode: boolean
  allCurrentSelected: boolean
  handleSelectAll: (checked: boolean) => void
  filteredDelegatesLength: number
  currentPage: number
  totalPages: number
  activeTab: string
  selectedMemberState: string
  selectedNewsletterStatus: string
  sortBy: string
  pageSize: number
  handlePageSizeChange: (size: string) => void
}

export function DelegateResultsHeader({
  selectMode,
  allCurrentSelected,
  handleSelectAll,
  filteredDelegatesLength,
  currentPage,
  totalPages,
  activeTab,
  selectedMemberState,
  selectedNewsletterStatus,
  sortBy,
  pageSize,
  handlePageSizeChange
}: DelegateResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2">
        {selectMode && (
          <Checkbox
            checked={allCurrentSelected}
            onCheckedChange={handleSelectAll}
            aria-label="Select all current page"
            className="mr-2"
          />
        )}
        <h2 className="text-lg font-semibold">
          {filteredDelegatesLength} member{filteredDelegatesLength !== 1 ? 's' : ''}
        </h2>
        {(activeTab !== 'all' || selectedMemberState !== "all_states" || selectedNewsletterStatus !== "all_newsletter" || sortBy !== "newest") && (
          <div className="flex gap-2">
            {activeTab !== 'all' && (
              <Badge variant="secondary">
                {activeTab === 'active' ? 'Current' : 
                 activeTab === 'inactive' ? 'Former' : activeTab}
              </Badge>
            )}
            {selectedMemberState !== "all_states" && (
              <Badge variant="outline">
                {selectedMemberState}
              </Badge>
            )}
            {selectedNewsletterStatus !== "all_newsletter" && (
              <Badge variant="outline">
                {selectedNewsletterStatus === 'subscribed' ? 'Newsletter: Subscribed' : 'Newsletter: Not Subscribed'}
              </Badge>
            )}
            {sortBy !== "newest" && (
              <Badge variant="outline">
                Sort: {sortBy === "oldest" ? "Oldest First" : 
                       sortBy === "name_asc" ? "Name A-Z" : 
                       sortBy === "name_desc" ? "Name Z-A" : "Newest First"}
              </Badge>
            )}
          </div>
        )}
        <span className="text-sm text-gray-500">
          (Page {currentPage} of {totalPages})
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show:</span>
        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="48">48</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-600">per page</span>
      </div>
    </div>
  )
}
