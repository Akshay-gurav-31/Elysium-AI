

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SettingsSection = () => {
  const { toast } = useToast();
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // Simple validation for demo
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would call an API to update the password
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
    
    // Clear password fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-password" className="text-gray-300">Current Password</Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="dark-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="dark-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="dark-input"
                required
              />
            </div>
            <Button type="submit" className="mindful-btn-primary">
              Update Password
            </Button>
          </form>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Notification Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="email-notify" className="rounded border-gray-600" defaultChecked />
              <Label htmlFor="email-notify" className="text-gray-400 text-sm cursor-pointer">
                Receive email notifications about appointments
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="sms-notify" className="rounded border-gray-600" defaultChecked />
              <Label htmlFor="sms-notify" className="text-gray-400 text-sm cursor-pointer">
                Receive SMS reminders for upcoming appointments
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="updates-notify" className="rounded border-gray-600" />
              <Label htmlFor="updates-notify" className="text-gray-400 text-sm cursor-pointer">
                Receive product updates and newsletters
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="data-share" className="rounded border-gray-600" defaultChecked />
              <Label htmlFor="data-share" className="text-gray-400 text-sm cursor-pointer">
                Share my data only with my assigned healthcare providers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="anonymous-data" className="rounded border-gray-600" />
              <Label htmlFor="anonymous-data" className="text-gray-400 text-sm cursor-pointer">
                Allow anonymous data usage for service improvement
              </Label>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-neutral-700">
          <Button 
            variant="destructive" 
            className="bg-red-900 hover:bg-red-800 text-white"
            onClick={() => {
              toast({
                title: "Account Action",
                description: "To delete your account, please contact support for assistance.",
              });
            }}
          >
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsSection;
