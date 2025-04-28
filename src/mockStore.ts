// src/mockStore.ts
import { v4 as uuidv4 } from 'uuid';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Video Consultation' | 'In-Person';
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'sent';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

const mockStore = {
  users: [
    { id: 'patient1', name: 'Amit Sharma', email: 'amit@example.com', role: 'patient' },
    { id: 'patient2', name: 'Sneha Patel', email: 'sneha@example.com', role: 'patient' },
    { id: 'doctor1', name: 'Dr. Raj Patil', email: 'raj@example.com', role: 'doctor' },
    { id: 'doctor2', name: 'Dr. Priya Sharma', email: 'priya@example.com', role: 'doctor' },
  ] as User[],
  appointments: [] as Appointment[],
  messages: [] as Message[],

  addAppointment: (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: uuidv4() };
    mockStore.appointments.push(newAppointment);
    return newAppointment;
  },

  updateAppointmentStatus: (id: string, status: 'confirmed' | 'cancelled') => {
    const appointment = mockStore.appointments.find(appt => appt.id === id);
    if (appointment) {
      appointment.status = status;
    }
  },

  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date().toLocaleString(),
    };
    mockStore.messages.push(newMessage);
    return newMessage;
  },

  markMessageAsRead: (id: string) => {
    const message = mockStore.messages.find(msg => msg.id === id);
    if (message && message.status === 'unread') {
      message.status = 'read';
    }
  },
};

export default mockStore;