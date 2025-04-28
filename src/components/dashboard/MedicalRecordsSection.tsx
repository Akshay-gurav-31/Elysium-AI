

import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Eye, Download, Trash2 } from "lucide-react";

interface MedicalRecord {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  uploadDate: Date;
  url: string;
}

const MedicalRecordsSection = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Medical records state
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: "rec1",
      name: "Blood Test Results.pdf",
      type: "pdf",
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      url: "#"
    },
    {
      id: "rec2",
      name: "Brain Scan.jpg",
      type: "image",
      uploadDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      url: "#"
    }
  ]);
  
  const handleUploadRecord = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      let fileType: 'pdf' | 'image' | 'text' = 'pdf';
      
      if (file.type.includes('image')) {
        fileType = 'image';
      } else if (file.type.includes('text')) {
        fileType = 'text';
      }
      
      const newRecord: MedicalRecord = {
        id: `rec-${Date.now()}`,
        name: file.name,
        type: fileType,
        uploadDate: new Date(),
        url: URL.createObjectURL(file)
      };
      
      setMedicalRecords(prev => [...prev, newRecord]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleDeleteRecord = (recordId: string) => {
    setMedicalRecords(prev => prev.filter(rec => rec.id !== recordId));
    
    toast({
      title: "Record Deleted",
      description: "The medical record has been deleted."
    });
  };

  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription className="text-gray-400">
          Upload and manage your medical documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-neutral-800 border-2 border-dashed border-neutral-600 rounded-lg p-8 text-center">
            <Upload className="h-10 w-10 text-neutral-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Upload Medical Records</h3>
            <p className="text-gray-400 mb-4">Drag and drop files here or click the button below</p>
            <Button 
              onClick={handleUploadRecord}
              className="mindful-btn-primary"
            >
              <Upload size={16} className="mr-2" /> Upload Files
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG, TXT</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your Medical Records</h3>
          {medicalRecords.length > 0 ? (
            <div className="space-y-4">
              {medicalRecords.map(record => (
                <Card key={record.id} className="bg-neutral-800 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {record.type === 'pdf' && <FileText className="text-red-400" size={20} />}
                        {record.type === 'image' && <Upload className="text-blue-400" size={20} />}
                        {record.type === 'text' && <FileText className="text-green-400" size={20} />}
                        <div>
                          <h4 className="text-white font-medium">{record.name}</h4>
                          <p className="text-sm text-gray-400">Uploaded on {format(new Date(record.uploadDate), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-blue-400 border-blue-800">
                          <Eye size={16} className="mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-400 border-green-800">
                          <Download size={16} className="mr-1" /> Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-400 border-red-800"
                          onClick={() => handleDeleteRecord(record.id)}
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-neutral-800 rounded-lg">
              <p className="text-gray-400">You haven't uploaded any medical records yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsSection;
