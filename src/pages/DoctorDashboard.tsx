import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, FileText, LogOut, Search, Video, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("patients");

  // WebRTC state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  // Doctor profile state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "Doctor Name",
    email: user?.email || "doctor@example.com",
    phone: "+91 9876543210",
    specialization: "Psychiatrist",
    experience: "10 years",
    bio: "",
  });

  // Mock data for patients (usernames only for simplicity)
  const [patients, setPatients] = useState([
    { id: 1, username: "Ronny" },
    { id: 2, username: "Adi" },
  ]);

  // Mock data for patient records
  const [patientRecords, setPatientRecords] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2023-05-15",
      diagnosis: "Generalized Anxiety Disorder",
      prescription: ["Cognitive Behavioral Therapy", "Mindfulness exercises"],
      notes: "Patient shows improvement with breathing techniques.",
    },
  ]);

  // Initialize WebRTC peer connection
  const setupPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local stream tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    // Handle incoming remote stream
    pc.ontrack = (event) => {
      const stream = event.streams[0];
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    // Handle ICE candidates (you'd typically send these to the other peer via signaling)
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real app, send the candidate to the other peer via a signaling server
        console.log("ICE Candidate:", event.candidate);
      }
    };

    setPeerConnection(pc);
    return pc;
  };

  // Start video call
  const startVideoCall = async (patientId: number) => {
    try {
      // Request access to camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Setup peer connection
      const pc = setupPeerConnection();

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // In a real app, send the offer to the patient via a signaling server
      console.log("Offer SDP:", offer.sdp);

      setIsCallActive(true);
      toast({
        title: "Video Call Started",
        description: `Initiating video call with patient ${patientId}...`,
      });
    } catch (error) {
      console.error("Error starting video call:", error);
      toast({
        title: "Error",
        description: "Failed to start video call. Please check your camera and microphone permissions.",
        variant: "destructive",
      });
    }
  };

  // End video call
  const endVideoCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setIsCallActive(false);
    toast({
      title: "Video Call Ended",
      description: "The video call has been ended.",
    });
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      endVideoCall();
    };
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
                      {user?.name ? user.name.charAt(0).toUpperCase() : "D"}
                    </div>
                    <h3 className="text-lg font-semibold">{profileForm.name}</h3>
                    <p className="text-sm text-gray-400">{profileForm.email}</p>
                    <p className="text-xs bg-mindful-primary text-white px-2 py-1 rounded mt-2 capitalize">
                      Doctor
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark-card">
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <button
                      onClick={() => setActiveTab("patients")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${
                        activeTab === "patients" ? "border-mindful-primary" : "border-transparent"
                      }`}
                    >
                      <Users size={18} />
                      <span>Patients</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("records")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${
                        activeTab === "records" ? "border-mindful-primary" : "border-transparent"
                      }`}
                    >
                      <FileText size={18} />
                      <span>Patient Records</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${
                        activeTab === "profile" ? "border-mindful-primary" : "border-transparent"
                      }`}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`flex items-center gap-2 p-3 hover:bg-neutral-700 border-l-4 ${
                        activeTab === "settings" ? "border-mindful-primary" : "border-transparent"
                      }`}
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
              {activeTab === "patients" && (
                <div className="space-y-6">
                  <Card className="dark-card">
                    <CardHeader>
                      <CardTitle>Patients</CardTitle>
                      <CardDescription className="text-gray-400">
                        View your patients and initiate video calls
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {patients.map((patient) => (
                          <Card key={patient.id} className="dark-card">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <h4 className="font-medium">{patient.username}</h4>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-mindful-primary text-mindful-primary hover:bg-mindful-primary/10"
                                  onClick={() => startVideoCall(patient.id)}
                                  disabled={isCallActive}
                                >
                                  <Video size={16} className="mr-2" />
                                  Start Video Call
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {patients.length === 0 && (
                          <p className="text-center text-gray-400">No patients found</p>
                        )}
                      </div>

                      {isCallActive && (
                        <div className="mt-6">
                          <Card className="dark-card">
                            <CardHeader>
                              <CardTitle>Video Call</CardTitle>
                              <CardDescription className="text-gray-400">
                                Active video call session
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Your Video</h5>
                                  <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full rounded-lg border border-neutral-700"
                                  />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Patient's Video</h5>
                                  <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full rounded-lg border border-neutral-700"
                                  />
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button
                                  variant="destructive"
                                  onClick={endVideoCall}
                                >
                                  End Call
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "records" && (
                <div className="space-y-6">
                  <Card className="dark-card">
                    <CardHeader>
                      <CardTitle>Patient Records</CardTitle>
                      <CardDescription className="text-gray-400">
                        View and manage patient medical records
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-full max-w-md">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input placeholder="Search patient records..." className="pl-10 dark-input" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {patientRecords.map((record) => (
                          <Card key={record.id} className="dark-card">
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{record.patientName}</h4>
                                  <p className="text-sm text-gray-400">
                                    {new Date(record.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-mindful-primary text-mindful-primary"
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <h5 className="text-sm font-medium mb-1">Diagnosis:</h5>
                              <p className="text-sm text-gray-300 mb-3">{record.diagnosis}</p>

                              <h5 className="text-sm font-medium mb-1">Prescription:</h5>
                              <ul className="text-sm text-gray-300 space-y-1 mb-3">
                                {record.prescription.map((item, index) => (
                                  <li key={index}>• {item}</li>
                                ))}
                              </ul>

                              <h5 className="text-sm font-medium mb-1">Notes:</h5>
                              <p className="text-sm text-gray-300">{record.notes}</p>
                            </CardContent>
                          </Card>
                        ))}
                        {patientRecords.length === 0 && (
                          <p className="text-center text-gray-400">No patient records found</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="space-y-6">
                  <Card className="dark-card">
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription className="text-gray-400">
                        Update your professional profile details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={profileForm.name}
                              onChange={handleProfileChange}
                              className="dark-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">
                              Email
                            </Label>
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
                            <Label htmlFor="phone" className="text-gray-300">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileForm.phone}
                              onChange={handleProfileChange}
                              className="dark-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="specialization" className="text-gray-300">
                              Specialization
                            </Label>
                            <Input
                              id="specialization"
                              name="specialization"
                              value={profileForm.specialization}
                              onChange={handleProfileChange}
                              className="dark-input"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience" className="text-gray-300">
                              Years of Experience
                            </Label>
                            <Input
                              id="experience"
                              name="experience"
                              value={profileForm.experience}
                              onChange={handleProfileChange}
                              className="dark-input"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-gray-300">
                            Professional Bio
                          </Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={profileForm.bio}
                            onChange={handleProfileChange}
                            rows={4}
                            className="dark-input"
                            placeholder="Describe your expertise and approach..."
                          />
                        </div>

                        <Button type="submit" className="mindful-btn-primary">
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
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
                            <input
                              type="checkbox"
                              id="email-notify"
                              className="rounded border-gray-600"
                              defaultChecked
                            />
                            <Label htmlFor="email-notify" className="text-gray-400 text-sm cursor-pointer">
                              Email notifications
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="sms-notify"
                              className="rounded border-gray-600"
                            />
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
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="dark-input"
                          />
                          <Button
                            variant="outline"
                            className="border-neutral-600 text-white hover:bg-neutral-700"
                          >
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
                              description:
                                "Are you sure you want to delete your account? This action cannot be undone.",
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;