import { useState, useEffect, useMemo } from 'react'
import { DelegatesService } from '@/services/delegatesService'

export function useDelegates() {
  const [delegates, setDelegates] = useState<any[]>([])
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

      const uniqueDelegates = Object.values(
        data.reduce((acc: any, curr: any) => {
          acc[curr.id] = curr 
          return acc
        }, {})
      )

      setDelegates(uniqueDelegates)
    } catch (err: any) {
      setError(err.message || 'Failed to load delegates')
    } finally {
      setLoading(false)
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
      .filter(delegate => {
        const matchesSearch = delegate.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTab =
          activeTab === 'all' ||
          (activeTab === 'active' && delegate.type === 1) ||
          (activeTab === 'inactive' && delegate.type === 2)
        const matchesMemberState =
          selectedMemberState === 'all_states' || delegate.country === selectedMemberState
        const matchesNewsletter =
          selectedNewsletterStatus === 'all_newsletter' ||
          (selectedNewsletterStatus === 'subscribed' && delegate.isSubscribed === 1) ||
          (selectedNewsletterStatus === 'not_subscribed' && delegate.isSubscribed != 1)

        return matchesSearch && matchesTab && matchesMemberState && matchesNewsletter
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.start_date || '').getTime() - new Date(a.start_date || '').getTime()
          case 'oldest':
            return new Date(a.start_date || '').getTime() - new Date(b.start_date || '').getTime()
          case 'name_asc':
            return (a.fullname || '').localeCompare(b.fullname || '')
          case 'name_desc':
            return (b.fullname || '').localeCompare(a.fullname || '')
          default:
            return 0
        }
      })
  }, [delegates, searchTerm, activeTab, selectedMemberState, selectedNewsletterStatus, sortBy])

  const totalPages = Math.ceil(filteredDelegates.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentDelegates = filteredDelegates.slice(startIndex, startIndex + pageSize)

  const stats = useMemo(() => {
    const activeDelegates = delegates.filter(d => d.type === 1)
    const newsletterSubscribers = delegates.filter(d => d.isSubscribed === 1)

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
