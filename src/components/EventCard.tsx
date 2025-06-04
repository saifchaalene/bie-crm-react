
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  participantsCount: number
  status: 'upcoming' | 'ongoing' | 'completed'
  type: 'meeting' | 'conference' | 'workshop' | 'networking' | 'other'
}

interface EventCardProps {
  event: Event
  onEdit?: (event: Event) => void
  onViewParticipants?: (event: Event) => void
}

export function EventCard({ event, onEdit, onViewParticipants }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'ongoing': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-purple-100 text-purple-700'
      case 'conference': return 'bg-blue-100 text-blue-700'
      case 'workshop': return 'bg-orange-100 text-orange-700'
      case 'networking': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
          <div className="flex gap-2">
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
            <Badge className={getTypeColor(event.type)}>
              {event.type}
            </Badge>
          </div>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
          {event.time && (
            <>
              <Clock className="h-4 w-4 ml-2" />
              <span>{event.time}</span>
            </>
          )}
        </div>
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{event.participantsCount} participants</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onEdit?.(event)} className="flex-1">
            Edit
          </Button>
          <Button variant="default" size="sm" onClick={() => onViewParticipants?.(event)} className="flex-1">
            Participants
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
