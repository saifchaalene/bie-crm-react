
import { useDelegates } from "@/hooks/useDelegates"
import { StatsCard } from "@/components/StatsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Mail, Clock, MessageSquare, Eye, UserPlus, Building } from "lucide-react"
import { format } from "date-fns"
import { useMemo } from "react"

export default function MembershipDashboard() {
  const {
    filteredDelegates,
    memberStates
  } = useDelegates()

  // Filter to only show current delegates
  const currentDelegates = filteredDelegates.filter(d => 
    d.membershipType === 'delegate' && d.isActive
  )

  // Calculate stats
  const stats = useMemo(() => {
    const totalCurrentDelegates = currentDelegates.length
    const newsletterSubscribers = currentDelegates.filter(d => d.isNewsletterSubscribed).length
    const totalMemberStates = memberStates.length
    
    return {
      totalCurrentDelegates,
      newsletterSubscribers,
      totalMemberStates,
      subscriptionRate: totalCurrentDelegates > 0 ? 
        Math.round((newsletterSubscribers / totalCurrentDelegates) * 100) : 0
    }
  }, [currentDelegates, memberStates])

  // Get 10 most recent current delegates
  const recentDelegates = useMemo(() => {
    return [...currentDelegates]
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, 10)
  }, [currentDelegates])

  // Get recent notes from current delegates
  const recentNotes = useMemo(() => {
    const allNotes = currentDelegates
      .flatMap(delegate => 
        (delegate.notes || []).map(note => ({
          ...note,
          delegateName: delegate.contactName,
          delegateId: delegate.id
        }))
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
    
    return allNotes
  }, [currentDelegates])

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Membership Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Overview of delegate memberships and recent activity
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Delegate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Current Delegates"
          value={stats.totalCurrentDelegates}
          icon={Users}
          description="Active delegate memberships"
        />
        <StatsCard
          title="Newsletter Subscribers"
          value={stats.newsletterSubscribers}
          icon={Mail}
          description={`${stats.subscriptionRate}% subscription rate`}
        />
        <StatsCard
          title="Member States"
          value={stats.totalMemberStates}
          icon={Building}
          description="Total represented states"
        />
        <StatsCard
          title="Recent Notes"
          value={recentNotes.length}
          icon={MessageSquare}
          description="Latest delegate notes"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Delegates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Delegates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentDelegates.length > 0 ? (
              <div className="space-y-3">
                {recentDelegates.map((delegate) => (
                  <div key={delegate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{delegate.contactName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {delegate.memberState || 'No State'}
                        </Badge>
                        {delegate.isNewsletterSubscribed && (
                          <Mail className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Started: {format(new Date(delegate.startDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No delegates found</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentNotes.length > 0 ? (
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm">{note.delegateName}</p>
                        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {format(new Date(note.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent notes</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
