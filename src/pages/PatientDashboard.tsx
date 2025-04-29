import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, Calendar, Clock, FileText, LogOut, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/contexts/AuthContext";


const PatientDashboard = () => {
  const { user, logout, patientData, updateUserProfile, addAppointment, cancelAppointment } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "Patient Name",
    email: user?.email || "patient@example.com",
    phone: user?.phone || "+91 9876543210",
    age: user?.age?.toString() || "28",
    gender: "Male",
    bio: user?.bio || "",
  });

  // Use patientData.appointments directly, with fallback to mock data
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Mock doctors list
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. Raj Patil",
      specialization: "Psychiatrist",
      experience: "10 years",
      rating: "4.8",
      available: ["Mon", "Wed", "Fri"],
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Clinical Psychologist",
      experience: "7 years",
      rating: "4.9",
      available: ["Tue", "Thu", "Sat"],
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctorId: "",
    date: "",
    time: "",
    notes: "",
    type: "video",
  });

  // Sync appointments from patientData, converting date strings to Date objects
  useEffect(() => {
    console.log('PatientDashboard: Rendered with user:', user, 'patientData:', patientData);
    if (!user) {
      console.log('PatientDashboard: No user, redirecting to /login');
      navigate('/login', { replace: true });
    } else if (user.type !== 'patient') {
      console.log('PatientDashboard: User is not a patient, redirecting to /account');
      navigate('/account', { replace: true });
    } else {
      // Initialize appointments from patientData or mock data
      const initialAppointments = patientData?.appointments?.length
        ? patientData.appointments.map(appt => ({
            ...appt,
            date: appt.date instanceof Date ? appt.date : new Date(appt.date),
          }))
        : [
            {
              id: '1',
              doctorName: "Dr. Raj Patil",
              patientName: user?.name || "Patient Name",
              doctorId: 'dr1',
              patientId: user?.id || 'p1',
              date: new Date("2023-06-15"),
              status: "scheduled" as const,
              notes: "Follow-up for anxiety management",
            },
            {
              id: '2',
              doctorName: "Dr. Priya Sharma",
              patientName: user?.name || "Patient Name",
              doctorId: 'dr2',
              patientId: user?.id || 'p1',
              date: new Date("2023-06-17"),
              status: "scheduled" as const,
              notes: "Initial consultation",
            },
          ];
      setAppointments(initialAppointments);
    }
  }, [user, patientData, navigate]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      age: parseInt(profileForm.age) || undefined,
      bio: profileForm.bio,
    });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
    console.log('PatientDashboard: Profile updated:', profileForm);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    console.log('PatientDashboard: User logged out');
  };

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id); // Use AuthContext's cancelAppointment
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
    console.log('PatientDashboard: Appointment cancelled:', id);
  };

  const handleNewAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = doctors.find(doc => doc.id === parseInt(newAppointment.doctorId));

    const newAppt: Appointment = {
      id: Date.now().toString(),
      doctorName: doctor?.name || "Unknown Doctor",
      patientName: user?.name || "Patient Name",
      doctorId: newAppointment.doctorId,
      patientId: user?.id || 'p1',
      date: new Date(newAppointment.date),
      status: "scheduled" as const,
      notes: newAppointment.notes,
    };

    addAppointment(newAppt); // Use AuthContext's addAppointment
    setNewAppointment({
      doctorId: "",
      date: "",
      time: "",
      notes: "",
      type: "video",
    });

    toast({
      title: "Appointment Booked",
      description: "Your appointment request has been submitted successfully.",
    });
    console.log('PatientDashboard: New appointment booked:', newAppt);
  };

  if (!user || user.type !== 'patient') {
    console.log('PatientDashboard: Not rendering due to no user or wrong user type:', user);
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-220px)] bg-neutral-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-4">
              <Card className="dark-card">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center text-3xl text-mindful-primary mb-4">
                      {user.name ? user.name.charAt(0).toUpperCase() : "P"}
                    </div>
                    <h3 className="text-lg font-semibold">{profileForm.name}</h3>
                    <p className="text-sm text-gray-400">{profileForm.email}</p>
                    <p className="text-xs bg-mindful-primary text-white px-2 py-1 rounded mt-2 capitalize">
                      Patient
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark-card">
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <button 
                      onClick={() => setActiveTab("appointments")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${activeTab === "appointments" ? "border-mindful-primary" : "border-transparent"}`}
                    >
                      <Calendar size={18} />
                      <span>Appointments</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("history")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${activeTab === "history" ? "border-mindful-primary" : "border-transparent"}`}
                    >
                      <Clock size={18} />
                      <span>History</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("records")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${activeTab === "records" ? "border-mindful-primary" : "border-transparent"}`}
                    >
                      <FileText size={18} />
                      <span>Records</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${activeTab === "profile" ? "border-mindful-primary" : "border-transparent"}`}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("settings")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${activeTab === "settings" ? "border-mindful-primary" : "border-transparent"}`}
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
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

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "appointments" && (
                <div className="space-y-6">
                  <Card className="dark-card">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Your Appointments</CardTitle>
                          <CardDescription className="text-gray-400">
                            Manage your scheduled sessions
                          </CardDescription>
                        </div>
                        <Button 
                          className="mindful-btn-primary"
                          onClick={() => setActiveTab("book")}
                        >
                          <Plus size={18} className="mr-2" />
                          Book New Appointment
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="bg-neutral-800">
                          <TabsTrigger value="upcoming" className="data-[state=active]:bg-mindful-primary">
                            Upcoming
                          </TabsTrigger>
                          <TabsTrigger value="past" className="data-[state=active]:bg-mindful-primary">
                            Past
                          </TabsTrigger>
                          <TabsTrigger value="cancelled" className="data-[state=active]:bg-mindful-primary">
                            Cancelled
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming">
                          <div className="space-y-4 mt-4">
                            {appointments
                              .filter(appt => appt.status === "scheduled")
                              .map(appt => (
                                <Card key={appt.id} className="dark-card">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                      <div>
                                        <h4 className="font-medium">{appt.doctorName}</h4>
                                        <p className="text-sm text-gray-400">
                                          {appt.date.toLocaleDateString()}
                                        </p>
                                        {appt.notes && (
                                          <p className="text-sm mt-2 text-gray-300">{appt.notes}</p>
                                        )}
                                      </div>
                                      <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                                          {appt.status}
                                        </span>
                                        {appt.status === "scheduled" && (
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="border-mindful-primary text-mindful-primary hover:bg-mindful-primary/10"
                                          >
                                            Join Session
                                          </Button>
                                        )}
                                        <Button 
                                          variant="destructive" 
                                          size="sm"
                                          onClick={() => handleCancelAppointment(appt.id)}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            {appointments.filter(appt => appt.status === "scheduled").length === 0 && (
                              <div className="text-center py-8">
                                <p className="text-gray-400">No upcoming appointments</p>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="past">
                          <div className="space-y-4 mt-4">
                            {appointments
                              .filter(appt => appt.status === "completed")
                              .map(appt => (
                                <Card key={appt.id} className="dark-card">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                      <div>
                                        <h4 className="font-medium">{appt.doctorName}</h4>
                                        <p className="text-sm text-gray-400">
                                          {appt.date.toLocaleDateString()}
                                        </p>
                                        {appt.notes && (
                                          <p className="text-sm mt-2 text-gray-300">{appt.notes}</p>
                                        )}
                                      </div>
                                      <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded text-xs bg-blue-900 text-blue-300">
                                          {appt.status}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            {appointments.filter(appt => appt.status === "completed").length === 0 && (
                              <div className="text-center py-8">
                                <p className="text-gray-400">No past appointments found</p>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="cancelled">
                          <div className="space-y-4 mt-4">
                            {appointments
                              .filter(appt => appt.status === "cancelled")
                              .map(appt => (
                                <Card key={appt.id} className="dark-card">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                      <div>
                                        <h4 className="font-medium">{appt.doctorName}</h4>
                                        <p className="text-sm text-gray-400">
                                          {appt.date.toLocaleDateString()}
                                        </p>
                                        {appt.notes && (
                                          <p className="text-sm mt-2 text-gray-300">{appt.notes}</p>
                                        )}
                                      </div>
                                      <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded text-xs bg-red-900 text-red-300">
                                          {appt.status}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            {appointments.filter(appt => appt.status === "cancelled").length === 0 && (
                              <div className="text-center py-8">
                                <p className="text-gray-400">No cancelled appointments</p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "book" && (
                <div className="space-y-6">
                  <Card className="dark-card">
                    <CardHeader>
                      <CardTitle>Book New Appointment</CardTitle>
                      <CardDescription className="text-gray-400">
                        Schedule a consultation with a mental health professional
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleBookAppointment} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="doctor" className="text-gray-300">Select Doctor</Label>
                          <select
                            id="doctor"
                            name="doctorId"
                            value={newAppointment.doctorId}
                            onChange={handleNewAppointmentChange}
                            className="dark-input"
                            required
                          >
                            <option value="">Select a doctor</option>
                            {doctors.map(doctor => (
                              <option key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialization} ({doctor.rating} ★)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date" className="text-gray-300">Select Date</Label>
                            <Input
                              type="date"
                              id="date"
                              name="date"
                              value={newAppointment.date}
                              onChange={handleNewAppointmentChange}
                              className="dark-input"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time" className="text-gray-300">Select Time</Label>
                            <Input
                              type="time"
                              id="time"
                              name="time"
                              value={newAppointment.time}
                              onChange={handleNewAppointmentChange}
                              className="dark-input"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Consultation Type</Label>
                          <div className="flex gap-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="type"
                                value="video"
                                checked={newAppointment.type === "video"}
                                onChange={handleNewAppointmentChange}
                                className="text-mindful-primary"
                              />
                              <span>Video Consultation</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="type"
                                value="in-person"
                                checked={newAppointment.type === "in-person"}
                                onChange={handleNewAppointmentChange}
                                className="text-mindful-primary"
                              />
                              <span>In-Person</span>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes" className="text-gray-300">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Describe your concerns..."
                            value={newAppointment.notes}
                            onChange={handleNewAppointmentChange}
                            rows={4}
                            className="dark-input"
                          />
                        </div>

                        <div className="bg-neutral-800 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Appointment Summary</h4>
                          {newAppointment.doctorId && newAppointment.date && newAppointment.time ? (
                            <div className="space-y-2 text-sm">
                              <p>Doctor: {doctors.find(d => d.id === parseInt(newAppointment.doctorId))?.name}</p>
                              <p>Date: {new Date(newAppointment.date).toLocaleDateString()}</p>
                              <p>Time: {newAppointment.time}</p>
                              <p>Type: {newAppointment.type === "video" ? "Video Consultation" : "In-Person"}</p>
                            </div>
                          ) : (
                            <p className="text-gray-400">Please select a doctor and date</p>
                          )}
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab("appointments")}
                            className="border-neutral-600 hover:bg-neutral-700"
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            className="mindful-btn-primary"
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "history" && (
                <Card className="dark-card">
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your past consultations and treatments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Card className="dark-card">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Dr. Raj Patil</h4>
                              <p className="text-sm text-gray-400">May 15, 2023</p>
                            </div>
                            <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                              Completed
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h5 className="text-sm font-medium mb-1">Diagnosis:</h5>
                          <p className="text-sm text-gray-300 mb-3">Generalized Anxiety Disorder</p>
                          <h5 className="text-sm font-medium mb-1">Prescription:</h5>
                          <ul className="text-sm text-gray-300 space-y-1 mb-3">
                            <li>• Cognitive Behavioral Therapy (Weekly sessions)</li>
                            <li>• Mindfulness exercises (Daily practice)</li>
                          </ul>
                          <h5 className="text-sm font-medium mb-1">Notes:</h5>
                          <p className="text-sm text-gray-300">
                            Patient shows improvement with breathing techniques. Recommended to continue therapy and monitor symptoms.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="dark-card">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Dr. Priya Sharma</h4>
                              <p className="text-sm text-gray-400">April 28, 2023</p>
                            </div>
                            <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                              Completed
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h5 className="text-sm font-medium mb-1">Diagnosis:</h5>
                          <p className="text-sm text-gray-300 mb-3">Mild Depression</p>
                          <h5 className="text-sm font-medium mb-1">Recommendations:</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Regular physical activity</li>
                            <li>• Maintain sleep schedule</li>
                            <li>• Follow-up in 2 weeks</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "records" && (
                <Card className="dark-card">
                  <CardHeader>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your health documents and reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search records..."
                          className="pl-10 dark-input"
                        />
                      </div>
                      <Button className="mindful-btn-primary">
                        Upload Records
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Psychological Evaluation</h4>
                          <p className="text-sm text-gray-400">May 10, 2023 • PDF</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-mindful-primary text-mindful-primary">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">Lab Results</h4>
                          <p className="text-sm text-gray-400">April 25, 2023 • PDF</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-mindful-primary text-mindful-primary">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "profile" && (
                <Card className="dark-card">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your profile details
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
                            value={profileForm.age}
                            onChange={handleProfileChange}
                            className="dark-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                          <select
                            id="gender"
                            name="gender"
                            value={profileForm.gender}
                            onChange={handleProfileChange}
                            className="dark-input"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
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
                          className="dark-input"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <Button type="submit" className="mindful-btn-primary">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card className="dark-card">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Notification Preferences</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="email-notify" className="rounded border-gray-600" defaultChecked />
                          <Label htmlFor="email-notify" className="text-gray-400 text-sm cursor-pointer">
                            Email notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sms-notify" className="rounded border-gray-600" />
                          <Label htmlFor="sms-notify" className="text-gray-400 text-sm cursor-pointer">
                            SMS notifications
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Change Password</Label>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current password" className="dark-input" />
                        <Input type="password" placeholder="New password" className="dark-input" />
                        <Input type="password" placeholder="Confirm new password" className="dark-input" />
                        <Button variant="outline" className="border-neutral-600 text-white hover:bg-neutral-700">
                          Update Password
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-700">
                      <Button 
                        variant="destructive" 
                        className="bg-red-900 hover:bg-red-800 text-white"
                        onClick={() => {
                          toast({
                            title: "Account Deletion",
                            description: "Are you sure you want to delete your account? This action cannot be undone.",
                            variant: "destructive",
                            action: (
                              <Button variant="destructive" size="sm" onClick={() => {}}>
                                Delete
                              </Button>
                            ),
                          });
                        }}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;
