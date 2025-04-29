
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Library from "./pages/Library";
import Signup from "./pages/Signup";
import Tracker from "./pages/Tracker";
import Shop from "./pages/Shop";
import Chatbot from "./pages/Chatbot";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import VideoCall from "./pages/VideoCall";
import ProtectedRoute from "./components/ProtectedRoute";


const queryClient = new QueryClient();

// Router guard component to redirect based on user type
const RoleBasedRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const userType = user?.type;

  if (userType === "doctor") {
    return <Navigate to="/DoctorDashboard" replace />;
  }
  
  return <Navigate to="/PatientDashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected patient routes */}
            <Route path="/PatientDashboard" element={
              <ProtectedRoute requiredUserType="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/chatbot" element={
              <ProtectedRoute requiredUserType="patient">
                <Chatbot />
              </ProtectedRoute>
            } />
            
            {/* Protected doctor routes */}
            <Route path="/DoctorDashboard" element={
              <ProtectedRoute requiredUserType="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Video call route - accessible by both doctors and patients */}
            <Route path="/video-call" element={
              <ProtectedRoute requiredUserType={["doctor", "patient"]}>
                <VideoCall />
              </ProtectedRoute>
            } />
            
            {/* Smart redirect based on user type */}
            <Route path="/account" element={<RoleBasedRedirect />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
