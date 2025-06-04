
import { useState } from "react"
import { EventCard, Event } from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Calendar, Clock, CheckCircle } from "lucide-react"

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data - in a real app, this would come from your backend
  const events: Event[] = [
    {
      id: '1',
      title: 'Q4 Business Review',
      description: 'Quarterly review meeting with key stakeholders',
      date: '2024-12-15',
      time: '2:00 PM',
      location: 'Conference Room A',
      participantsCount: 8,
      status: 'upcoming',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference and networking event',
      date: '2024-12-20',
      time: '9:00 AM',
      location: 'Downtown Convention Center',
      participantsCount: 150,
      status: 'upcoming',
      type: 'conference'
    },
    {
      id: '3',
      title: 'Product Launch Workshop',
      description: 'Interactive workshop for new product features',
      date: '2024-12-10',
      time: '10:00 AM',
      location: 'Innovation Lab',
      participantsCount: 25,
      status: 'ongoing',
      type: 'workshop'
    },
    {
      id: '4',
      title: 'Networking Mixer',
      description: 'Monthly networking event for industry professionals',
      date: '2024-11-28',
      time: '6:00 PM',
      location: 'Rooftop Venue',
      participantsCount: 75,
      status: 'completed',
      type: 'networking'
    },
    {
      id: '5',
      title: 'Team Building Retreat',
      description: 'Annual team building and strategy planning session',
      date: '2024-11-15',
      time: '9:00 AM',
      location: 'Mountain Resort',
      participantsCount: 32,
      status: 'completed',
      type: 'other'
    },
    {
      id: '6',
      title: 'Client Strategy Meeting',
      description: 'Strategic planning session with major client',
      date: '2024-12-18',
      time: '3:00 PM',
      location: 'Client Office',
      participantsCount: 6,
      status: 'upcoming',
      type: 'meeting'
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || event.status === activeTab
    return matchesSearch && matchesTab
  })

  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  const ongoingEvents = events.filter(e => e.status === 'ongoing')
  const completedEvents = events.filter(e => e.status === 'completed')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-2">Manage your events and track participant engagement</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ongoing</p>
                <p className="text-2xl font-bold">{ongoingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </h2>
          {activeTab !== 'all' && (
            <Badge variant="secondary">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={(event) => console.log('Edit event:', event)}
              onViewParticipants={(event) => console.log('View participants for:', event)}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms or filters"
                  : "Get started by creating your first event"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
