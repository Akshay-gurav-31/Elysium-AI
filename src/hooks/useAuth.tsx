
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'patient' | 'doctor';
  specialty?: string;
  licenseNumber?: string;
}

type UserType = 'patient' | 'doctor';

interface DoctorDetails {
  specialty: string;
  licenseNumber: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType?: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, userType?: UserType, doctorDetails?: DoctorDetails) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('mindfulGroveUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);
  
  // For demo purposes, we're using localStorage
  // In production, this would connect to a backend auth system
  const login = async (email: string, password: string, userType: UserType = 'patient') => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials check for patient
      if (userType === 'patient' && (email === 'demo@example.com' || email === 'patient@example.com') && password === 'password') {
        const patientUser = {
          id: '1',
          name: 'Demo Patient',
          email: email,
          userType: 'patient',
          avatar: '/placeholder.svg'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(patientUser));
        setUser(patientUser);
        
        toast({
          title: "Login successful",
          description: "Welcome to Mindful Grove!",
        });
        
        navigate('/dashboard');
      }
      // Demo credentials check for doctor
      else if (userType === 'doctor' && email === 'doctor@example.com' && password === 'password') {
        const doctorUser = {
          id: '2',
          name: 'Dr. Jane Smith',
          email: 'doctor@example.com',
          userType: 'doctor',
          specialty: 'Psychiatry',
          licenseNumber: 'MED12345',
          avatar: '/placeholder.svg'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(doctorUser));
        setUser(doctorUser);
        
        toast({
          title: "Login successful",
          description: "Welcome to Mindful Grove, Dr. Smith!",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: userType === 'patient' 
            ? "Invalid email or password. Try patient@example.com / password" 
            : "Invalid email or password. Try doctor@example.com / password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, userType: UserType = 'patient', doctorDetails?: DoctorDetails) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        userType,
        avatar: '/placeholder.svg',
        ...(userType === 'doctor' && doctorDetails ? {
          specialty: doctorDetails.specialty,
          licenseNumber: doctorDetails.licenseNumber
        } : {})
      };
      
      localStorage.setItem('mindfulGroveUser', JSON.stringify(newUser));
      setUser(newUser as User);
      
      toast({
        title: "Registration successful",
        description: userType === 'doctor'
          ? "Your provider account has been created! Please wait for verification."
          : "Your account has been created!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('mindfulGroveUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
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
