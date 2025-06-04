import { useState, useEffect, useMemo } from 'react'
import { Delegate } from '@/types/delegate'
import { DelegatesService } from '@/services/delegatesService'

export function useDelegates() {
  const [delegates, setDelegates] = useState<Delegate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [selectedMemberState, setSelectedMemberState] = useState<string>("all_states")
  const [selectedNewsletterStatus, setSelectedNewsletterStatus] = useState<string>("all_newsletter")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await DelegatesService.getAllDelegates()
      console.log('Data received:', data)
      setDelegates(data)
    } catch (err: any) {
      console.error(' [useDelegates] Error fetching delegates:', err)
      setError(err.message || 'Failed to load delegates')
    } finally {
      setLoading(false)
      console.log('[useDelegates] Loading finished')
    }
  }
  fetchData()


}, [])




  const memberStates = useMemo(() => {
    return Array.from(new Set(delegates.map(d => d.country || '')))
      .filter(Boolean)
      .sort()
  }, [delegates])

const filteredDelegates = useMemo(() => {
  return delegates
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime()
        case "oldest":
          return new Date(a.startDate || '').getTime() - new Date(b.startDate || '').getTime()
        case "name_asc":
          return (a.fullname || '').localeCompare(b.fullname || '')
        case "name_desc":
          return (b.fullname || '').localeCompare(a.fullname || '')
        default:
          return 0
      }
    })
}, [delegates, sortBy])

  const totalPages = Math.ceil(filteredDelegates.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentDelegates = filteredDelegates.slice(startIndex, startIndex + pageSize)

  const stats = useMemo(() => {
    const activeDelegates = delegates.filter(d => d.isActive)
    const newsletterSubscribers = delegates.filter(d => d.isNewsletterSubscribed)

    return {
      activeDelegates: activeDelegates.length,
      newsletterSubscribers: newsletterSubscribers.length,
      totalMembers: delegates.length
    }
  }, [delegates])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageSizeChange = (size: string) => {
    setPageSize(parseInt(size))
    setCurrentPage(1)
  }
  useEffect(() => {
    if (delegates.length > 0) {
      console.log('filteredDelegates:', filteredDelegates)
      console.log(' currentDelegates:', currentDelegates)
    }
  }, [delegates, filteredDelegates, currentDelegates])


  return {
    delegates,
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
    setSortBy,
    loading,
    error
  }
}
