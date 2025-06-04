

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building, Calendar, CalendarOff, MapPin, Mail, Phone, FileText, Bell, Globe, StickyNote } from "lucide-react"
import { Delegate, DelegateNote } from "@/types/delegate"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { NotesModal } from "@/components/NotesModal"
import { DelegateProfile } from "@/components/DelegateProfile"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

// Assume types are already imported
export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const initials = delegate.fullname
  

  const formatDate = (dateString?: string) => dateString ? new Date(dateString).toLocaleDateString() : "—"

  const handleViewContact = () => setIsProfileModalOpen(true)
const handleAddNote = (noteText: string) => {

}


  const getLanguageIcon = (language?: string) => {
    if (language?.toLowerCase() === 'french') {
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
        <div className="w-4 h-3 bg-blue-600 rounded"></div>
        <span className="text-xs">EN</span>
      </div>
    )
  }

  const notesCount = 0
  const isActive = !delegate.end_date
  const hasNewsletter = 3  // simulate subscription

  return (
    <>
      <Card className="hover:shadow-lg transition-all flex flex-col h-full w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-700">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 truncate">{delegate.fullname}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLanguageIcon(delegate.preferred_language)}
                <Badge className="text-xs">Delegate</Badge>
                <Badge variant={isActive ? 'default' : 'destructive'} className="text-xs">
                  {isActive ? 'Current' : 'Former'}
                </Badge>
                {hasNewsletter && (
                  <Badge variant="outline" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" /> Newsletter
                  </Badge>
                )}
              </div>
            </div>
            {notesCount > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotesModalOpen(true)}
                  className="h-8 w-8 p-0"
                >
                  <StickyNote className="h-4 w-4 text-gray-500" />
                </Button>
                <Badge className="absolute -top-1 -right-1 text-[10px]">{notesCount}</Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 flex flex-col">
          {delegate.country && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{delegate.country}</span>
            </div>
          )}
          {delegate.job_title && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-3 w-3" />
              <span>{delegate.job_title}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>Started: {formatDate(delegate.start_date)}</span>
            {delegate.end_date && (
              <>
                <span className="mx-2">•</span>
                <CalendarOff className="h-3 w-3" />
                <span>Ended: {formatDate(delegate.end_date)}</span>
              </>
            )}
          </div>

          {delegate.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3" />
              <span className="text-gray-600">{delegate.email}</span>
            </div>
          )}
          {delegate.phones && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3" />
              <span className="text-gray-600">{delegate.phones}</span>
            </div>
          )}

          {notesCount === 0 && (
            <Button variant="ghost" size="sm" onClick={() => setIsNotesModalOpen(true)}>
              <StickyNote className="h-3 w-3 mr-2" /> Add Notes
            </Button>
          )}

          <div className="flex gap-2 pt-2 mt-auto">
            <Button variant="default" size="sm" onClick={handleViewContact} className="flex-1">
              View Contact
            </Button>
            {isActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEndMembership?.(delegate)}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Denounce
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        delegateName={delegate.fullname}
        notes={[]} // No backend note objects for now
        onAddNote={handleAddNote}
      />

      <DelegateProfile
        delegate={delegate}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
}

