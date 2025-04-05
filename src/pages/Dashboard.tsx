
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Phone, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import ChatInterface from "@/components/chat/ChatInterface";
import DoctorCard from "@/components/doctors/DoctorCard";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Define the consultation type at the top level to ensure consistency
type ConsultationType = 'chat' | 'video' | 'phone';

// Mock data
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    rating: 4.9,
    experience: 8,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    availability: "Available today",
    badges: ["Anxiety", "Depression", "Trauma"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    rating: 4.7,
    experience: 12,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    availability: "Next available: Tomorrow",
    badges: ["Medication", "ADHD", "Bipolar Disorder"]
  },
  {
    id: "3",
    name: "Dr. Emma Rodriguez",
    specialty: "Therapist",
    rating: 4.8,
    experience: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    availability: "Available today",
    badges: ["Stress", "Relationships", "Self-esteem"]
  }
];

// Mock upcoming appointments
const mockAppointments = [
  {
    id: "101",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: new Date(Date.now() + 86400000 * 2),
    timeSlot: "10:00 AM",
    consultationType: "video" as ConsultationType,
    status: "confirmed"
  },
];

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("ai-chat");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<ConsultationType>('chat');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentSeverity, setAssessmentSeverity] = useState<'low' | 'medium' | 'high'>('low');
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleAssessmentComplete = (severity: 'low' | 'medium' | 'high', details: string) => {
    setAssessmentCompleted(true);
    setAssessmentSeverity(severity);
    
    toast({
      title: "Assessment Complete",
      description: severity === 'high' 
        ? "We recommend speaking with a professional right away." 
        : "We've analyzed your responses and can connect you with support.",
    });
    
    if (severity !== 'low') {
      setActiveTab('find-doctor');
    }
  };

  const handleBookAppointment = (doctorId: string, type: ConsultationType) => {
    setSelectedDoctor(doctorId);
    setConsultationType(type);
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = (data: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...data
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentForm(false);
    
    toast({
      title: "Appointment Scheduled",
      description: `Your ${data.consultationType} appointment has been booked successfully.`,
    });
    
    setActiveTab('appointments');
  };

  const doctor = mockDoctors.find(doc => doc.id === selectedDoctor);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <section>
            <h1 className="text-3xl font-bold text-forest-dark mb-2">Your Mental Health Journey</h1>
            <p className="text-muted-foreground">Get support, track progress, and connect with professionals.</p>
          </section>
          
          <Tabs defaultValue="ai-chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="ai-chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>AI Chat</span>
              </TabsTrigger>
              <TabsTrigger value="find-doctor" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m16 6 4 14"/>
                  <path d="M12 6v14"/>
                  <path d="M8 8v12"/>
                  <path d="M4 4v16"/>
                </svg>
                <span>Find Support</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-chat" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ChatInterface onCompleteAssessment={handleAssessmentComplete} />
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Assessment</CardTitle>
                      <CardDescription>
                        Our AI will analyze your responses to help determine the best support for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status:</span>
                          <Badge variant={assessmentCompleted ? "default" : "outline"}>
                            {assessmentCompleted ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        
                        {assessmentCompleted && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Priority Level:</span>
                              <Badge 
                                variant="outline" 
                                className={
                                  assessmentSeverity === 'high' ? "border-red-500 text-red-500" :
                                  assessmentSeverity === 'medium' ? "border-amber-500 text-amber-500" :
                                  "border-green-500 text-green-500"
                                }
                              >
                                {assessmentSeverity === 'high' ? "High" : 
                                 assessmentSeverity === 'medium' ? "Medium" : "Low"}
                              </Badge>
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                onClick={() => setActiveTab('find-doctor')}
                                className="w-full"
                              >
                                Find Professional Support
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="rounded-lg bg-muted p-4 text-sm">
                        <h4 className="font-medium mb-2">How this works</h4>
                        <p className="text-muted-foreground">
                          Our AI assistant will ask you questions to understand your concerns. 
                          Based on your responses, we'll determine the best support options for you.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="find-doctor">
              {showAppointmentForm && doctor ? (
                <div className="max-w-md mx-auto">
                  <AppointmentForm 
                    doctorId={doctor.id}
                    doctorName={doctor.name}
                    consultationType={consultationType}
                    onSubmit={handleAppointmentSubmit}
                    onCancel={() => setShowAppointmentForm(false)}
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Available Mental Health Professionals</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockDoctors.map((doctor) => (
                      <DoctorCard 
                        key={doctor.id} 
                        doctor={doctor}
                        onBook={handleBookAppointment}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Appointments</h2>
                  <Button onClick={() => setActiveTab('find-doctor')}>
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
                      <Button onClick={() => setActiveTab('find-doctor')}>
                        Schedule Your First Appointment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
