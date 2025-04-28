
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "./ProfileSection";
import AppointmentsSection from "./AppointmentsSection";
import MedicalHistorySection from "./MedicalHistorySection";
import MedicalRecordsSection from "./MedicalRecordsSection";
import SettingsSection from "./SettingsSection";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-6 bg-neutral-800">
        <TabsTrigger value="profile" className="data-[state=active]:bg-mindful-primary data-[state=active]:text-white">
          Profile
        </TabsTrigger>
        <TabsTrigger value="appointments" className="data-[state=active]:bg-mindful-primary data-[state=active]:text-white">
          Appointments
        </TabsTrigger>
        <TabsTrigger value="history" className="data-[state=active]:bg-mindful-primary data-[state=active]:text-white">
          Medical History
        </TabsTrigger>
        <TabsTrigger value="records" className="data-[state=active]:bg-mindful-primary data-[state=active]:text-white">
          Records
        </TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-mindful-primary data-[state=active]:text-white">
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileSection />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsSection />
      </TabsContent>

      <TabsContent value="history">
        <MedicalHistorySection />
      </TabsContent>

      <TabsContent value="records">
        <MedicalRecordsSection />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsSection />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;