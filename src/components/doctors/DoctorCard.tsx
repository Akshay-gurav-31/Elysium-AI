
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    experience: number;
    image?: string;
    availability?: string;
    badges?: string[];
  };
  onBook?: (doctorId: string, type: 'chat' | 'video' | 'phone') => void;
}

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
  const [consultationType, setConsultationType] = useState<'chat' | 'video' | 'phone' | null>(null);
  
  const handleBookAppointment = () => {
    if (consultationType && onBook) {
      onBook(doctor.id, consultationType);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-hover transition-shadow duration-300">
      <div className="bg-gradient-to-r from-secondary to-accent h-4"></div>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-muted">
          <AvatarImage src={doctor.image} />
          <AvatarFallback className="bg-primary text-white text-lg">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
          <div className="flex items-center gap-1 mt-1">
            {Array(5).fill(0).map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < doctor.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm ml-1 text-muted-foreground">({doctor.rating.toFixed(1)})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Experience:</span>
            <span className="font-medium">{doctor.experience} years</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Availability:</span>
            <span className="font-medium">{doctor.availability || "Available today"}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {doctor.badges?.map((badge, index) => (
              <Badge key={index} variant="secondary" className="bg-muted">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex justify-between w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={consultationType === 'chat' ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setConsultationType('chat')}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Text-based consultation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={consultationType === 'video' ? "default" : "outline"}
                  size="sm"
                  className="flex-1 mx-2"
                  onClick={() => setConsultationType('video')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                  >
                    <path d="m22 8-6 4 6 4V8Z"/>
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
                  </svg>
                  Video
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Video call consultation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={consultationType === 'phone' ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setConsultationType('phone')}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice call consultation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button 
          className="w-full"
          disabled={!consultationType}
          onClick={handleBookAppointment}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
