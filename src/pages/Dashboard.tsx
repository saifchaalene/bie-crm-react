import { StatsCard } from "@/components/StatsCard"
import { ContactCard, Contact } from "@/components/ContactCard"
import { EventCard, Event } from "@/components/EventCard"
import { DelegateCard } from "@/components/DelegateCard"
import { Users, Calendar, Building, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Delegate } from "@/types/delegate"

export default function Dashboard() {
  // Mock data - in a real app, this would come from your backend
  const stats = {
    totalContacts: 247,
    individuals: 198,
    organizations: 49,
    upcomingEvents: 12,
    activeDelegates: 15,
    activeMemberStates: 8
  }

  const recentContacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'individual',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      organization: 'Tech Solutions Inc',
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
      eventsCount: 3,
      lastContact: '3 days ago'
    }
  ]

  const upcomingEvents: Event[] = [
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
    }
  ]

  const recentDelegates: Delegate[] = [
    {
      id: '1',
      contactId: '1',
      contactName: 'Sarah Johnson',
      contactType: 'individual',
      startDate: '2024-11-15',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'California',
      isNewsletterSubscribed: true,
      role: 'Senior Delegate',
      emails: ['sarah.johnson@email.com'],
      phones: ['+1 (555) 123-4567'],
      notes: [
        {
          id: '1',
          text: 'Excellent communication skills',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
          id: '2',
          text: 'Very responsive to emails',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        }
      ],
      language: 'English'
    },
    {
      id: '2',
      contactId: '2',
      contactName: 'Global Corp',
      contactType: 'organization',
      startDate: '2024-11-10',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: false,
      emails: ['contact@globalcorp.com'],
      phones: ['+1 (555) 987-6543'],
      language: 'English'
    },
    {
      id: '3',
      contactId: '3',
      contactName: 'Emma Wilson',
      contactType: 'individual',
      startDate: '2024-11-05',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'New York',
      isNewsletterSubscribed: true,
      role: 'Policy Advisor',
      emails: ['emma.wilson@gov.ny.us', 'e.wilson@personal.com'],
      phones: ['+1 (555) 456-7890'],
      notes: [
        {
          id: '3',
          text: 'Specializes in environmental policy',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
        }
      ],
      language: 'English'
    },
    {
      id: '4',
      contactId: '4',
      contactName: 'Innovation Labs',
      contactType: 'organization',
      startDate: '2024-11-01',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: true,
      emails: ['info@innovationlabs.com'],
      phones: ['+1 (555) 234-5678', '+1 (555) 234-5679'],
      language: 'French'
    },
    {
      id: '5',
      contactId: '5',
      contactName: 'John Smith',
      contactType: 'individual',
      startDate: '2024-10-28',
      isActive: true,
      membershipType: 'delegate',
      memberState: 'Texas',
      isNewsletterSubscribed: false,
      role: 'Trade Representative',
      emails: ['john.smith@texas.gov'],
      phones: ['+1 (555) 345-6789'],
      language: 'English'
    },
    {
      id: '6',
      contactId: '6',
      contactName: 'Future Systems',
      contactType: 'organization',
      startDate: '2024-10-25',
      isActive: true,
      membershipType: 'member_state',
      isNewsletterSubscribed: true,
      emails: ['contact@futuresystems.com', 'support@futuresystems.com'],
      phones: ['+1 (555) 567-8901'],
      language: 'French'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your contacts and events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatsCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={Users}
          description="All contacts in your CRM"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Individuals"
          value={stats.individuals}
          icon={UserCheck}
          description="Individual contacts"
        />
        <StatsCard
          title="Organizations"
          value={stats.organizations}
          icon={Building}
          description="Company contacts"
        />
        <StatsCard
          title="Current Delegates"
          value={stats.activeDelegates}
          icon={UserCheck}
          description="Active individual delegates"
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Member States"
          value={stats.activeMemberStates}
          icon={Building}
          description="Active member organizations"
          trend={{ value: 1, isPositive: true }}
        />
        <StatsCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={Calendar}
          description="Events this month"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={(contact) => console.log('Edit contact:', contact)}
                onViewEvents={(contact) => console.log('View events for:', contact)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={(event) => console.log('Edit event:', event)}
                onViewParticipants={(event) => console.log('View participants for:', event)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Recent Delegate Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Recent Memberships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {recentDelegates.map((delegate) => (
              <DelegateCard
                key={delegate.id}
                delegate={delegate}
                onEndMembership={(delegate) => console.log('End membership for:', delegate)}
                onViewContact={(delegate) => console.log('View contact for:', delegate)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
