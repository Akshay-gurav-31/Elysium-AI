import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [patientForm, setPatientForm] = useState({
    email: "",
    password: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('mindfulGroveUser') || '{}');
      const targetPath = user.type === 'doctor' ? "/DoctorDashboard" : "/PatientDashboard";
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patientForm.email)) {
      setIsSubmitting(false);
      toast("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    login(patientForm.email, patientForm.password, 'patient')
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast("Login Failed", {
          description: "Please check your credentials and try again.",
        });
      });
  };

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(doctorForm.email)) {
      setIsSubmitting(false);
      toast("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    login(doctorForm.email, doctorForm.password, 'doctor')
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast("Login Failed", {
          description: "Please check your credentials and try again.",
        });
      });
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-navy-900 to-black py-12">
        <div className="w-full max-w-md px-4">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-navy-800/30 backdrop-blur-md border border-navy-600/20 rounded-lg">
              <TabsTrigger 
                value="patient" 
                className="data-[state=active]:bg-navy-700/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Patient Login
              </TabsTrigger>
              <TabsTrigger 
                value="doctor" 
                className="data-[state=active]:bg-navy-700/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Doctor Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <Card className="bg-navy-800/30 backdrop-blur-md border border-navy-600/20 shadow-lg text-white">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Patient Login</CardTitle>
                  <CardDescription className="text-center text-gray-300/80">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePatientSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email" className="text-gray-300/90">Email</Label>
                      <Input
                        id="patient-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={patientForm.email}
                        onChange={handlePatientChange}
                        required
                        className="bg-white/10 border-navy-600/50 text-white placeholder-gray-400/70 focus:bg-white/15 focus:border-navy-500 focus:ring-1 focus:ring-navy-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="patient-password" className="text-gray-300/90">Password</Label>
                        <Link 
                          to="/reset-password" 
                          className="text-sm text-blue-300/80 hover:text-blue-200 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="patient-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={patientForm.password}
                        onChange={handlePatientChange}
                        required
                        className="bg-white/10 border-navy-600/50 text-white placeholder-gray-400/70 focus:bg-white/15 focus:border-navy-500 focus:ring-1 focus:ring-navy-500/50"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-navy-600/90 hover:bg-navy-500/90 text-white shadow-md transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </Button>
                    <div className="text-center text-sm text-gray-300/80">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-blue-300/80 hover:text-blue-200 font-medium transition-colors">
                        Sign up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor">
              <Card className="bg-navy-800/30 backdrop-blur-md border border-navy-600/20 shadow-lg text-white">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Doctor Login</CardTitle>
                  <CardDescription className="text-center text-gray-300/80">
                    Login to your professional account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDoctorSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email" className="text-gray-300/90">Professional Email</Label>
                      <Input
                        id="doctor-email"
                        name="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={doctorForm.email}
                        onChange={handleDoctorChange}
                        required
                        className="bg-white/10 border-navy-600/50 text-white placeholder-gray-400/70 focus:bg-white/15 focus:border-navy-500 focus:ring-1 focus:ring-navy-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctor-password" className="text-gray-300/90">Password</Label>
                        <Link 
                          to="/reset-password" 
                          className="text-sm text-blue-300/80 hover:text-blue-200 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="doctor-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={doctorForm.password}
                        onChange={handleDoctorChange}
                        required
                        className="bg-white/10 border-navy-600/50 text-white placeholder-gray-400/70 focus:bg-white/15 focus:border-navy-500 focus:ring-1 focus:ring-navy-500/50"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-navy-600/90 hover:bg-navy-500/90 text-white shadow-md transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </Button>
                    <div className="text-center text-sm text-gray-300/80">
                      Not registered as a doctor?{" "}
                      <Link to="/Signup" className="text-blue-300/80 hover:text-blue-200 font-medium transition-colors">
                        Apply here
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
