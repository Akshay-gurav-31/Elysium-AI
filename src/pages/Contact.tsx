
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "We've received your message and will respond soon.",
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-dark mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Have questions or need support? Our team is here to help you.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-forest-dark mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Whether you have questions about our services, need technical support,
                  or want to explore partnership opportunities, we'd love to hear from you.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Our Location</h3>
                      <p className="text-gray-600">123 Healing Street<br />San Francisco, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email</h3>
                      <p className="text-gray-600">support@mindfulgrove.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-forest-dark mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-forest-dark mb-6">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-2">How secure is my data?</h3>
                <p className="text-gray-600">
                  Your privacy is our priority. All data is encrypted and stored securely. We comply with HIPAA and other relevant privacy regulations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">How do I get started?</h3>
                <p className="text-gray-600">
                  Simply create an account, complete our initial assessment, and you'll be guided through the process of accessing the right support for you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Are your therapists licensed?</h3>
                <p className="text-gray-600">
                  Yes, all our therapists are fully licensed professionals with extensive experience in their fields of expertise.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What if I need immediate help?</h3>
                <p className="text-gray-600">
                  If you're experiencing a mental health emergency, please call your local emergency services or a crisis hotline immediately.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
