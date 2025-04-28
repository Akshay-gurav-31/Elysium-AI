
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon, X } from "lucide-react";

// Define interfaces
interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

const AppointmentsSection = () => {
  const { user, patientData, addAppointment, cancelAppointment } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [appointmentNote, setAppointmentNote] = useState<string>("");
  
  // Sample doctors for booking appointments
  const availableDoctors: Doctor[] = [
    { id: "dr-smith", name: "Dr. Smith", specialization: "Psychiatrist" },
    { id: "dr-jones", name: "Dr. Jones", specialization: "Psychologist" },
    { id: "dr-williams", name: "Dr. Williams", specialization: "Therapist" }
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedDoctor) {
      toast({
        title: "Missing Information",
        description: "Please select a date and doctor.",
        variant: "destructive"
      });
      return;
    }
    
    const doctor = availableDoctors.find(doc => doc.id === selectedDoctor);
    
    if (!doctor) {
      toast({
        title: "Error",
        description: "Selected doctor not found.",
        variant: "destructive"
      });
      return;
    }
    
    const newAppointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      patientId: user?.id || "",
      doctorName: doctor.name,
      patientName: user?.name || "",
      date: selectedDate,
      status: 'scheduled' as const,
      notes: appointmentNote
    };
    
    addAppointment(newAppointment);
    
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${doctor.name} on ${format(selectedDate, 'MMMM dd, yyyy')} has been scheduled.`
    });
    
    // Reset form fields
    setSelectedDate(undefined);
    setSelectedDoctor("");
    setAppointmentNote("");
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled."
    });
  };

  return (
    <>
      <Card className="dark-card mb-6">
        <CardHeader>
          <CardTitle>Book New Appointment</CardTitle>
          <CardDescription className="text-gray-400">
            Schedule a consultation with a mental health professional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="doctor" className="text-gray-300 mb-2 block">Select Doctor</Label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 text-gray-300"
                >
                  <option value="">Select a doctor</option>
                  {availableDoctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label className="text-gray-300 mb-2 block">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-neutral-800 border-neutral-700 text-gray-300">
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
                <Label htmlFor="note" className="text-gray-300 mb-2 block">Additional Notes</Label>
                <Textarea
                  id="note"
                  value={appointmentNote}
                  onChange={(e) => setAppointmentNote(e.target.value)}
                  placeholder="Describe your concerns..."
                  className="dark-input resize-none"
                />
              </div>
            </div>
            
            <div className="space-y-4 bg-neutral-800 p-4 rounded-md border border-neutral-700">
              <h3 className="text-lg font-semibold text-gray-300">Appointment Summary</h3>
              {selectedDoctor ? (
                <div className="text-gray-400">
                  <p><span className="text-gray-300">Doctor:</span> {availableDoctors.find(doc => doc.id === selectedDoctor)?.name}</p>
                  {selectedDate && (
                    <p><span className="text-gray-300">Date:</span> {format(selectedDate, 'MMMM dd, yyyy')}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">Please select a doctor and date</p>
              )}
              
              <Button 
                className="mindful-btn-primary w-full mt-4"
                onClick={handleBookAppointment}
                disabled={!selectedDoctor || !selectedDate}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dark-card">
        <CardHeader>
          <CardTitle>Your Appointments</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your scheduled sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4 bg-neutral-700">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-600">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-blue-600">
                Past
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-600">
                Cancelled
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {patientData?.appointments && patientData.appointments.filter(apt => apt.status === 'scheduled').length > 0 ? (
                <div className="space-y-4">
                  {patientData.appointments
                    .filter(apt => apt.status === 'scheduled')
                    .map((appointment) => (
                      <Card key={appointment.id} className="bg-neutral-800 border-neutral-700">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium">{appointment.doctorName}</h4>
                              <p className="text-gray-400 text-sm">{format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
                              {appointment.notes && (
                                <p className="text-gray-400 mt-2 text-sm italic">{appointment.notes}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge className="bg-green-800 text-white">Scheduled</Badge>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-400 border-red-800 hover:bg-red-950 hover:text-red-300"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X size={16} className="mr-1" /> Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">You don't have any upcoming appointments.</p>
                  <Button className="mindful-btn-primary">Book an Appointment</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {patientData?.appointments && patientData.appointments.filter(apt => apt.status === 'completed').length > 0 ? (
                <div className="space-y-4">
                  {patientData.appointments
                    .filter(apt => apt.status === 'completed')
                    .map((appointment) => (
                      <Card key={appointment.id} className="bg-neutral-800 border-neutral-700">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium">{appointment.doctorName}</h4>
                              <p className="text-gray-400 text-sm">{format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
                              {appointment.notes && (
                                <p className="text-gray-400 mt-2 text-sm">{appointment.notes}</p>
                              )}
                            </div>
                            <Badge className="bg-blue-800 text-white">Completed</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No past appointments found.</p>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled">
              {patientData?.appointments && patientData.appointments.filter(apt => apt.status === 'cancelled').length > 0 ? (
                <div className="space-y-4">
                  {patientData.appointments
                    .filter(apt => apt.status === 'cancelled')
                    .map((appointment) => (
                      <Card key={appointment.id} className="bg-neutral-800 border-neutral-700">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium">{appointment.doctorName}</h4>
                              <p className="text-gray-400 text-sm">{format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
                              {appointment.notes && (
                                <p className="text-gray-400 mt-2 text-sm">{appointment.notes}</p>
                              )}
                            </div>
                            <Badge className="bg-red-800 text-white">Cancelled</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No cancelled appointments found.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default AppointmentsSection;