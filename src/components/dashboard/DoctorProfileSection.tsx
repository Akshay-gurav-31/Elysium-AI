
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const DoctorProfileSection = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialization: user?.specialization || "",
    bio: user?.bio || ""
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        specialization: user.specialization || "",
        bio: user.bio || ""
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      specialization: profileForm.specialization,
      bio: profileForm.bio
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved."
    });
  };

  return (
    <Card className="dark-card bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">Professional Profile</CardTitle>
        <CardDescription className="text-gray-400">
          Update your professional information and credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="bg-neutral-700 border-neutral-600 text-white"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-gray-300">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={profileForm.specialization}
                onChange={handleProfileChange}
                className="bg-neutral-700 border-neutral-600 text-white"
                placeholder="e.g., Psychiatrist, Psychologist, Therapist"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profileForm.bio}
              onChange={handleProfileChange}
              rows={4}
              className="bg-neutral-700 border-neutral-600 text-white resize-none"
              placeholder="Describe your professional background, expertise, and approach to mental health care."
            />
          </div>

          <Button type="submit" className="bg-mindful-primary hover:bg-mindful-secondary text-white">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileSection;