
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PatientRegisterForm from "@/components/auth/PatientRegisterForm";
import DoctorRegisterForm from "@/components/auth/DoctorRegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, User } from "lucide-react";

const Register = () => {
  const [registrationType, setRegistrationType] = useState("patient");

  return (
    <>
      <Header />
      <main className="min-h-screen-minus-header flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-muted-foreground">
              Begin your mental health journey with Mindful Grove
            </p>
          </div>
          
          <Tabs defaultValue="patient" onValueChange={setRegistrationType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Patient</span>
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                <span>Healthcare Provider</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient">
              <PatientRegisterForm />
            </TabsContent>
            
            <TabsContent value="doctor">
              <DoctorRegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
