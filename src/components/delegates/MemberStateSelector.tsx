
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
import { Filter, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemberStateSelectorProps {
  selectedMemberState: string
  setSelectedMemberState: (value: string) => void
  memberStates: string[]
}

export function MemberStateSelector({ 
  selectedMemberState, 
  setSelectedMemberState, 
  memberStates 
}: MemberStateSelectorProps) {
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

  return (
    <Popover open={memberStateOpen} onOpenChange={setMemberStateOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={memberStateOpen}
          className="w-full sm:w-[300px] justify-between"
        >
          <div className="flex items-center min-w-0">
            <Filter className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate text-sm text-left">
              {getDisplayValue(selectedMemberState)}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0">
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
  )
}
