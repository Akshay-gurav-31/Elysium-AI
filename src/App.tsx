import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import { Toaster } from "sonner";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import "@/components/ui/toaster";
import Login from "./pages/Login";
import Library from "./pages/Library";
import Signup from "./pages/Signup";
import Tracker from "./pages/Tracker";
import Shop from "./pages/Shop";
import Chatbot from "./pages/Chatbot";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";


const queryClient = new QueryClient();

// Router guard component to redirect based on user type
const RoleBasedRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Map userType to user.type for consistency with Login.tsx
  const userType = user?.type;

  if (userType === "doctor") {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  
  // Redirect patients to patient-dashboard instead of dashboard
  return <Navigate to="/PatientDashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/patient-dashboard" element={
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
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute requiredUserType="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Smart redirect based on user type */}
            <Route path="/account" element={<RoleBasedRedirect />} />
            
            {/* Catch-all route for 404 */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;