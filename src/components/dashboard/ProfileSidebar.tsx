

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, Calendar, Clock, FileText, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab = "profile", onTabChange }: ProfileSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTabClick = (tab: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const isActive = (tab: string) => activeTab === tab;

  return (
    <div className="w-full md:w-64 space-y-4">
      <Card className="dark-card">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              {user?.profileImage ? (
                <AvatarImage src={user.profileImage} alt={user?.name || "User"} />
              ) : (
                <AvatarFallback className="bg-mindful-primary text-white text-3xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <h3 className="text-lg font-semibold">{user?.name || "User"}</h3>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <p className="text-xs bg-mindful-primary text-white px-2 py-1 rounded mt-2 capitalize">
              {user?.type || "user"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="dark-card">
        <CardContent className="p-0">
          <nav className="flex flex-col">
            <a 
              href="#profile" 
              className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${isActive("profile") ? "border-mindful-primary bg-neutral-700/50" : "border-transparent"}`}
              onClick={handleTabClick("profile")}
            >
              <User size={18} />
              <span>Profile</span>
            </a>
            <a 
              href="#appointments" 
              className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${isActive("appointments") ? "border-mindful-primary bg-neutral-700/50" : "border-transparent"}`}
              onClick={handleTabClick("appointments")}
            >
              <Calendar size={18} />
              <span>Appointments</span>
            </a>
            <a 
              href="#history" 
              className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${isActive("history") ? "border-mindful-primary bg-neutral-700/50" : "border-transparent"}`}
              onClick={handleTabClick("history")}
            >
              <Clock size={18} />
              <span>History</span>
            </a>
            <a 
              href="#records" 
              className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${isActive("records") ? "border-mindful-primary bg-neutral-700/50" : "border-transparent"}`}
              onClick={handleTabClick("records")}
            >
              <FileText size={18} />
              <span>Records</span>
            </a>
            <a 
              href="#settings" 
              className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${isActive("settings") ? "border-mindful-primary bg-neutral-700/50" : "border-transparent"}`}
              onClick={handleTabClick("settings")}
            >
              <Settings size={18} />
              <span>Settings</span>
            </a>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 border-transparent text-left text-red-400"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
