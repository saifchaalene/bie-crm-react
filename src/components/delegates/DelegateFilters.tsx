
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "./SearchBar"
import { SortSelect } from "./SortSelect"
import { MemberStateSelector } from "./MemberStateSelector"
import { NewsletterStatusSelect } from "./NewsletterStatusSelect"
import { FilterTabs } from "./FilterTabs"
import { ClearFiltersButton } from "./ClearFiltersButton"

interface DelegateFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  selectedMemberState: string
  setSelectedMemberState: (value: string) => void
  selectedNewsletterStatus: string
  setSelectedNewsletterStatus: (value: string) => void
  activeTab: string
  setActiveTab: (value: string) => void
  memberStates: string[]
}

export function DelegateFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedMemberState,
  setSelectedMemberState,
  selectedNewsletterStatus,
  setSelectedNewsletterStatus,
  activeTab,
  setActiveTab,
  memberStates
}: DelegateFiltersProps) {
  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setSelectedMemberState("all_states")
    setSelectedNewsletterStatus("all_newsletter")
    setActiveTab("all")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar - Full width on all devices */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Filters Row - Stack on mobile, horizontal on larger screens */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-2">
            {/* Left side filters - Stack on mobile, horizontal on tablet and up */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1">
              <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
              
              <MemberStateSelector 
                selectedMemberState={selectedMemberState}
                setSelectedMemberState={setSelectedMemberState}
                memberStates={memberStates}
              />

              <NewsletterStatusSelect 
                selectedNewsletterStatus={selectedNewsletterStatus}
                setSelectedNewsletterStatus={setSelectedNewsletterStatus}
              />

              <ClearFiltersButton onClearFilters={clearFilters} />
            </div>

            {/* Tabs - Show on same line on desktop, separate line on mobile/tablet */}
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
