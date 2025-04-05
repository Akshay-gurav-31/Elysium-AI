
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface AppointmentFormProps {
  doctorId?: string;
  doctorName?: string;
  consultationType?: 'chat' | 'video' | 'phone';
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const AppointmentForm = ({
  doctorId,
  doctorName = "Dr. Smith",
  consultationType = 'chat',
  onSubmit,
  onCancel
}: AppointmentFormProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  // Mock available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    const appointmentData = {
      doctorId,
      doctorName,
      date,
      timeSlot,
      consultationType,
      reason,
      createdAt: new Date(),
      status: 'pending'
    };
    
    if (onSubmit) {
      onSubmit(appointmentData);
    } else {
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment is set for ${format(date, "EEEE, MMMM d")} at ${timeSlot}`,
      });
    }
  };

  const getConsultationTypeLabel = () => {
    switch (consultationType) {
      case 'chat': return 'Chat Consultation';
      case 'video': return 'Video Consultation';
      case 'phone': return 'Phone Consultation';
      default: return 'Consultation';
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Schedule an Appointment</CardTitle>
          <CardDescription>
            Book a {getConsultationTypeLabel().toLowerCase()} with {doctorName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                    date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Select Time</Label>
            <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <div key={slot}>
                  <RadioGroupItem
                    value={slot}
                    id={`time-${slot}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`time-${slot}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {slot}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Consultation</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe your concerns..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Schedule Appointment</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AppointmentForm;
