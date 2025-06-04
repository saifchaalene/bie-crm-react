
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, Download } from "lucide-react"
import { Delegate } from "@/types/delegate"
import { exportDelegatesToExcel } from "@/utils/excelExport"
import { useToast } from "@/hooks/use-toast"

interface DelegateExportActionsProps {
  selectedDelegates: Set<string>
  filteredDelegates: Delegate[]
  selectMode: boolean
}

export function DelegateExportActions({ 
  selectedDelegates, 
  filteredDelegates, 
  selectMode 
}: DelegateExportActionsProps) {
  const { toast } = useToast()

  const handleExportFiltered = () => {
    exportDelegatesToExcel(filteredDelegates, 'filtered_delegates')
    toast({
      title: "Export Successful",
      description: `Exported ${filteredDelegates.length} delegates to Excel file`,
    })
  }

  const handleExportSelected = () => {
    const selectedDelegateData = filteredDelegates.filter(d => selectedDelegates.has(d.id))
    if (selectedDelegateData.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select delegates to export",
        variant: "destructive"
      })
      return
    }
    exportDelegatesToExcel(selectedDelegateData, 'selected_delegates')
    toast({
      title: "Export Successful",
      description: `Exported ${selectedDelegateData.length} selected delegates to Excel file`,
    })
  }

  if (!selectMode && selectedDelegates.size === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedDelegates.size} delegate{selectedDelegates.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportSelected} disabled={selectedDelegates.size === 0}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Selected ({selectedDelegates.size})
            </Button>
            <Button variant="outline" onClick={handleExportFiltered}>
              <Download className="h-4 w-4 mr-2" />
              Export All Filtered ({filteredDelegates.length})
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
