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
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delegates</h1>
          <p className="text-gray-600 mt-2">Manage individual delegate memberships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectMode(!selectMode)}>
            <UserCheck className="h-4 w-4 mr-2" />
            {selectMode ? 'Cancel Selection' : 'Select Mode'}
          </Button>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Assign Delegate
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
      />

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {currentDelegatesOnly.map((delegate) => (
          <div key={delegate.id} className="relative flex w-full">
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
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {delegatesOnly.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No delegates found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedMemberState || selectedNewsletterStatus
                ? "Try adjusting your search terms or filters"
                : "Get started by assigning delegate memberships"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign Delegate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
