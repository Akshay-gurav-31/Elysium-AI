import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const MedicalHistorySection = () => {
  const { patientData } = useAuth();
  const { toast } = useToast();
  
  const [medicalHistory, setMedicalHistory] = useState<string>(
    patientData?.medicalHistory ? String(patientData.medicalHistory) : ""
  );
  
  const handleSaveMedicalHistory = () => {
    if (patientData) {
      const updatedPatientData = {
        ...patientData,
        medicalHistory
      };
      
      // Update in local storage
      localStorage.setItem('mindfulGrovePatient', JSON.stringify(updatedPatientData));
      
      toast({
        title: "Medical History Updated",
        description: "Your medical history has been saved."
      });
    }
  };

  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription className="text-gray-400">
          Keep track of your mental health journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="medicalHistory" className="text-gray-300">Your Medical History</Label>
          <Textarea
            id="medicalHistory"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="Record your mental health history, past diagnoses, treatments, etc."
            className="dark-input resize-none"
            rows={8}
          />
          <Button 
            className="mindful-btn-primary mt-2"
            onClick={handleSaveMedicalHistory}
          >
            Save Medical History
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Past Consultations</h3>
          {patientData?.appointments && patientData.appointments.filter(apt => apt.status === 'completed').length > 0 ? (
            <div className="space-y-4">
              {patientData.appointments
                .filter(apt => apt.status === 'completed')
                .map((appointment) => (
                  <Card key={appointment.id} className="bg-neutral-800 border-neutral-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{appointment.doctorName}</h4>
                          <p className="text-gray-400 text-sm">{format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
                          {appointment.notes && (
                            <p className="text-gray-400 mt-2 text-sm">{appointment.notes}</p>
                          )}
                        </div>
                        <Badge className="bg-blue-800 text-white">Completed</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No past consultations found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistorySection;
