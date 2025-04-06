
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Calendar } from "lucide-react";

interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DashboardHeader = ({ activeTab, onTabChange }: DashboardHeaderProps) => {
  return (
    <>
      <section>
        <h1 className="text-3xl font-bold text-forest-dark mb-2">Your Mental Health Journey</h1>
        <p className="text-muted-foreground">Get support, track progress, and connect with professionals.</p>
      </section>
      
      <Tabs defaultValue="ai-chat" value={activeTab} onValueChange={onTabChange}>
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
      </Tabs>
    </>
  );
};

export default DashboardHeader;
