
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

export interface Contact {
  id: string
  name: string
  type: 'individual' | 'organization'
  email: string
  phone?: string
  location?: string
  organization?: string
  eventsCount: number
  lastContact?: string
}

interface ContactCardProps {
  contact: Contact
  onEdit?: (contact: Contact) => void
  onViewEvents?: (contact: Contact) => void
}

export function ContactCard({ contact, onEdit, onViewEvents }: ContactCardProps) {
  const navigate = useNavigate()
  
  const initials = contact.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

  const handleViewContact = () => {
    navigate(`/contacts/${contact.id}`)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className={`${contact.type === 'organization' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {contact.type === 'organization' ? <Building className="h-4 w-4" /> : initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
            <Badge variant={contact.type === 'organization' ? 'default' : 'secondary'} className="text-xs">
              {contact.type === 'organization' ? 'Organization' : 'Individual'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-3 w-3" />
          <span className="truncate">{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-3 w-3" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{contact.location}</span>
          </div>
        )}
        {contact.organization && contact.type === 'individual' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="h-3 w-3" />
            <span className="truncate">{contact.organization}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-3 w-3" />
          <span>{contact.eventsCount} events</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={handleViewContact} className="flex-1">
            View
          </Button>
          <Button variant="default" size="sm" onClick={() => onViewEvents?.(contact)} className="flex-1">
            Events
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
