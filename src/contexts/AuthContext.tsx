import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Extended User interface
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
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  date: Date;
  time?: string;
  type?: 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed' | 'pending';
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

// Define the context type
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

  // Load user and data from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('mindfulGroveUser');
      const storedPatientData = localStorage.getItem('mindfulGrovePatientData');
      const storedDoctorData = localStorage.getItem('mindfulGroveDoctorData');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedPatientData) {
        const parsed = JSON.parse(storedPatientData);
        setPatientData({
          ...parsed,
          appointments: parsed.appointments.map((appt: any) => ({
            ...appt,
            date: new Date(appt.date),
          })),
        });
      }
      if (storedDoctorData) {
        const parsed = JSON.parse(storedDoctorData);
        setDoctorData({
          ...parsed,
          appointments: parsed.appointments.map((appt: any) => ({
            ...appt,
            date: new Date(appt.date),
          })),
        });
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save patientData and doctorData to localStorage on change
  useEffect(() => {
    if (patientData.appointments.length > 0) {
      localStorage.setItem('mindfulGrovePatientData', JSON.stringify(patientData));
    }
  }, [patientData]);

  useEffect(() => {
    if (doctorData.appointments.length > 0) {
      localStorage.setItem('mindfulGroveDoctorData', JSON.stringify(doctorData));
    }
  }, [doctorData]);

  // Update user profile
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
        appointments: [...prev.appointments, appointment],
      }));
    } else if (user?.type === 'doctor') {
      setDoctorData(prev => ({
        ...prev,
        appointments: [...prev.appointments, appointment],
      }));
    }
  };

  // Cancel an appointment
  const cancelAppointment = (appointmentId: string) => {
    if (user?.type === 'patient') {
      setPatientData(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
        ),
      }));
    } else if (user?.type === 'doctor') {
      setDoctorData(prev => ({
        ...prev,
        appointments: prev.appointments.map(apt => 
          apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
        ),
      }));
    }
  };

  const login = async (email: string, password: string, userType: "doctor" | "patient" = 'patient') => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user: User = {
        id: Date.now().toString(),
        name: userType === 'doctor' ? `Dr. ${email.split('@')[0]}` : email.split('@')[0],
        email,
        type: userType,
        avatar: '/placeholder.svg',
        phone: '555-000-0000',
        age: userType === 'patient' ? 30 : undefined,
        address: userType === 'patient' ? '123 Grove St, Mindful City' : undefined,
        bio: userType === 'patient' ? 'Patient seeking mental health support.' : 'Healthcare professional.',
        specialty: userType === 'doctor' ? 'General Practice' : undefined,
        licenseNumber: userType === 'doctor' ? `LIC-${Date.now()}` : undefined,
        specialization: userType === 'doctor' ? 'General Practice' : undefined,
      };
      localStorage.setItem('mindfulGroveUser', JSON.stringify(user));
      setUser(user);
      if (userType === 'patient') {
        setPatientData({
          appointments: [],
          medicalHistory: [],
          medicalRecords: [],
        });
      } else {
        setDoctorData({
          appointments: [],
          patients: [],
          requests: [],
        });
      }
      toast("Login successful", {
        description: `Welcome to Mindful Grove${userType === 'doctor' ? ', Dr. ' + email.split('@')[0] : ''}!`
      });
      navigate(userType === 'doctor' ? '/DoctorDashboard' : '/PatientDashboard');
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
      navigate(userType === 'doctor' ? '/DoctorDashboard' : '/PatientDashboard');
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
    localStorage.removeItem('mindfulGrovePatientData');
    localStorage.removeItem('mindfulGroveDoctorData');
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
