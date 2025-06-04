
import { useState } from "react"
import { ContactCard, Contact } from "@/components/ContactCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Users, Building } from "lucide-react"

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data - in a real app, this would come from your backend
  const contacts: Contact[] = [
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
    },
    {
      id: '6',
      name: 'David Rodriguez',
      type: 'individual',
      email: 'david.r@consulting.com',
      phone: '+1 (555) 369-2580',
      organization: 'Rodriguez Consulting',
      location: 'Miami, FL',
      eventsCount: 7,
      lastContact: '4 days ago'
    }
  ]

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || contact.type === activeTab
    return matchesSearch && matchesTab
  })

  const individualContacts = contacts.filter(c => c.type === 'individual')
  const organizationContacts = contacts.filter(c => c.type === 'organization')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-2">Manage your individual and organization contacts</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Individuals</p>
                <p className="text-2xl font-bold">{individualContacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Organizations</p>
                <p className="text-2xl font-bold">{organizationContacts.length}</p>
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
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="individual">Individuals</TabsTrigger>
                <TabsTrigger value="organization">Organizations</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
          </h2>
          {activeTab !== 'all' && (
            <Badge variant="secondary">
              {activeTab === 'individual' ? 'Individuals' : 'Organizations'}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={(contact) => console.log('Edit contact:', contact)}
              onViewEvents={(contact) => console.log('View events for:', contact)}
            />
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms or filters"
                  : "Get started by adding your first contact"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
