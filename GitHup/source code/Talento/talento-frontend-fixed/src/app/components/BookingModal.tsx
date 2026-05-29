import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Clock } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  skill: string;
  onConfirm?: (date: Date, time: string) => void;
}

export function BookingModal({ open, onClose, userName, skill, onConfirm }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime && onConfirm) {
      onConfirm(selectedDate, selectedTime);
      setSelectedTime("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Session with {userName}</DialogTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Learning: {skill} · Costs 10 credits
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <Label className="mb-3 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div>
            <Label className="mb-3 block">Select Time</Label>
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? "bg-[var(--primary)] text-[var(--navy)] border-[var(--primary)]"
                      : "border-[var(--border)] hover:border-[var(--primary)]"
                  }`}
                >
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!selectedDate || !selectedTime}
            onClick={handleConfirm}
            className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]"
          >
            Confirm Booking (−10 credits)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
