import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState("patient");

  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [doctorForm, setDoctorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handlePatientChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDoctorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDoctorForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked, type) => {
    if (type === "patient") {
      setPatientForm((prev) => ({ ...prev, agreeTerms: checked }));
    } else {
      setDoctorForm((prev) => ({ ...prev, agreeTerms: checked }));
    }
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();

    if (patientForm.password !== patientForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Account Created",
        description: "Welcome to Mindful Grove! You can now log in.",
      });
      navigate("/login"); // Redirect to login after signup
    }, 1500);
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();

    if (doctorForm.password !== doctorForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Professional Application Submitted",
        description: "Thank you for applying. We'll review your credentials and contact you shortly.",
      });
      navigate("/login"); // Redirect to login after application submission
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-black p-4">
        <div className="w-full max-w-5xl">
          <div className="flex mb-6 bg-neutral-gray rounded-lg border border-navy-blue-light border-opacity-30 w-fit mx-auto">
            <button
              onClick={() => setActiveForm("patient")}
              className={`px-6 py-2 text-sm text-light-gray ${
                activeForm === "patient"
                  ? "bg-navy-blue text-light-gray animate-yellowFlash"
                  : "bg-neutral-gray"
              } rounded-l-lg transition-colors duration-200`}
            >
              Patient Signup
            </button>
            <button
              onClick={() => setActiveForm("doctor")}
              className={`px-6 py-2 text-sm text-light-gray ${
                activeForm === "doctor"
                  ? "bg-navy-blue text-light-gray animate-yellowFlash"
                  : "bg-neutral-gray"
              } rounded-r-lg transition-colors duration-200`}
            >
              Doctor Signup
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeForm === "patient" ? (
              <Card className="shadow-lg border-navy-blue-light bg-neutral-gray text-light-gray">
                <CardHeader className="space-y-1 py-3">
                  <CardTitle className="text-xl font-bold text-center">Create Patient Account</CardTitle>
                  <CardDescription className="text-center text-gray-400 text-sm">
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <form onSubmit={handlePatientSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="patient-firstName" className="text-light-gray text-sm">First Name</Label>
                        <Input
                          id="patient-firstName"
                          name="firstName"
                          value={patientForm.firstName}
                          onChange={handlePatientChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="patient-lastName" className="text-light-gray text-sm">Last Name</Label>
                        <Input
                          id="patient-lastName"
                          name="lastName"
                          value={patientForm.lastName}
                          onChange={handlePatientChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="patient-email" className="text-light-gray text-sm">Email</Label>
                      <Input
                        id="patient-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={patientForm.email}
                        onChange={handlePatientChange}
                        required
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="patient-password" className="text-light-gray text-sm">Password</Label>
                        <Input
                          id="patient-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={patientForm.password}
                          onChange={handlePatientChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="patient-confirmPassword" className="text-light-gray text-sm">Confirm Password</Label>
                        <Input
                          id="patient-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={patientForm.confirmPassword}
                          onChange={handlePatientChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="patient-terms"
                        checked={patientForm.agreeTerms}
                        onCheckedChange={(checked) => handleCheckboxChange(checked, "patient")}
                        required
                      />
                      <Label htmlFor="patient-terms" className="text-xs font-medium text-light-gray leading-none">
                        I agree to the{" "}
                        <Link to="/terms" className="text-navy-blue hover:text-navy-blue-light transition-colors duration-200">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-navy-blue hover:text-navy-blue-light transition-colors duration-200">
                          privacy policy
                        </Link>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-navy-blue hover:bg-navy-blue-light text-light-gray border border-navy-blue-light border-opacity-30 text-sm h-9 mt-4"
                      disabled={isSubmitting || !patientForm.agreeTerms}
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                    <div className="text-center text-xs text-gray-400 pt-2">
                      Already have an account?{" "}
                      <Link to="/login" className="text-navy-blue hover:text-navy-blue-light font-medium transition-colors duration-200">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-navy-blue-light bg-neutral-gray text-light-gray">
                <CardHeader className="space-y-1 py-3">
                  <CardTitle className="text-xl font-bold text-center">Professional Registration</CardTitle>
                  <CardDescription className="text-center text-gray-400 text-sm">
                    Join our network of mental health professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <form onSubmit={handleDoctorSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="doctor-firstName" className="text-light-gray text-sm">First Name</Label>
                        <Input
                          id="doctor-firstName"
                          name="firstName"
                          value={doctorForm.firstName}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="doctor-lastName" className="text-light-gray text-sm">Last Name</Label>
                        <Input
                          id="doctor-lastName"
                          name="lastName"
                          value={doctorForm.lastName}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="doctor-email" className="text-light-gray text-sm">Professional Email</Label>
                      <Input
                        id="doctor-email"
                        name="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={doctorForm.email}
                        onChange={handleDoctorChange}
                        required
                        className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="doctor-specialization" className="text-light-gray text-sm">Specialization</Label>
                        <Input
                          id="doctor-specialization"
                          name="specialization"
                          placeholder="e.g., Clinical Psychologist"
                          value={doctorForm.specialization}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="doctor-licenseNumber" className="text-light-gray text-sm">License Number</Label>
                        <Input
                          id="doctor-licenseNumber"
                          name="licenseNumber"
                          placeholder="Your professional license"
                          value={doctorForm.licenseNumber}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="doctor-password" className="text-light-gray text-sm">Password</Label>
                        <Input
                          id="doctor-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={doctorForm.password}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="doctor-confirmPassword" className="text-light-gray text-sm">Confirm Password</Label>
                        <Input
                          id="doctor-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={doctorForm.confirmPassword}
                          onChange={handleDoctorChange}
                          required
                          className="bg-black border-navy-blue-light text-light-gray placeholder-gray-500 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="doctor-terms"
                        checked={doctorForm.agreeTerms}
                        onCheckedChange={(checked) => handleCheckboxChange(checked, "doctor")}
                        required
                      />
                      <Label htmlFor="doctor-terms" className="text-xs font-medium text-light-gray leading-none">
                        I agree to the{" "}
                        <Link to="/terms" className="text-navy-blue hover:text-navy-blue-light transition-colors duration-200">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-navy-blue hover:text-navy-blue-light transition-colors duration-200">
                          privacy policy
                        </Link>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-navy-blue hover:bg-navy-blue-light text-light-gray border border-navy-blue-light border-opacity-30 text-sm h-9 mt-4"
                      disabled={isSubmitting || !doctorForm.agreeTerms}
                    >
                      {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    </Button>
                    <div className="text-center text-xs text-gray-400 pt-2">
                      Already registered?{" "}
                      <Link to="/login" className="text-navy-blue hover:text-navy-blue-light font-medium transition-colors duration-200">
                        Sign in
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <div className="flex flex-col justify-center items-center bg-neutral-gray rounded-lg border border-navy-blue-light border-opacity-30 p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-light-gray mb-2">
                  {activeForm === "patient" ? "Are you a healthcare professional?" : "Need mental health support?"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {activeForm === "patient" 
                    ? "Join our network of trusted mental health professionals and help people on their wellness journey."
                    : "Create a patient account to access our mental health resources and connect with professionals."}
                </p>
              </div>
              <Button
                onClick={() => setActiveForm(activeForm === "patient" ? "doctor" : "patient")}
                className="bg-navy-blue hover:bg-navy-blue-light text-light-gray border border-navy-blue-light border-opacity-30 text-sm h-9 px-6"
              >
                {activeForm === "patient" ? "Register as Professional" : "Sign Up as Patient"}
              </Button>
              <div className="mt-6 text-center">
                <h3 className="text-light-gray text-sm font-medium mb-2">Benefits of {activeForm === "patient" ? "Professional" : "Patient"} Account</h3>
                <ul className="text-gray-400 text-xs space-y-1">
                  {activeForm === "patient" ? (
                    <>
                      <li>✓ Connect with patients seeking help</li>
                      <li>✓ Manage your practice efficiently</li>
                      <li>✓ Access professional resources</li>
                      <li>✓ Get verified by our team</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Access to mental health resources</li>
                      <li>✓ Connect with verified professionals</li>
                      <li>✓ Track your wellness journey</li>
                      <li>✓ Secure and confidential platform</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;