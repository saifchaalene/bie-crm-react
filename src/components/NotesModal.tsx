import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { DelegateNote } from "@/types/delegate";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  delegateName: string;
  notes: DelegateNote[];
  onAddNote: (noteText: string) => void;
}

export function NotesModal({
  isOpen,
  onClose,
  delegateName,
  notes,
  onAddNote,
}: NotesModalProps) {
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      onAddNote(newNoteText.trim());
      setNewNoteText("");
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString.replace(" ", "T"));
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  };

  const isRecentNote = (dateString: string) => {
    const date = new Date(dateString.replace(" ", "T"));
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date > sevenDaysAgo;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Notes for {delegateName}
            <Badge variant="secondary">{notes.length}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add new note section */}
          <div className="space-y-2">
            <h4 className="font-medium">Add New Note</h4>
            <Textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Add a note about this delegate..."
              className="min-h-[80px]"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Date: {new Date().toLocaleString()}
              </span>
              <Button
                onClick={handleAddNote}
                disabled={!newNoteText.trim()}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>

          <Separator />

          {/* Existing notes */}
          <div className="space-y-2">
            <h4 className="font-medium">Previous Notes</h4>
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No notes yet
              </p>
            ) : (
              <ScrollArea className="h-[300px] w-full">
                <div className="space-y-3">
                  {notes
                    .sort(
                      (a, b) =>
                        new Date(b.modified_date.replace(" ", "T")).getTime() -
                        new Date(a.modified_date.replace(" ", "T")).getTime()
                    )
                    .map((note) => (
                      <div
                        key={note.id}
                        className="p-3 bg-gray-50 rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatDateTime(note.modified_date)}
                          </span>
                          {isRecentNote(note.modified_date) && (
                            <Badge variant="default" className="text-xs">
                              Recent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-line">{note.note}</p>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}