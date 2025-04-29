
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Video, Phone, Mic, MicOff, Camera, CameraOff, Monitor } from "lucide-react";

// Detect operating system for device-specific instructions
const getDeviceOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS";
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Mac/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  
  return "Unknown OS";
};

const VideoCall = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Device detection
  const [deviceOS, setDeviceOS] = useState("Unknown OS");
  
  // Refs for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // State for managing call
  const [recipientEmail, setRecipientEmail] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  
  // Media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);

  // For demo purposes - simulated connections
  const [connectedUser, setConnectedUser] = useState<{name: string, email: string, type: string} | null>(null);
  
  // Check if user is authenticated & detect device
  useEffect(() => {
    if (!isAuthenticated) {
      toast("Please login to use video call feature");
      navigate("/login");
    }
    
    setDeviceOS(getDeviceOS());
  }, [isAuthenticated, navigate]);

  // Setup WebRTC
  const setupPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ],
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

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real implementation, this would send the candidate to the other peer
        console.log("New ICE candidate:", event.candidate);
      }
    };

    // Connection state monitoring
    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", pc.iceConnectionState);
      
      if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed") {
        toast.error("Connection lost. Trying to reconnect...");
      }
      
      if (pc.iceConnectionState === "connected") {
        toast.success("Connection established!");
      }
    };

    setPeerConnection(pc);
    return pc;
  };

  // Start local video
  const startLocalVideo = async () => {
    try {
      // Check for browser permissions first
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support media devices access");
      }
      
      const constraints = { 
        video: true, 
        audio: true 
      };
      
      // Mobile devices may need different constraints
      if (deviceOS === "Android" || deviceOS === "iOS") {
        // Use front camera by default on mobile
        constraints.video = { facingMode: "user" };
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast.error("Could not access camera or microphone. Please check permissions.");
      return null;
    }
  };

  // Initiate call
  const initiateCall = async () => {
    if (!recipientEmail.trim()) {
      toast.error("Please enter recipient's email address");
      return;
    }

    setIsCalling(true);
    
    // Start local video if not already started
    const stream = localStream || await startLocalVideo();
    if (!stream) {
      setIsCalling(false);
      return;
    }
    
    // For demo purposes - simulate finding a user
    setTimeout(() => {
      // In a real app, we would verify email exists and is online
      const userType = user?.type === "doctor" ? "patient" : "doctor";
      const displayName = userType === "doctor" ? 
        `Dr. ${recipientEmail.split('@')[0]}` : 
        recipientEmail.split('@')[0];
        
      setConnectedUser({
        name: displayName,
        email: recipientEmail,
        type: userType
      });
      
      setupPeerConnection();
      setIsCallActive(true);
      setIsCalling(false);
      
      toast.success(`Connected with ${displayName}`);
    }, 2000);
  };

  // Toggle audio mute
  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach(track => {
          track.enabled = isMuted;
        });
        setIsMuted(!isMuted);
        toast(isMuted ? "Microphone unmuted" : "Microphone muted");
      }
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach(track => {
          track.enabled = isVideoOff;
        });
        setIsVideoOff(!isVideoOff);
        toast(isVideoOff ? "Video turned on" : "Video turned off");
      }
    }
  };

  // Toggle screen sharing
  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      try {
        // Check if screen sharing is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          toast.error("Screen sharing is not supported on this device or browser");
          return;
        }
        
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        // Replace video track with screen share
        if (peerConnection) {
          const videoSender = peerConnection.getSenders().find(sender => 
            sender.track?.kind === 'video'
          );
          
          if (videoSender && screenStream.getVideoTracks().length > 0) {
            videoSender.replaceTrack(screenStream.getVideoTracks()[0]);
          }
        }
        
        // Update local video preview
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        setScreenShareStream(screenStream);
        setIsScreenSharing(true);
        toast.success("Screen sharing started");
        
        // Handle when user stops screen sharing via browser UI
        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenSharing();
        };
        
      } catch (error) {
        console.error("Error starting screen share:", error);
        toast.error("Failed to start screen sharing. Please check permissions.");
      }
    } else {
      stopScreenSharing();
    }
  };
  
  const stopScreenSharing = () => {
    // Stop all screen share tracks
    if (screenShareStream) {
      screenShareStream.getTracks().forEach(track => track.stop());
    }
    
    // Replace with camera stream again
    if (peerConnection && localStream) {
      const videoSender = peerConnection.getSenders().find(sender => 
        sender.track?.kind === 'video'
      );
      
      const videoTracks = localStream.getVideoTracks();
      if (videoSender && videoTracks.length > 0) {
        videoSender.replaceTrack(videoTracks[0]);
      }
      
      // Update local video preview
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    }
    
    setScreenShareStream(null);
    setIsScreenSharing(false);
    toast("Screen sharing stopped");
  };

  // End call
  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    
    if (screenShareStream) {
      screenShareStream.getTracks().forEach((track) => track.stop());
      setScreenShareStream(null);
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
    setIsCalling(false);
    setIsReceivingCall(false);
    setConnectedUser(null);
    setIsScreenSharing(false);
    setIsMuted(false);
    setIsVideoOff(false);
    
    toast("Call ended");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (screenShareStream) {
        screenShareStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  // Simulate incoming call (for demo purposes)
  const simulateIncomingCall = () => {
    setIsReceivingCall(true);
    
    // Auto-answer after delay
    setTimeout(async () => {
      await startLocalVideo();
      setIsCallActive(true);
      setIsReceivingCall(false);
      setupPeerConnection();
      
      const callerType = user?.type === "doctor" ? "patient" : "doctor";
      const displayName = callerType === "doctor" ? 
        `Dr. Anonymous` : 
        `Patient`;
        
      setConnectedUser({
        name: displayName,
        email: "incoming@example.com",
        type: callerType
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-220px)] bg-neutral-900 py-4 md:py-8">
        <div className="container mx-auto px-4">
          <Card className="dark-card">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                Video Consultation
                <Video size={24} className="inline-block" />
                {deviceOS !== "Unknown OS" && (
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    ({deviceOS})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isCallActive ? (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl">
                      {user?.type === "doctor" ? "Connect with a patient" : "Connect with a doctor"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      Enter the email address to start a secure video consultation
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="dark-input"
                    />
                    
                    <Button 
                      disabled={isCalling || !recipientEmail} 
                      className="mindful-btn-primary"
                      onClick={initiateCall}
                    >
                      {isCalling ? (
                        <>Calling... <span className="animate-pulse ml-2">●</span></>
                      ) : (
                        <>Start Video Call <Video size={16} className="ml-2" /></>
                      )}
                    </Button>
                    
                    {/* Device compatibility notice */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-400">
                        Compatible with all devices: Windows, macOS, Linux, Android and iOS
                      </p>
                    </div>
                    
                    {/* For demo purposes */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-400 mb-2">Demo: Simulate incoming call</p>
                      <Button 
                        variant="outline" 
                        className="border-mindful-primary text-mindful-primary"
                        onClick={simulateIncomingCall}
                        disabled={isReceivingCall}
                      >
                        Simulate Incoming Call
                      </Button>
                    </div>
                  </div>
                  
                  {isReceivingCall && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <Card className="dark-card w-[90%] max-w-md animate-pulse">
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl mb-4">Incoming Call</h3>
                          <p className="mb-4">{user?.type === "doctor" ? "A patient" : "A doctor"} is calling you</p>
                          <div className="flex justify-center space-x-4">
                            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsReceivingCall(false)}>
                              Decline
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={async () => {
                              await startLocalVideo();
                              setIsCallActive(true);
                              setIsReceivingCall(false);
                              setupPeerConnection();
                              
                              const callerType = user?.type === "doctor" ? "patient" : "doctor";
                              const displayName = callerType === "doctor" ? 
                                `Dr. Anonymous` : 
                                `Patient`;
                                
                              setConnectedUser({
                                name: displayName,
                                email: "incoming@example.com",
                                type: callerType
                              });
                            }}>
                              Accept
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="bg-green-800 inline-block px-3 py-1 rounded-full text-sm">
                      Call in Progress
                    </p>
                    {connectedUser && (
                      <h3 className="text-xl mt-2">
                        Connected with: {connectedUser.name}
                      </h3>
                    )}
                  </div>
                  
                  {/* Video grid - responsive for all device sizes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Your Video {isScreenSharing && "(Screen sharing)"}</h4>
                      <div className="relative">
                        <video
                          ref={localVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full rounded-lg border border-neutral-700 bg-neutral-800 aspect-video ${isVideoOff ? 'opacity-50' : ''}`}
                        />
                        {isVideoOff && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-400">Video Off</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">
                        {connectedUser?.name}'s Video
                      </h4>
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-800 aspect-video"
                      />
                    </div>
                  </div>
                  
                  {/* Call controls - responsive for mobile */}
                  <div className="flex flex-wrap justify-center gap-3 pt-4">
                    {/* Mute button */}
                    <Button 
                      variant={isMuted ? "default" : "outline"}
                      size="icon" 
                      className={`rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'border-neutral-600'}`}
                      onClick={toggleMute}
                    >
                      {isMuted ? <MicOff /> : <Mic />}
                    </Button>
                    
                    {/* Video toggle button */}
                    <Button 
                      variant={isVideoOff ? "default" : "outline"}
                      size="icon" 
                      className={`rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'border-neutral-600'}`}
                      onClick={toggleVideo}
                    >
                      {isVideoOff ? <CameraOff /> : <Camera />}
                    </Button>
                    
                    {/* Screen sharing button - only show on desktop devices */}
                    {(deviceOS === "Windows" || deviceOS === "macOS" || deviceOS === "Linux") && (
                      <Button 
                        variant={isScreenSharing ? "default" : "outline"}
                        size="icon" 
                        className={`rounded-full ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'border-neutral-600'}`}
                        onClick={toggleScreenSharing}
                      >
                        <Monitor />
                      </Button>
                    )}
                    
                    {/* End call button */}
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="rounded-full bg-red-600 hover:bg-red-700"
                      onClick={endCall}
                    >
                      <Phone className="h-4 w-4 rotate-135" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoCall;
