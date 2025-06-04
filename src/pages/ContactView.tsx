
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Building, Mail, Phone, MapPin, Calendar, Users, Edit } from "lucide-react"

export default function ContactView() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - in a real app, this would come from your backend
  const contacts = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'individual',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      organization: 'Tech Solutions Inc',
      location: 'New York, NY',
      eventsCount: 5,
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      type: 'organization',
      email: 'contact@techsolutions.com',
      location: 'San Francisco, CA',
      eventsCount: 12,
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Michael Chen',
      type: 'individual',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 987-6543',
      organization: 'Startup.io',
      location: 'Austin, TX',
      eventsCount: 3,
      lastContact: '3 days ago'
    },
    {
      id: '4',
      name: 'Global Corp',
      type: 'organization',
      email: 'info@globalcorp.com',
      phone: '+1 (555) 555-0000',
      location: 'Boston, MA',
      eventsCount: 8,
      lastContact: '5 days ago'
    },
    {
      id: '5',
      name: 'Emma Wilson',
      type: 'individual',
      email: 'emma.wilson@freelance.com',
      phone: '+1 (555) 246-8135',
      location: 'Seattle, WA',
      eventsCount: 2,
      lastContact: '1 week ago'
    }
  ]

  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Contact not found</h3>
            <p className="text-gray-600">The contact you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const initials = contact.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Contact Details</h1>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className={`${contact.type === 'organization' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} text-lg font-semibold`}>
                  {contact.type === 'organization' ? <Building className="h-6 w-6" /> : initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{contact.name}</CardTitle>
                <Badge variant={contact.type === 'organization' ? 'default' : 'secondary'} className="mt-2">
                  {contact.type === 'organization' ? 'Organization' : 'Individual'}
                </Badge>
              </div>
            </div>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
              </div>
              
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                </div>
              )}
              
              {contact.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{contact.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {contact.organization && contact.type === 'individual' && (
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Organization</p>
                    <p className="font-medium">{contact.organization}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Events Participated</p>
                  <p className="font-medium">{contact.eventsCount} events</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Contact</p>
                  <p className="font-medium">{contact.lastContact}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="default">
          <Calendar className="h-4 w-4 mr-2" />
          View Events
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Assign Membership
        </Button>
      </div>
    </div>
  )
}
