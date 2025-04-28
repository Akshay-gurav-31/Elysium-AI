
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define the User type with type property
interface User {
  id: string;
  name: string;
  email: string;
  type: "doctor" | "patient";
  avatar?: string;
  specialty?: string;
  licenseNumber?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType?: "doctor" | "patient") => Promise<void>;
  register: (name: string, email: string, password: string, userType?: "doctor" | "patient", doctorDetails?: {specialty: string, licenseNumber: string}) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mindfulGroveUser');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // For demo purposes, we're using localStorage
  // In production, this would connect to a backend auth system
  const login = async (email: string, password: string, userType: "doctor" | "patient" = 'patient') => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials check for patient
      if (userType === 'patient' && (email === 'demo@example.com' || email === 'patient@example.com') && password === 'password') {
        const patientUser: User = {
          id: '1',
          name: 'Demo Patient',
          email: email,
          type: 'patient',
          avatar: '/placeholder.svg'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(patientUser));
        setUser(patientUser);
        
        toast("Login successful", {
          description: "Welcome to Mindful Grove!"
        });
        
        navigate('/patient-dashboard');
      }
      // Demo credentials check for doctor
      else if (userType === 'doctor' && email === 'doctor@example.com' && password === 'password') {
        const doctorUser: User = {
          id: '2',
          name: 'Dr. Jane Smith',
          email: 'doctor@example.com',
          type: 'doctor',
          specialty: 'Psychiatry',
          licenseNumber: 'MED12345',
          avatar: '/placeholder.svg'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(doctorUser));
        setUser(doctorUser);
        
        toast("Login successful", {
          description: "Welcome to Mindful Grove, Dr. Smith!"
        });
        
        navigate('/doctor-dashboard');
      } else {
        toast("Login failed", {
          description: userType === 'patient' 
            ? "Invalid email or password. Try patient@example.com / password" 
            : "Invalid email or password. Try doctor@example.com / password"
        });
      }
    } catch (error) {
      toast("Login error", {
        description: "An unexpected error occurred. Please try again."
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, userType: "doctor" | "patient" = 'patient', doctorDetails?: {specialty: string, licenseNumber: string}) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        type: userType,
        avatar: '/placeholder.svg',
        ...(userType === 'doctor' && doctorDetails ? {
          specialty: doctorDetails.specialty,
          licenseNumber: doctorDetails.licenseNumber
        } : {})
      };
      
      localStorage.setItem('mindfulGroveUser', JSON.stringify(newUser));
      setUser(newUser);
      
      toast("Registration successful", {
        description: userType === 'doctor'
          ? "Your provider account has been created! Please wait for verification."
          : "Your account has been created!"
      });
      
      navigate(userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    } catch (error) {
      toast("Registration error", {
        description: "An unexpected error occurred. Please try again."
      });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('mindfulGroveUser');
    setUser(null);
    toast("Logged out", {
      description: "You have been successfully logged out."
    });
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
