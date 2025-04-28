import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ProfileSection = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    age: user?.age ? Number(user.age) : "",
    address: user?.address || "",
    bio: user?.bio || ""
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age ? Number(user.age) : "",
        address: user.address || "",
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
      age: Number(profileForm.age),
      address: profileForm.address,
      bio: profileForm.bio
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved."
    });
  };

  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription className="text-gray-400">
          Update your personal details
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
                className="dark-input"
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
                className="dark-input"
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
                className="dark-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-300">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={profileForm.age}
                onChange={handleProfileChange}
                className="dark-input"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
                className="dark-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">About Me</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profileForm.bio}
              onChange={handleProfileChange}
              rows={4}
              className="dark-input resize-none"
            />
          </div>

          <Button type="submit" className="mindful-btn-primary">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
