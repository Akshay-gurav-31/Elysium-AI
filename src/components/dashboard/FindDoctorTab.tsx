
import { useState } from "react";
import DoctorCard from "@/components/doctors/DoctorCard";
import AppointmentForm from "@/components/appointments/AppointmentForm";

// Define the consultation type
export type ConsultationType = 'chat' | 'video' | 'phone';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  image?: string;
  availability?: string;
  badges?: string[];
}

interface FindDoctorTabProps {
  doctors: Doctor[];
  selectedDoctor: string | null;
  consultationType: ConsultationType;
  showAppointmentForm: boolean;
  onBookAppointment: (doctorId: string, type: ConsultationType) => void;
  onAppointmentSubmit: (data: any) => void;
  onCancelAppointment: () => void;
}

const FindDoctorTab = ({
  doctors,
  selectedDoctor,
  consultationType,
  showAppointmentForm,
  onBookAppointment,
  onAppointmentSubmit,
  onCancelAppointment
}: FindDoctorTabProps) => {
  const doctor = doctors.find(doc => doc.id === selectedDoctor);

  return (
    <>
      {showAppointmentForm && doctor ? (
        <div className="max-w-md mx-auto">
          <AppointmentForm 
            doctorId={doctor.id}
            doctorName={doctor.name}
            consultationType={consultationType}
            onSubmit={onAppointmentSubmit}
            onCancel={onCancelAppointment}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Mental Health Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor}
                onBook={onBookAppointment}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FindDoctorTab;
