

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";

const DoctorAppointmentsSection = () => {
  const { user, doctorData } = useAuth();
  const { toast } = useToast();
  
  const [myPatients, setMyPatients] = useState<any[]>([
    {
      id: "p789",
      name: "Michael Brown",
      contactInfo: "michael.b@example.com",
      lastVisit: new Date(Date.now() - 259200000),
      notes: "Patient showing signs of improvement with current medication.",
      status: 'active'
    }
  ]);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [appointmentNote, setAppointmentNote] = useState<string>("");
  
  const [appointments, setAppointments] = useState<any[]>(
    doctorData?.appointments || []
  );

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedPatient) {
      toast({
        title: "Missing Information",
        description: "Please select a date and patient.",
        variant: "destructive"
      });
      return;
    }
    
    const patient = myPatients.find(pat => pat.id === selectedPatient);
    
    if (!patient) {
      toast({
        title: "Error",
        description: "Selected patient not found.",
        variant: "destructive"
      });
      return;
    }
    
    const newAppointment = {
      id: `apt-${Date.now()}`,
      doctorId: user?.id || "",
      patientId: patient.id,
      doctorName: user?.name || "",
      patientName: patient.name,
      date: selectedDate,
      status: 'scheduled' as const,
      notes: appointmentNote
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    setMyPatients(prev => 
      prev.map(pat => 
        pat.id === patient.id ? {...pat, lastVisit: selectedDate} : pat
      )
    );
    
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${patient.name} on ${format(selectedDate, 'MMMM dd, yyyy')} has been scheduled.`
    });
    
    setSelectedDate(undefined);
    setSelectedPatient("");
    setAppointmentNote("");
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? {...apt, status: 'cancelled'} : apt
      )
    );
    
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been cancelled."
    });
  };
  
  const handleCompleteAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? {...apt, status: 'completed'} : apt
      )
    );
    
    toast({
      title: "Appointment Completed",
      description: "The appointment has been marked as completed."
    });
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  return (
    <>
      <Card className="dark-card bg-neutral-800 border-neutral-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Schedule Appointment</CardTitle>
          <CardDescription className="text-gray-400">
            Create a new appointment with one of your patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient" className="text-gray-300 mb-2 block">Select Patient</Label>
                <select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-2 text-white"
                >
                  <option value="">Select a patient</option>
                  {myPatients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label className="text-gray-300 mb-2 block">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-neutral-700 border-neutral-600 text-white">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-neutral-800 border-neutral-700 text-white">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="appointmentNote" className="text-gray-300 mb-2 block">Session Notes</Label>
                <Textarea
                  id="appointmentNote"
                  value={appointmentNote}
                  onChange={(e) => setAppointmentNote(e.target.value)}
                  placeholder="Enter any notes for this appointment..."
                  className="bg-neutral-700 border-neutral-600 text-white resize-none"
                />
              </div>
            </div>
            
            <div className="space-y-4 bg-neutral-700 p-4 rounded-md border border-neutral-600">
              <h3 className="text-lg font-semibold text-white">Appointment Summary</h3>
              {selectedPatient ? (
                <div className="text-gray-300">
                  <p><span className="text-white">Patient:</span> {myPatients.find(pat => pat.id === selectedPatient)?.name}</p>
                  {selectedDate && (
                    <p><span className="text-white">Date:</span> {format(selectedDate, 'MMMM dd, yyyy')}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">Please select a patient and date</p>
              )}
              
              <Button 
                className="bg-mindful-primary hover:bg-mindful-secondary text-white w-full mt-4"
                onClick={handleScheduleAppointment}
                disabled={!selectedPatient || !selectedDate}
              >
                Schedule Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    
      <Card className="dark-card bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Appointments</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your scheduled appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.filter(apt => apt.status === 'scheduled').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No upcoming appointments scheduled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments
                .filter(apt => apt.status === 'scheduled')
                .map(appointment => (
                  <Card key={appointment.id} className="bg-neutral-700 border-neutral-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{appointment.patientName}</h4>
                          <p className="text-gray-300 text-sm">{formatDate(new Date(appointment.date))}</p>
                          {appointment.notes && (
                            <p className="text-gray-400 mt-2 text-sm italic">{appointment.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-800 text-white">Upcoming</Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-400 border-red-800 hover:bg-red-950 hover:text-red-300"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            <X size={16} className="mr-1" /> Cancel
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-green-700 hover:bg-green-600 text-white"
                            onClick={() => handleCompleteAppointment(appointment.id)}
                          >
                            <Check size={16} className="mr-1" /> Complete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default DoctorAppointmentsSection;
