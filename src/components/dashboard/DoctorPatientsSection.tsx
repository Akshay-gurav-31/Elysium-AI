

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, VideoIcon } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  contactInfo: string;
  lastVisit?: Date;
  notes?: string;
  status: 'active' | 'inactive';
}

const DoctorPatientsSection = () => {
  const { toast } = useToast();
  
  const [myPatients, setMyPatients] = useState<Patient[]>([
    {
      id: "p789",
      name: "Michael Brown",
      contactInfo: "michael.b@example.com",
      lastVisit: new Date(Date.now() - 259200000),
      notes: "Patient showing signs of improvement with current medication.",
      status: 'active'
    }
  ]);
  
  const handleAddPatientNote = (patientId: string, note: string) => {
    setMyPatients(prev => 
      prev.map(pat => 
        pat.id === patientId ? {...pat, notes: note} : pat
      )
    );
    
    toast({
      title: "Note Added",
      description: "Your note has been saved."
    });
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  return (
    <Card className="dark-card bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">My Patients</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your patient relationships and records
        </CardDescription>
      </CardHeader>
      <CardContent>
        {myPatients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Start accepting patient requests to build your patient list.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {myPatients.map(patient => (
              <Card key={patient.id} className="bg-neutral-700 border-neutral-600">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-600 flex items-center justify-center text-lg text-white">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{patient.name}</h4>
                        <p className="text-gray-400 text-sm">{patient.contactInfo}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={patient.status === 'active' ? 'bg-green-800 text-white' : 'bg-gray-700 text-gray-300'}>
                            {patient.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                          {patient.lastVisit && (
                            <span className="text-xs text-gray-400">
                              Last visit: {formatDate(new Date(patient.lastVisit))}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-800 text-blue-400 hover:bg-blue-950"
                      >
                        <MessageSquare size={16} className="mr-1" />
                        Chat
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="border-purple-800 text-purple-400 hover:bg-purple-950"
                      >
                        <Phone size={16} className="mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-mindful-primary hover:bg-mindful-secondary text-white"
                      >
                        <VideoIcon size={16} className="mr-1" />
                        Video
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor={`notes-${patient.id}`} className="text-gray-300 text-sm">Patient Notes</Label>
                    <div className="flex items-start gap-2 mt-1">
                      <Textarea
                        id={`notes-${patient.id}`}
                        value={patient.notes || ''}
                        onChange={(e) => {
                          setMyPatients(prev => 
                            prev.map(pat => 
                              pat.id === patient.id ? {...pat, notes: e.target.value} : pat
                            )
                          );
                        }}
                        placeholder="Add notes about this patient..."
                        className="bg-neutral-800 border-neutral-600 text-white text-sm resize-none flex-1"
                        rows={2}
                      />
                      <Button 
                        className="bg-mindful-primary hover:bg-mindful-secondary text-white"
                        size="sm"
                        onClick={() => handleAddPatientNote(patient.id, patient.notes || '')}
                      >
                        Save Note
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorPatientsSection;
