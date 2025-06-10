import { useState } from "react"
import { DelegateCard } from "@/components/DelegateCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, UserCheck } from "lucide-react"
import { useDelegates } from "@/hooks/useDelegates"
import { DelegateStats } from "@/components/delegates/DelegateStats"
import { DelegateExportActions } from "@/components/delegates/DelegateExportActions"
import { DelegateFilters } from "@/components/delegates/DelegateFilters"
import { DelegateResultsHeader } from "@/components/delegates/DelegateResultsHeader"

export default function Delegates() {
  const {
    filteredDelegates,
    currentDelegates,
    memberStates,
    stats,
    currentPage,
    totalPages,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    selectedMemberState,
    setSelectedMemberState,
    selectedNewsletterStatus,
    setSelectedNewsletterStatus,
    sortBy,
    setSortBy
  } = useDelegates()
  const [gridCols, setGridCols] = useState(4) // Default to 4 columns

  const getGridClasses = () => {
    switch (gridCols) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  }

  const delegatesOnly = filteredDelegates
  const currentDelegatesOnly = currentDelegates

  const [selectedDelegates, setSelectedDelegates] = useState<Set<string>>(new Set())
  const [selectMode, setSelectMode] = useState(false)

  const handleSelectDelegate = (delegateId: string, checked: boolean) => {
    const newSelected = new Set(selectedDelegates)
    checked ? newSelected.add(delegateId) : newSelected.delete(delegateId)
    setSelectedDelegates(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedDelegates(
      checked ? new Set(currentDelegatesOnly.map(d => d.id.toString())) : new Set()
    )
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>)
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  const allCurrentSelected = currentDelegatesOnly.length > 0 &&
    currentDelegatesOnly.every(d => selectedDelegates.has(d.id.toString()))

  return (
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Delegates</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage individual delegate memberships</p>
        </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setSelectMode(!selectMode)}
            className="w-full sm:w-auto"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            <span className="truncate">{selectMode ? 'Cancel Selection' : 'Select Mode'}</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="truncate">Assign Delegate</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <DelegateStats stats={{
        activeDelegates: stats.activeDelegates,
        totalActive: stats.activeDelegates,
        newsletterSubscribers: stats.newsletterSubscribers,
        totalMembers: stats.totalMembers
      }} />

      {/* Export Buttons */}
      <DelegateExportActions
        selectedDelegates={selectedDelegates}
        filteredDelegates={delegatesOnly}
        selectMode={selectMode}
      />

      {/* Filters */}
      <DelegateFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedMemberState={selectedMemberState}
        setSelectedMemberState={setSelectedMemberState}
        selectedNewsletterStatus={selectedNewsletterStatus}
        setSelectedNewsletterStatus={setSelectedNewsletterStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memberStates={memberStates}
      />

      {/* Results Header */}
      <DelegateResultsHeader
        selectMode={selectMode}
        allCurrentSelected={allCurrentSelected}
        handleSelectAll={handleSelectAll}
        filteredDelegatesLength={delegatesOnly.length}
        currentPage={currentPage}
        totalPages={totalPages}
        activeTab={activeTab}
        selectedMemberState={selectedMemberState}
        selectedNewsletterStatus={selectedNewsletterStatus}
        sortBy={sortBy}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
 gridCols={gridCols}
        onGridColsChange={setGridCols}
/>

      {/* Results Grid with dynamic responsive layout */}
      <div className={`grid ${getGridClasses()} gap-4 sm:gap-6 auto-rows-fr`}>
        {currentDelegatesOnly.map((delegate) => (
          <div key={delegate.id} className="relative flex w-full min-w-0">
            {selectMode && (
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedDelegates.has(delegate.id.toString())}
                  onCheckedChange={(checked) => handleSelectDelegate(delegate.id.toString(), checked as boolean)}
                  className="bg-white border-2"
                />
              </div>
            )}
            <DelegateCard
              delegate={delegate}
              onEndMembership={() => console.log('End membership for:', delegate)}
              onViewContact={() => console.log('View contact for:', delegate)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center px-2">
          <Pagination>
            <PaginationContent className="flex-wrap gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm`}
                />
              </PaginationItem>

 <div className="hidden sm:contents">
                {renderPaginationItems()}
              </div>

              {/* Mobile pagination - show only current page info */}
              <div className="sm:hidden flex items-center gap-2 px-2">
                <span className="text-xs text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {delegatesOnly.length === 0 && (
       <Card className="text-center py-8 sm:py-12 mx-2 sm:mx-0">
          <CardContent className="px-4 sm:px-6">
            <UserCheck className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No delegates found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-2">
              {searchTerm || selectedMemberState || selectedNewsletterStatus
                ? "Try adjusting your search terms or filters"
                : "Get started by assigning delegate memberships"}
            </p>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Assign Delegate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
