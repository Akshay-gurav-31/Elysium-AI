
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: "doctor" | "patient" | ("doctor" | "patient")[];
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific user type is required, check if the user has that type
  if (requiredUserType) {
    const isUserTypeAllowed = Array.isArray(requiredUserType) 
      ? requiredUserType.includes(user?.type as "doctor" | "patient")
      : user?.type === requiredUserType;
    
    if (!isUserTypeAllowed) {
      // Redirect doctors to their dashboard if they try to access patient routes
      if (user?.type === "doctor") {
        return <Navigate to="/DoctorDashboard" replace />;
      }
      
      // Redirect patients to their dashboard if they try to access doctor routes
      return <Navigate to="/PatientDashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
