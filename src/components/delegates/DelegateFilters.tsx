
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowUpDown, Filter, Mail, Check, ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DelegateFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  selectedMemberState: string
  setSelectedMemberState: (value: string) => void
  selectedNewsletterStatus: string
  setSelectedNewsletterStatus: (value: string) => void
  activeTab: string
  setActiveTab: (value: string) => void
  memberStates: string[]
}

export function DelegateFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedMemberState,
  setSelectedMemberState,
  selectedNewsletterStatus,
  setSelectedNewsletterStatus,
  activeTab,
  setActiveTab,
  memberStates
}: DelegateFiltersProps) {
  const [memberStateOpen, setMemberStateOpen] = useState(false)

  // Function to normalize text for search (handles accented characters)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  const getDisplayValue = (value: string) => {
    if (value === "all_states") return "All Member States"
    return value
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setSelectedMemberState("all_states")
    setSelectedNewsletterStatus("all_newsletter")
    setActiveTab("all")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search delegates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name_asc">Name A-Z</SelectItem>
                <SelectItem value="name_desc">Name Z-A</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover open={memberStateOpen} onOpenChange={setMemberStateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={memberStateOpen}
                  className="w-[200px] justify-between"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {getDisplayValue(selectedMemberState)}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command
                  filter={(value, search) => {
                    const normalizedValue = normalizeText(value)
                    const normalizedSearch = normalizeText(search)
                    return normalizedValue.includes(normalizedSearch) ? 1 : 0
                  }}
                >
                  <CommandInput placeholder="Search member states..." />
                  <CommandList>
                    <CommandEmpty>No member state found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="all_states"
                        onSelect={() => {
                          setSelectedMemberState("all_states")
                          setMemberStateOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMemberState === "all_states" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        All Member States
                      </CommandItem>
                      {memberStates.map((state) => (
                        <CommandItem
                          key={state}
                          value={state}
                          onSelect={() => {
                            setSelectedMemberState(state)
                            setMemberStateOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedMemberState === state ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {state}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Select value={selectedNewsletterStatus} onValueChange={setSelectedNewsletterStatus}>
              <SelectTrigger className="w-[200px]">
                <Mail className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Newsletter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_newsletter">All Newsletter Status</SelectItem>
                <SelectItem value="subscribed">Subscribed</SelectItem>
                <SelectItem value="not_subscribed">Not Subscribed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Current</TabsTrigger>
                <TabsTrigger value="inactive">Former</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
