
import React from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-dark mb-6">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Comprehensive mental health support combining AI technology with professional human care.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <CardTitle>AI Chat Support</CardTitle>
                  <CardDescription>Available 24/7 for initial assessment and support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Our AI chat system provides immediate support, preliminary assessments, and coping strategies. 
                    It's designed to be a first point of contact and can help determine if you need professional assistance.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/login">Start Chatting</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path>
                    </svg>
                  </div>
                  <CardTitle>Video Consultations</CardTitle>
                  <CardDescription>Connect with licensed therapists from anywhere</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Schedule secure video sessions with our network of licensed therapists and counselors. 
                    Get professional help from the comfort of your home, with flexible appointment times.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/login">Book Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                    </svg>
                  </div>
                  <CardTitle>Personalized Care Plans</CardTitle>
                  <CardDescription>Tailored mental health journeys</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Receive a customized care plan based on your needs, combining AI-assisted tools, 
                    professional therapy sessions, and ongoing progress tracking to support your mental health journey.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/login">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest-dark mb-8 text-center">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-primary/30"></div>
                
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary flex items-center justify-center z-10">
                    <span className="text-white text-xl font-semibold">1</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Initial AI Assessment</h3>
                    <p className="text-gray-600">
                      Begin with our AI chat system that helps understand your concerns and provides 
                      immediate support. The system assesses your needs and recommends next steps.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start mb-12">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary flex items-center justify-center z-10">
                    <span className="text-white text-xl font-semibold">2</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Connect with Professionals</h3>
                    <p className="text-gray-600">
                      Based on your assessment, we connect you with appropriate mental health professionals 
                      from our network, matching you with specialists suited to your specific needs.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary flex items-center justify-center z-10">
                    <span className="text-white text-xl font-semibold">3</span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">
                      Receive continuous care through scheduled sessions with your therapist, complemented by 
                      AI-powered tools to track your progress and provide support between appointments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-forest-dark mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join Mindful Grove today and take the first step toward better mental health with our compassionate, 
              innovative approach to care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
