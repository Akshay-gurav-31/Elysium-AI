
import React from 'react';
import { Heart, User, BarChart, Salad, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from '../UserProfile1';
import HealthMetrics from './HealthMetrics1';
import DietRecommendation from './DietRecommendation1';
import ReportGenerator from '../ReportGenerator1';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-health-purple" />
            <h1 className="text-xl font-bold tracking-tight">Elysium Health Tracker</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Wellbeing Insights Hub
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Health Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="flex items-center gap-2">
              <Salad className="h-4 w-4" />
              <span>Diet Advice</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="metrics">
            <HealthMetrics />
          </TabsContent>
          
          <TabsContent value="diet">
            <DietRecommendation />
          </TabsContent>
          
          <TabsContent value="report">
            <ReportGenerator />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Health Tracker | All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Layout;
