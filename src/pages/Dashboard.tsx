
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIChatTab from "@/components/dashboard/AIChatTab";
import FindDoctorTab from "@/components/dashboard/FindDoctorTab";
import AppointmentsTab from "@/components/dashboard/AppointmentsTab";
import { mockDoctors, mockAppointments } from "@/components/dashboard/mockData";
import { ConsultationType } from "@/components/dashboard/FindDoctorTab";

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

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />
          
          <Tabs defaultValue="ai-chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="ai-chat" className="mt-0">
              <AIChatTab 
                assessmentCompleted={assessmentCompleted}
                assessmentSeverity={assessmentSeverity}
                onCompleteAssessment={handleAssessmentComplete}
                onFindSupport={() => setActiveTab('find-doctor')}
              />
            </TabsContent>
            
            <TabsContent value="find-doctor" className="mt-0">
              <FindDoctorTab 
                doctors={mockDoctors}
                selectedDoctor={selectedDoctor}
                consultationType={consultationType}
                showAppointmentForm={showAppointmentForm}
                onBookAppointment={handleBookAppointment}
                onAppointmentSubmit={handleAppointmentSubmit}
                onCancelAppointment={() => setShowAppointmentForm(false)}
              />
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-0">
              <AppointmentsTab 
                appointments={appointments}
                onScheduleNew={() => setActiveTab('find-doctor')}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
