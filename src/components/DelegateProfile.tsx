
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  Calendar, 
  CalendarOff, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  Bell, 
  Globe, 
  StickyNote,
  User,
  Home,
  Camera,
  Activity,
  Users
} from "lucide-react"
import { Delegate } from "@/types/delegate"

interface DelegateProfileProps {
  delegate: Delegate | null
  isOpen: boolean
  onClose: () => void
}

interface Event {
  id: string
  name: string
  type: 'GA' | 'Expo'
  year: number
  city: string
  country: string
  startDate: string
  endDate: string
  role?: string
  status: 'attended' | 'registered' | 'cancelled'
}

interface Relationship {
  id: string
  department: string
  sector: string
  position: string
  startDate: string
  endDate?: string
  isActive: boolean
}

interface ActivityLog {
  id: string
  action: string
  performedBy: string
  timestamp: string
  details?: string
}

interface MembershipPeriod {
  id: string
  startDate: string
  endDate?: string
  role?: string
  isActive: boolean
  memberState: string
  notes?: string
}

export function DelegateProfile({ delegate, isOpen, onClose }: DelegateProfileProps) {
  if (!delegate) return null

  const initials = delegate.fullname


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Mock data for events
  const events: Event[] = [
    {
      id: '1',
      name: 'GA 2024',
      type: 'GA',
      year: 2024,
      city: 'Geneva',
      country: 'Switzerland',
      startDate: '2024-09-15',
      endDate: '2024-09-18',
      role: 'Delegate',
      status: 'attended'
    },
    {
      id: '2',
      name: 'Expo 2023',
      type: 'Expo',
      year: 2023,
      city: 'Dubai',
      country: 'UAE',
      startDate: '2023-10-01',
      endDate: '2023-10-28',
      role: 'Trade Representative',
      status: 'attended'
    },
    {
      id: '3',
      name: 'GA 2023',
      type: 'GA',
      year: 2023,
      city: 'New York',
      country: 'USA',
      startDate: '2023-09-19',
      endDate: '2023-09-26',
      role: 'Observer',
      status: 'attended'
    },
    {
      id: '4',
      name: 'Expo 2025',
      type: 'Expo',
      year: 2025,
      city: 'Osaka',
      country: 'Japan',
      startDate: '2025-04-13',
      endDate: '2025-10-13',
      role: 'Delegate',
      status: 'registered'
    }
  ]

  // Mock data for relationships
  const relationships: Relationship[] = [
    {
      id: '1',
      department: 'Ministry of Foreign Affairs',
      sector: 'International Trade',
      position: 'Senior Trade Advisor',
      startDate: '2022-01-15',
      isActive: true
    },
    {
      id: '2',
      department: 'Department of Commerce',
      sector: 'Export Development',
      position: 'Trade Specialist',
      startDate: '2020-03-01',
      endDate: '2021-12-31',
      isActive: false
    },
    {
      id: '3',
      department: 'Embassy Economic Section',
      sector: 'Bilateral Relations',
      position: 'Economic Attaché',
      startDate: '2023-06-01',
      isActive: true
    }
  ]

  // Mock data for activity log
  const activityLog: ActivityLog[] = [
    {
      id: '1',
      action: 'Profile Updated',
      performedBy: 'John Smith',
      timestamp: '2024-12-01T10:30:00Z',
      details: 'Updated contact information and role'
    },
    {
      id: '2',
      action: 'Note Added',
      performedBy: 'Sarah Johnson',
      timestamp: '2024-11-28T14:15:00Z',
      details: 'Added note about trade preferences'
    },
    {
      id: '3',
      action: 'Event Registration',
      performedBy: 'System',
      timestamp: '2024-11-25T09:00:00Z',
      details: 'Registered for Expo 2025 Osaka'
    },
    {
      id: '4',
      action: 'Membership Extended',
      performedBy: 'Admin User',
      timestamp: '2024-11-20T16:45:00Z',
      details: 'Extended membership until 2025'
    },
    {
      id: '5',
      action: 'Profile Created',
      performedBy: 'System',
      timestamp: '2022-01-15T08:00:00Z',
      details: 'Initial profile creation'
    }
  ]

  // Mock data for multiple membership periods
  const membershipPeriods: MembershipPeriod[] = [
    {
      id: '1',
      startDate: '2024-01-01',
      role: 'Senior Delegate',
      isActive: true,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Current active membership'
    },
    {
      id: '2',
      startDate: '2022-01-15',
      endDate: '2023-12-31',
      role: 'Delegate',
      isActive: false,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Previous term as regular delegate'
    },
    {
      id: '3',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      role: 'Observer',
      isActive: false,
      memberState: delegate.memberState || 'Unknown',
      notes: 'Initial observer status'
    }
  ]

  // Mock addresses
  const addresses = [
    {
      type: 'Work',
      street: '123 Diplomatic Avenue',
      city: 'Geneva',
      state: 'Geneva',
      country: 'Switzerland',
      postalCode: '1202'
    },
    {
      type: 'Home',
      street: '456 Embassy Row',
      city: delegate.memberState?.split(' ')[0] || 'Capital',
      state: delegate.memberState || 'State',
      country: delegate.memberState || 'Country',
      postalCode: '12345'
    }
  ]

  const getLanguageIcon = (language: 'English' | 'French') => {
    if (language === 'French') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600" title="French">
          <div className="w-4 h-3 flex">
            <div className="w-1/3 bg-blue-600 rounded-l"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-red-600 rounded-r"></div>
          </div>
          <span className="text-xs">FR</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600" title="English">
        <Globe className="h-3 w-3" />
        <span className="text-xs">EN</span>
      </div>
    )
  }

  const getEventStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'attended':
        return <Badge variant="default" className="text-xs">Attended</Badge>
      case 'registered':
        return <Badge variant="secondary" className="text-xs">Registered</Badge>
      case 'cancelled':
        return <Badge variant="destructive" className="text-xs">Cancelled</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Delegate Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section with Photo and Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`} />
                    <AvatarFallback className={`text-lg ${delegate.contactType === 'organization' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {delegate.contactType === 'organization' ? <Building className="h-8 w-8" /> : initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{delegate.contactName}</h2>
                  <p className="text-gray-600 mt-1">{delegate.role}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant={delegate.membershipType === 'delegate' ? 'default' : 'secondary'}>
                      {delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State'}
                    </Badge>
                    <Badge variant={delegate.isActive ? 'default' : 'destructive'}>
                      {delegate.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {delegate.isNewsletterSubscribed && (
                      <Badge variant="outline">
                        <Bell className="h-3 w-3 mr-1" />
                        Newsletter
                      </Badge>
                    )}
                    {getLanguageIcon(delegate.language)}
                  </div>

                  {delegate.memberState && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <MapPin className="h-4 w-4" />
                      <span>{delegate.memberState}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Content */}
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            {/* Contact Details Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Addresses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {addresses.map((address, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <div className="font-medium text-sm text-gray-700">{address.type}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>{address.street}</div>
                          <div>{address.city}, {address.state} {address.postalCode}</div>
                          <div>{address.country}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Emails */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4" />
                      </div>
                    
                    </div>

                    {/* Phones */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4" />
                      </div>
                   
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Membership Periods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {membershipPeriods.map((period) => (
                      <div key={period.id} className={`border-l-4 pl-4 ${period.isActive ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{period.role}</div>
                            <div className="text-sm text-gray-600">{period.memberState}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(period.startDate)} - {period.endDate ? formatDate(period.endDate) : 'Present'}
                            </div>
                            {period.notes && (
                              <div className="text-xs text-gray-500 mt-1">{period.notes}</div>
                            )}
                          </div>
                          <Badge variant={period.isActive ? 'default' : 'secondary'}>
                            {period.isActive ? 'Current' : 'Former'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Event Participations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{event.name}</div>
                            <div className="text-sm text-gray-600">{event.city}, {event.country}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(event.startDate)} - {formatDate(event.endDate)}
                            </div>
                            {event.role && (
                              <div className="text-xs text-gray-500">Role: {event.role}</div>
                            )}
                          </div>
                          <div className="text-right">
                            {getEventStatusBadge(event.status)}
                            <div className="text-xs text-gray-500 mt-1">{event.year}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Relationships Tab */}
            <TabsContent value="relationships" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Department & Sector Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relationships.map((relationship) => (
                      <div key={relationship.id} className={`border-l-4 pl-4 ${relationship.isActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{relationship.department}</div>
                            <div className="text-sm text-gray-600">{relationship.sector}</div>
                            <div className="text-sm text-gray-700">{relationship.position}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(relationship.startDate)} - {relationship.endDate ? formatDate(relationship.endDate) : 'Present'}
                            </div>
                          </div>
                          <Badge variant={relationship.isActive ? 'default' : 'secondary'}>
                            {relationship.isActive ? 'Active' : 'Former'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Log Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityLog.map((log) => (
                      <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{log.action}</div>
                            <div className="text-sm text-gray-600">by {log.performedBy}</div>
                            {log.details && (
                              <div className="text-xs text-gray-500 mt-1">{log.details}</div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatDate(log.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
