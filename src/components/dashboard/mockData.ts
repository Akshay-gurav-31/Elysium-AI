
import { ConsultationType } from "./FindDoctorTab";

export const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    rating: 4.9,
    experience: 8,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    availability: "Available today",
    badges: ["Anxiety", "Depression", "Trauma"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    rating: 4.7,
    experience: 12,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    availability: "Next available: Tomorrow",
    badges: ["Medication", "ADHD", "Bipolar Disorder"]
  },
  {
    id: "3",
    name: "Dr. Emma Rodriguez",
    specialty: "Therapist",
    rating: 4.8,
    experience: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    availability: "Available today",
    badges: ["Stress", "Relationships", "Self-esteem"]
  }
];

export const mockAppointments = [
  {
    id: "101",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: new Date(Date.now() + 86400000 * 2),
    timeSlot: "10:00 AM",
    consultationType: "video" as ConsultationType,
    status: "confirmed"
  },
];
