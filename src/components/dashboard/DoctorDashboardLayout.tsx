
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileSidebar from "./ProfileSidebar";
import DoctorProfileSection from "./DoctorProfileSection";
import DoctorPatientsSection from "./DoctorPatientsSection";
import DoctorAppointmentsSection from "./DoctorAppointmentsSection";
import DoctorRequestsSection from "./DoctorRequestsSection";

const DoctorDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="profile">
            <DoctorProfileSection />
          </TabsContent>
          
          <TabsContent value="appointments">
            <DoctorAppointmentsSection />
          </TabsContent>
          
          <TabsContent value="requests">
            <DoctorRequestsSection />
          </TabsContent>
          
          <TabsContent value="patients">
            <DoctorPatientsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;