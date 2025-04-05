
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
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
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials check
      if (email === 'demo@example.com' && password === 'password') {
        const demoUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: '/placeholder.svg'
        };
        
        localStorage.setItem('mindfulGroveUser', JSON.stringify(demoUser));
        setUser(demoUser);
        
        toast({
          title: "Login successful",
          description: "Welcome to Mindful Grove!",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@example.com / password",
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
  
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: '/placeholder.svg'
      };
      
      localStorage.setItem('mindfulGroveUser', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
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
