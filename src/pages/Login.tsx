import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { toast } = useToast();
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
      navigate("/dashboard");
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

    setTimeout(() => {
      setIsSubmitting(false);
      const user = {
        id: "p123",
        email: patientForm.email,
        name: patientForm.email.split("@")[0],
        type: "patient" as const,
      };
      login(user);
      toast({
        title: "Login Successful",
        description: "Welcome back to Mindful Grove!",
      });
      navigate("/patient-dashboard");
    }, 1500);
  };

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const user = {
        id: "d456",
        email: doctorForm.email,
        name: "Dr. " + doctorForm.email.split("@")[0],
        type: "doctor" as const,
      };
      login(user);
      toast({
        title: "Professional Login Successful",
        description: "Welcome back to the Mindful Grove professional portal!",
      });
      navigate("/doctor-dashboard");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-black py-12">
        <div className="w-full max-w-md px-4">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-gray">
              <TabsTrigger
                value="patient"
                className="border border-navy-blue-light border-opacity-30 data-[state=active]:bg-navy-blue data-[state=active]:text-light-gray text-light-gray"
              >
                Patient Login
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="border border-navy-blue-light border-opacity-30 data-[state=active]:bg-navy-blue data-[state=active]:text-light-gray text-light-gray"
              >
                Doctor Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <Card className="shadow-lg border-navy-blue-light bg-neutral-gray text-light-gray">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Patient Login</CardTitle>
                  <CardDescription className="text-center text-gray-400">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePatientSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email" className="text-light-gray">Email</Label>
                      <Input
                        id="patient-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={patientForm.email}
                        onChange={handlePatientChange}
                        required
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="patient-password" className="text-light-gray">Password</Label>
                        <Link
                          to="/reset-password"
                          className="text-sm text-navy-blue hover:text-navy-blue-light"
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
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-navy-blue hover:bg-navy-blue-light text-light-gray border border-navy-blue-light border-opacity-30"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </Button>
                    <div className="text-center text-sm text-gray-400">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-navy-blue hover:text-navy-blue-light font-medium"
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor">
              <Card className="shadow-lg border-navy-blue-light bg-neutral-gray text-light-gray">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Doctor Login</CardTitle>
                  <CardDescription className="text-center text-gray-400">
                    Login to your professional account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDoctorSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email" className="text-light-gray">Professional Email</Label>
                      <Input
                        id="doctor-email"
                        name="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={doctorForm.email}
                        onChange={handleDoctorChange}
                        required
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctor-password" className="text-light-gray">Password</Label>
                        <Link
                          to="/reset-password"
                          className="text-sm text-navy-blue hover:text-navy-blue-light"
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
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-navy-blue hover:bg-navy-blue-light text-light-gray border border-navy-blue-light border-opacity-30"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </Button>
                    <div className="text-center text-sm text-gray-400">
                      Not registered as a doctor?{" "}
                      <Link
                        to="/doctor-signup"
                        className="text-navy-blue hover:text-navy-blue-light font-medium"
                      >
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