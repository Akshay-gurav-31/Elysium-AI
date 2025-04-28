
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'patient' | 'doctor' | 'both';
}

const ProtectedRoute = ({ children, requiredUserType = 'both' }: ProtectedRouteProps) => {
  const { isAuthenticated, userType } = useAuth();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check user type requirement
  if (requiredUserType !== 'both' && userType !== requiredUserType) {
    // Redirect doctor to doctor dashboard if trying to access patient pages
    if (userType === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    }
    
    // Redirect patient to patient dashboard if trying to access doctor pages
    if (userType === 'patient') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and has correct user type
  return <>{children}</>;
};

export default ProtectedRoute;
