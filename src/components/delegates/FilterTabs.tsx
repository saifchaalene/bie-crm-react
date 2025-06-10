
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilterTabsProps {
  activeTab: string
  setActiveTab: (value: string) => void
}

export function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
  return (
    <div className="flex justify-center sm:justify-start lg:justify-end">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-none sm:flex">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">Current</TabsTrigger>
          <TabsTrigger value="inactive" className="text-xs sm:text-sm">Former</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
