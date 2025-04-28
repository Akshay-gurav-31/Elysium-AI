
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Extended User interface with all required properties
interface User {
  id: string;
  name: string;
  email: string;
  type: "doctor" | "patient";
  avatar?: string;
  phone?: string;
  age?: number;
  address?: string;
  bio?: string;
  specialty?: string;
  licenseNumber?: string;
  specialization?: string;
  profileImage?: string;
}

// Define appointment type
interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Define patient data type
interface PatientData {
  appointments: Appointment[];
  medicalHistory?: any[];
  medicalRecords?: any[];
}

// Define doctor data type
interface DoctorData {
  appointments: Appointment[];
  patients?: any[];
  requests?: any[];
}

// Define the context type with all required properties
interface AuthContextType {
  user: User | null;
  loading: boolean;
  patientData?: PatientData;
  doctorData?: DoctorData;
  login: (email: string, password: string, userType?: "doctor" | "patient") => Promise<void>;
  register: (name: string, email: string, password: string, userType?: "doctor" | "patient", doctorDetails?: {specialty: string, licenseNumber: string}) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (userData: Partial<User>) => void;
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<PatientData>({ appointments: [] });
  const [doctorData, setDoctorData] = useState<DoctorData>({ appointments: [] });
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

  // Update user profile information
  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('mindfulGroveUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast("Profile Updated", {
      description: "Your profile information has been saved."
    });
  };
  
  // Add an appointment
  const addAppointment = (appointment: Appointment) => {
    if (user?.type === 'patient') {
      setPatientData(prev => ({
        ...prev,
        appointments: [...prev.appointments, appointment]
      }));
    } else if (user?.type === 'doctor') {
      setDoctorData(prev => ({
        ...prev,
        appointments: [...prev.appointments, appointment]
      }));
    }
  };
  
  // Cancel an appointment
  const cancelAppointment = (appointmentId: string) => {
    if (user?.type === 'patient') {
      setPatientData(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? {...apt, status: 'cancelled' as const} : apt
        )
      }));
    } else if (user?.type === 'doctor') {
      setDoctorData(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? {...apt, status: 'cancelled' as const} : apt
        )
      }));
    }
  };
  
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
          avatar: '/placeholder.svg',
          phone: '555-123-4567',
          age: 35,
          address: '123 Main St, Anytown USA',
          bio: 'I am a patient looking for mental health support.'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(patientUser));
        setUser(patientUser);
        
        // Set some demo patient data
        setPatientData({
          appointments: [
            {
              id: 'apt-1',
              doctorId: 'dr-smith',
              patientId: '1',
              doctorName: 'Dr. Smith',
              patientName: 'Demo Patient',
              date: new Date(Date.now() + 86400000), // tomorrow
              status: 'scheduled',
              notes: 'Initial consultation'
            }
          ]
        });
        
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
          avatar: '/placeholder.svg',
          phone: '555-987-6543',
          specialization: 'Psychiatry',
          bio: 'Board-certified psychiatrist with 10 years of experience in mental health care.'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(doctorUser));
        setUser(doctorUser);
        
        // Set some demo doctor data
        setDoctorData({
          appointments: [
            {
              id: 'apt-2',
              doctorId: '2',
              patientId: 'p789',
              doctorName: 'Dr. Jane Smith',
              patientName: 'Michael Brown',
              date: new Date(Date.now() + 172800000), // day after tomorrow
              status: 'scheduled',
              notes: 'Follow-up appointment'
            }
          ]
        });
        
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
          licenseNumber: doctorDetails.licenseNumber,
          specialization: doctorDetails.specialty
        } : {})
      };
      
      localStorage.setItem('mindfulGroveUser', JSON.stringify(newUser));
      setUser(newUser);
      
      // Initialize empty data structure based on user type
      if (userType === 'patient') {
        setPatientData({ appointments: [] });
      } else {
        setDoctorData({ appointments: [] });
      }
      
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
    setPatientData({ appointments: [] });
    setDoctorData({ appointments: [] });
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
      isAuthenticated: !!user,
      patientData,
      doctorData,
      updateUserProfile,
      addAppointment,
      cancelAppointment
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
