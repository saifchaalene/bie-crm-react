
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
import { Plus, Building } from "lucide-react"
import { useDelegates } from "@/hooks/useDelegates"
import { DelegateStats } from "@/components/delegates/DelegateStats"
import { DelegateExportActions } from "@/components/delegates/DelegateExportActions"
import { DelegateFilters } from "@/components/delegates/DelegateFilters"
import { DelegateResultsHeader } from "@/components/delegates/DelegateResultsHeader"

export default function MemberStates() {
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

  // Filter to only show member states
  const memberStatesDelegates = filteredDelegates.filter(d => d.membershipType === 'member_state')
  const currentMemberStates = currentDelegates.filter(d => d.membershipType === 'member_state')

  const [selectedDelegates, setSelectedDelegates] = useState<Set<string>>(new Set())
  const [selectMode, setSelectMode] = useState(false)
  const [gridCols, setGridCols] = useState(3)
const activeMemberStatesCount = memberStatesDelegates.filter(d => d.isActive).length;

  const handleSelectDelegate = (delegateId: string, checked: boolean) => {
    const newSelected = new Set(selectedDelegates)
    if (checked) {
      newSelected.add(delegateId)
    } else {
      newSelected.delete(delegateId)
    }
    setSelectedDelegates(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDelegates(new Set(currentMemberStates.map(d => d.id)))
    } else {
      setSelectedDelegates(new Set())
    }
  }

  const getGridClasses = () => {
    switch (gridCols) {
      case 1: return "grid-cols-1"
      case 2: return "grid-cols-1 md:grid-cols-2"
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
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

  const allCurrentSelected = currentMemberStates.length > 0 && currentMemberStates.every(d => selectedDelegates.has(d.id))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member States</h1>
          <p className="text-gray-600 mt-2">Manage organizational member states</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectMode(!selectMode)}>
            <Building className="h-4 w-4 mr-2" />
            {selectMode ? 'Cancel Selection' : 'Select Mode'}
          </Button>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Add Member State
          </Button>
        </div>
      </div>

   

<DelegateStats stats={{
  ...stats,
  activeDelegates: activeMemberStatesCount,
  totalActive: activeMemberStatesCount
}} />
      <DelegateExportActions 
        selectedDelegates={selectedDelegates}
        filteredDelegates={memberStatesDelegates}
        selectMode={selectMode}
      />

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

      <DelegateResultsHeader 
        selectMode={selectMode}
        allCurrentSelected={allCurrentSelected}
        handleSelectAll={handleSelectAll}
        filteredDelegatesLength={memberStatesDelegates.length}
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

      <div className={`grid ${getGridClasses()} gap-6`}>
        {currentMemberStates.map((delegate) => (
          <div key={delegate.id} className="relative">
            {selectMode && (
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedDelegates.has(delegate.id)}
                  onCheckedChange={(checked) => handleSelectDelegate(delegate.id, checked as boolean)}
                  className="bg-white border-2"
                />
              </div>
            )}
            <DelegateCard
              delegate={delegate}
              onEndMembership={(delegate) => console.log('End membership for:', delegate)}
              onViewContact={(delegate) => console.log('View contact for:', delegate)}
            />
          </div>
        ))}
      </div>

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

      {memberStatesDelegates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No member states found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedMemberState || selectedNewsletterStatus
                ? "Try adjusting your search terms or filters"
                : "Get started by adding organizational member states"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member State
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
