
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MainLayout from "@/components/layout/MainLayout";

const Login = () => {
  // Patient login state
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [rememberPatient, setRememberPatient] = useState(false);
  
  // Doctor login state
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [rememberDoctor, setRememberDoctor] = useState(false);
  
  const { login, loading } = useAuth();

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(patientEmail, patientPassword, "patient");
  };

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(doctorEmail, doctorPassword, "doctor");
  };

  return (
    <MainLayout>
      <div className="container flex flex-col items-center justify-center h-full py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-mindful-primary">Mindful Grove</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to access your mental wellbeing resources
          </p>
        </div>
        
        <Card className="w-full max-w-md border-mindful-primary/20">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="patient">
                Patient Login
              </TabsTrigger>
              <TabsTrigger value="provider">
                Healthcare Provider
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <form onSubmit={handlePatientLogin}>
                <CardHeader>
                  <CardTitle>Patient Login</CardTitle>
                  <CardDescription>
                    Access your personalized mental health dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input 
                      id="patient-email" 
                      type="email" 
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="patient-password">Password</Label>
                      <Link to="#" className="text-sm text-mindful-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="patient-password" 
                      type="password"
                      value={patientPassword}
                      onChange={(e) => setPatientPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="patient-remember"
                      className="h-4 w-4 rounded border-gray-300 text-mindful-primary focus:ring-mindful-primary"
                      checked={rememberPatient}
                      onChange={(e) => setRememberPatient(e.target.checked)}
                    />
                    <label htmlFor="patient-remember" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-mindful-primary hover:bg-mindful-secondary"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-mindful-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <div className="mt-4 text-center text-xs text-gray-500">
                    <p>Demo access: patient@example.com / password</p>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="provider">
              <form onSubmit={handleDoctorLogin}>
                <CardHeader>
                  <CardTitle>Provider Login</CardTitle>
                  <CardDescription>
                    Access your provider portal and patient management tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input 
                      id="doctor-email" 
                      type="email" 
                      placeholder="doctor@example.com"
                      value={doctorEmail}
                      onChange={(e) => setDoctorEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="doctor-password">Password</Label>
                      <Link to="#" className="text-sm text-mindful-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="doctor-password" 
                      type="password"
                      value={doctorPassword}
                      onChange={(e) => setDoctorPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-4">
                    <RadioGroup defaultValue="doctor">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="doctor" />
                        <Label htmlFor="doctor">Doctor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="therapist" id="therapist" />
                        <Label htmlFor="therapist">Therapist</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="doctor-remember"
                      className="h-4 w-4 rounded border-gray-300 text-mindful-primary focus:ring-mindful-primary"
                      checked={rememberDoctor}
                      onChange={(e) => setRememberDoctor(e.target.checked)}
                    />
                    <label htmlFor="doctor-remember" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-mindful-primary hover:bg-mindful-secondary"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <p className="mt-4 text-center text-sm">
                    Don't have a provider account?{" "}
                    <Link to="/signup" className="text-mindful-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <div className="mt-4 text-center text-xs text-gray-500">
                    <p>Demo access: doctor@example.com / password</p>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
