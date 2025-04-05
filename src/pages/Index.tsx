
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted to-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Mental Health Support,
              <br />
              <span className="text-primary">When You Need It Most</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              AI-powered triage and professional human care for your mental wellbeing journey
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Mindful Grove Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines AI technology with professional mental health support to provide you with the care you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Assessment</h3>
                <p className="text-muted-foreground">
                  Start with our AI chatbot for an initial assessment of your mental health needs.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m16 10-4 4-4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Matching</h3>
                <p className="text-muted-foreground">
                  Get matched with the right mental health professional based on your specific needs.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Consultations</h3>
                <p className="text-muted-foreground">
                  Choose from chat, video, or phone consultations based on your comfort and preference.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Features that put your mental health first</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/20 p-2 rounded-full h-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Private & Secure</h3>
                      <p className="text-muted-foreground">
                        Your data and conversations are encrypted and protected, ensuring your privacy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary/20 p-2 rounded-full h-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                        <path d="M10 9H8"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Progress Tracking</h3>
                      <p className="text-muted-foreground">
                        Monitor your mental health journey with personalized progress reports.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary/20 p-2 rounded-full h-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" x2="22" y1="12" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">24/7 Accessibility</h3>
                      <p className="text-muted-foreground">
                        Access support whenever you need it, day or night, from anywhere.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-white"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Mindful Grove AI</h4>
                        <p className="text-xs text-muted-foreground">Online now</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    Hello! I'm your Mindful Grove assistant. How are you feeling today?
                  </div>
                  <div className="bg-primary text-white p-3 rounded-lg max-w-[80%] ml-auto">
                    I've been feeling anxious lately and having trouble sleeping.
                  </div>
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    I'm sorry to hear you're struggling with anxiety and sleep issues. Many people experience similar challenges. Would you like to tell me more about when these feelings started?
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Input placeholder="Type a message..." className="flex-1" disabled />
                  <Button disabled>Send</Button>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Sign up to start your mental health journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real experiences from people who have found support through Mindful Grove
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The AI assessment was spot on and helped me find a therapist who really gets me. I've made so much progress in just a few sessions."
                  </p>
                  <div className="flex items-center">
                    <div className="font-medium">Sarah T.</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Being able to chat with the AI assistant anytime helped me through some really dark moments. It guided me to the right professional help when I needed it most."
                  </p>
                  <div className="flex items-center">
                    <div className="font-medium">Michael R.</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "As someone with social anxiety, I love that I can have video or chat sessions depending on how I'm feeling that day. The flexibility makes it so much easier to get help."
                  </p>
                  <div className="flex items-center">
                    <div className="font-medium">Jamie L.</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Mental Health Journey Today</h2>
            <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Take the first step toward better mental wellbeing with Mindful Grove's supportive community and professional care.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Get Started For Free</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;

// Import for styled input in the mockup chat
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
    />
  );
}
