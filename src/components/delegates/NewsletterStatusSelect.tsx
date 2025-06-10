
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail } from "lucide-react"

interface NewsletterStatusSelectProps {
  selectedNewsletterStatus: string
  setSelectedNewsletterStatus: (value: string) => void
}

export function NewsletterStatusSelect({ 
  selectedNewsletterStatus, 
  setSelectedNewsletterStatus 
}: NewsletterStatusSelectProps) {
  return (
    <Select value={selectedNewsletterStatus} onValueChange={setSelectedNewsletterStatus}>
      <SelectTrigger className="w-full sm:w-[300px]">
        <Mail className="h-4 w-4 mr-2 shrink-0" />
        <SelectValue placeholder="Newsletter Status" className="text-left" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all_newsletter">All Newsletter Status</SelectItem>
        <SelectItem value="subscribed">Subscribed</SelectItem>
        <SelectItem value="not_subscribed">Not Subscribed</SelectItem>
      </SelectContent>
    </Select>
  )
}
