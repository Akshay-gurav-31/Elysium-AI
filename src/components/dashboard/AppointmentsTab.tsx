
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Phone, Video } from "lucide-react";
import { format } from "date-fns";
import { ConsultationType } from "./FindDoctorTab";

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImage?: string;
  date: Date;
  timeSlot: string;
  consultationType: ConsultationType;
  status: string;
}

interface AppointmentsTabProps {
  appointments: Appointment[];
  onScheduleNew: () => void;
}

const AppointmentsTab = ({ appointments, onScheduleNew }: AppointmentsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Appointments</h2>
        <Button onClick={onScheduleNew}>
          Schedule New
        </Button>
      </div>
      
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <div className="bg-primary h-2"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{appointment.doctorName}</CardTitle>
                    <CardDescription>
                      {format(new Date(appointment.date), "EEEE, MMMM d")} at {appointment.timeSlot}
                    </CardDescription>
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                    {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  {appointment.consultationType === 'chat' && (
                    <MessageCircle className="h-4 w-4" />
                  )}
                  {appointment.consultationType === 'video' && (
                    <Video className="h-4 w-4" />
                  )}
                  {appointment.consultationType === 'phone' && (
                    <Phone className="h-4 w-4" />
                  )}
                  <span>{appointment.consultationType.charAt(0).toUpperCase() + appointment.consultationType.slice(1)} consultation</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Reschedule</Button>
                  <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Appointments Yet</h3>
            <p className="text-center text-muted-foreground mb-4">
              You haven't scheduled any appointments with our mental health professionals.
            </p>
            <Button onClick={onScheduleNew}>
              Schedule Your First Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentsTab;
