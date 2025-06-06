import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building,
  Calendar,
  CalendarOff,
  MapPin,
  Mail,
  Phone,
  FileText,
  Bell,
  StickyNote
} from "lucide-react"
import { Delegate, DelegateNote } from "@/types/delegate"
import { useEffect, useState } from "react"
import { NotesModal } from "@/components/NotesModal"
import { DelegateProfile } from "@/components/DelegateProfile"
import { DelegatesService } from "@/services/delegatesService"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const [notes, setNotes] = useState<DelegateNote[]>([])
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedNotes = await DelegatesService.getNotesByDelegateId(delegate.id)
        setNotes(fetchedNotes)
      } catch (error) {
        console.error(" Error loading delegate notes:", error)
      }
    }
    fetchDetails()
  }, [delegate.id])

  const hasRecentNotes = notes.some(note => {
    const noteDate = new Date(note.createdAt || note.modified_date || note.created_date)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return noteDate > sevenDaysAgo
  })

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ')
    return parts.map(part => part[0].toUpperCase()).join('').slice(0, 2)
  }

  const initials = getInitials(`${delegate.first_name} ${delegate.last_name}`)
  const isActive = !delegate.end_date
  const hasNewsletter = true

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—"
    const [day, month, year] = dateString.split("/")
    return new Date(`${year}-${month}-${day}`).toLocaleDateString()
  }

  const extractEmails = (htmlString: string): string[] => {
    const div = document.createElement("div")
    div.innerHTML = htmlString
    return Array.from(div.querySelectorAll("a")).map(a => a.textContent || "")
  }

  const extractPhones = (htmlString: string): string[] => {
    return htmlString.split("<br/>").map(phone => phone.trim()).filter(Boolean)
  }

  const handleViewContact = () => {
    setIsProfileModalOpen(true)
    onViewContact?.(delegate)
  }

  const handleAddNote = (noteText: string) => {
    // To be implemented
  }

  const getLanguageIcon = (language?: string) => {
    const lang = language?.toLowerCase()

    if (lang === 'fr' || lang === 'fr_fr' || lang === 'french') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600" title="French">
          <div className="w-4 h-3 flex">
            <div className="w-1/3 bg-blue-600 rounded-l" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-red-600 rounded-r" />
          </div>
          <span className="text-xs">FR</span>
        </div>
      )
    }

    if (lang === 'en' || lang === 'en_us' || lang === 'english') {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-600" title="English">
          <span className="text-lg">🇬🇧</span>
          <span className="text-xs">EN</span>
        </div>
      )
    }

    return null
  }

  const emails = extractEmails(delegate.mails || "")
  const phones = extractPhones(delegate.phones || "")

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
            {notes.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotesModalOpen(true)}
                  className="h-8 w-8 p-0"
                  title={`${notes.length} notes`}
                >
                  <StickyNote className={`h-4 w-4 ${hasRecentNotes ? 'text-blue-600' : 'text-gray-400'}`} />
                </Button>
                <Badge 
                  variant={hasRecentNotes ? "default" : "secondary"} 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notes.length}
                </Badge>
                {hasRecentNotes && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                )}
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

          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
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

          <div className="space-y-2">
            {emails.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-3 w-3" />
                  <span>Email{emails.length > 1 ? 's' : ''}</span>
                </div>
                {emails.map((email, index) => (
                  <div key={index} className="text-xs text-gray-600 ml-5 truncate">
                    {email}
                  </div>
                ))}
              </div>
            )}

            {phones.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-3 w-3" />
                  <span>Phone{phones.length > 1 ? 's' : ''}</span>
                </div>
                {phones.map((phone, index) => (
                  <div key={index} className="text-xs text-gray-600 ml-5">
                    {phone}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={() => setIsNotesModalOpen(true)}>
            <StickyNote className="h-3 w-3 mr-2" /> Add Note
          </Button>

          <div className="flex gap-2 pt-2 mt-auto flex-wrap">
            <Button variant="default" size="sm" onClick={handleViewContact} className="flex-1 min-w-[120px]">
              View Contact
            </Button>
            {isActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEndMembership?.(delegate)}
                className="flex-1 min-w-[120px] border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
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
        notes={notes}
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
