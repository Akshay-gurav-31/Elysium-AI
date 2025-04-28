
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, MessageSquare, Phone, VideoIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface PatientRequest {
  id: string;
  patientName: string;
  patientId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: Date;
  severity: 'low' | 'medium' | 'high';
  patientAvatar?: string;
}

interface Patient {
  id: string;
  name: string;
  contactInfo: string;
  lastVisit?: Date;
  notes?: string;
  status: 'active' | 'inactive';
}

const DoctorRequestsSection = () => {
  const { toast } = useToast();
  
  const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([
    {
      id: "req1",
      patientName: "John Doe",
      patientId: "p123",
      message: "I've been experiencing severe anxiety and panic attacks lately. Can we schedule an urgent session?",
      status: 'pending',
      date: new Date(Date.now() - 86400000),
      severity: 'high'
    },
    {
      id: "req2",
      patientName: "Emma Wilson",
      patientId: "p456",
      message: "Would like to discuss my medication side effects. I'm experiencing dizziness and nausea.",
      status: 'pending',
      date: new Date(Date.now() - 172800000),
      severity: 'medium'
    },
    {
      id: "req3",
      patientName: "Michael Brown",
      patientId: "p789",
      message: "Need to follow up on my treatment plan for depression. Feeling some improvement but still having issues.",
      status: 'accepted',
      date: new Date(Date.now() - 259200000),
      severity: 'medium'
    }
  ]);
  
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
  
  const handleAcceptRequest = (requestId: string) => {
    setPatientRequests(prev => 
      prev.map(req => 
        req.id === requestId ? {...req, status: 'accepted'} : req
      )
    );
    
    const request = patientRequests.find(req => req.id === requestId);
    if (request) {
      const patientExists = myPatients.some(pat => pat.id === request.patientId);
      
      if (!patientExists) {
        setMyPatients(prev => [
          ...prev,
          {
            id: request.patientId,
            name: request.patientName,
            contactInfo: `patient-${request.patientId}@example.com`,
            lastVisit: new Date(),
            status: 'active'
          }
        ]);
      }
    }
    
    toast({
      title: "Request Accepted",
      description: "You can now communicate with this patient.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setPatientRequests(prev => 
      prev.map(req => 
        req.id === requestId ? {...req, status: 'rejected'} : req
      )
    );
    
    toast({
      title: "Request Rejected",
      description: "The patient will be notified.",
    });
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return <Badge variant="outline" className="bg-red-950/30 text-red-400 border-red-800">Urgent</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="dark-card bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white">Patient Consultation Requests</CardTitle>
          <CardDescription className="text-gray-400">
            Review and respond to patient requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patientRequests.filter(req => req.status === 'pending').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No pending patient requests.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {patientRequests
                .filter(req => req.status === 'pending')
                .map(request => (
                  <Card key={request.id} className="bg-neutral-800 border-neutral-700 shadow-md relative overflow-hidden">
                    {request.severity === 'high' && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    )}
                    {request.severity === 'medium' && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-sm">
                            {request.patientName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{request.patientName}</h4>
                            <p className="text-xs text-gray-400">{formatDate(request.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-900/30 text-yellow-400 border-yellow-800">
                            Pending
                          </Badge>
                          {getSeverityBadge(request.severity)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{request.message}</p>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-800 text-red-400 hover:bg-red-950"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <XCircle size={16} className="mr-1" />
                          Decline
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-800 hover:bg-green-700 text-white"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Accept
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="dark-card bg-neutral-800 border-neutral-700 mt-6">
        <CardHeader>
          <CardTitle className="text-white">Active Patients</CardTitle>
          <CardDescription className="text-gray-400">
            Patients you've accepted for consultation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patientRequests.filter(req => req.status === 'accepted').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No active patients yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {patientRequests
                .filter(req => req.status === 'accepted')
                .map(request => (
                  <Card key={request.id} className="bg-neutral-800 border-neutral-700 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-sm">
                            {request.patientName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{request.patientName}</h4>
                            <p className="text-xs text-gray-400">{formatDate(request.date)}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-800">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{request.message}</p>
                      <div className="flex justify-end gap-2">
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
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default DoctorRequestsSection;