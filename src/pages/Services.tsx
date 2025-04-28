import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const Services = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-[#0a1128] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128]/90 to-[#0a1128]/60 z-0"></div>
        <div className="elysium-container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/80">
            Comprehensive mental health support designed around your individual needs.
          </p>
        </div>
      </section>

      {/* AI Chat Support */}
      <section className="py-20 bg-background">
        <div className="elysium-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                AI <span className="text-primary">Chat Support</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI-powered chatbot provides immediate mental health support, helping to identify your needs and guiding you through initial steps.
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>Available 24/7 for immediate support</li>
                <li>Helps identify your mental health needs</li>
                <li>Provides resources for common concerns</li>
                <li>Assists with finding the right professional help</li>
                <li>Completely confidential and secure</li>
              </ul>
              <div className="pt-4">
                <Link to="/signup">
                  <Button className="elysium-btn-primary text-lg px-8 py-6">Try AI Chat</Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden order-1 md:order-2 border border-border group">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="src\img\bot.png"
                  alt="Woman using laptop for AI mental health chat" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Consultations */}
      <section className="py-20 bg-[#0a1128]/5">
        <div className="elysium-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden border border-border group">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="src/img/vid.png" 
                  alt="Woman in virtual therapy session" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                Video <span className="text-primary">Consultations</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect face-to-face with mental health professionals through our secure video platform.
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>Secure, HIPAA-compliant video platform</li>
                <li>Schedule sessions at your convenience</li>
                <li>Connect with specialists for your needs</li>
                <li>Access therapy from anywhere</li>
                <li>Options for urgent consultations</li>
              </ul>
              <div className="pt-4">
                <Link to="/signup">
                  <Button className="elysium-btn-primary text-lg px-8 py-6">Book Video Session</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Therapy */}
      <section className="py-20 bg-background">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Professional <span className="text-primary">Therapy</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our network includes licensed therapists, counselors, and mental health specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-display">Individual Therapy</CardTitle>
                <CardDescription className="text-muted-foreground">One-on-one sessions focused on your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-lg">
                  Personalized therapy sessions addressing your specific mental health concerns.
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-8">
                  <li>Depression and anxiety</li>
                  <li>Trauma and PTSD</li>
                  <li>Life transitions</li>
                  <li>Grief and loss</li>
                  <li>Stress management</li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="elysium-btn-outline w-full py-6 text-lg">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-display">Couples Therapy</CardTitle>
                <CardDescription className="text-muted-foreground">Strengthen your relationship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-lg">
                  Improve communication, resolve conflicts, and build a healthier relationship.
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-8">
                  <li>Communication skills</li>
                  <li>Conflict resolution</li>
                  <li>Rebuilding trust</li>
                  <li>Intimacy issues</li>
                  <li>Parenting conflicts</li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="elysium-btn-outline w-full py-6 text-lg">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-display">Specialized Treatment</CardTitle>
                <CardDescription className="text-muted-foreground">Targeted approaches for specific needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-lg">
                  Evidence-based therapeutic approaches for mental health conditions.
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-8">
                  <li>Cognitive Behavioral Therapy (CBT)</li>
                  <li>Dialectical Behavior Therapy (DBT)</li>
                  <li>EMDR for trauma</li>
                  <li>Mindfulness-based therapies</li>
                  <li>Solution-focused therapy</li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="elysium-btn-outline w-full py-6 text-lg">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mental Health Resources */}
      <section className="py-20 bg-[#0a1128]/10">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Mental Health <span className="text-primary">Resources</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access self-help tools, educational content, and community support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold font-display">Self-Help Library</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Articles, guides, and worksheets on mental health topics.
                </p>
                <Link to="/resources">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    Explore Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold font-display">Video Workshops</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Educational videos on mental health skills and wellbeing.
                </p>
                <Link to="/workshops">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    View Workshops
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold font-display">Support Groups</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Virtual groups for shared experiences and peer support.
                </p>
                <Link to="/groups">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    Join Groups
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 dark-card border-border">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold font-display">Assessment Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Self-assessment questionnaires to track your wellbeing.
                </p>
                <Link to="/assessments">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    Take Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-[#0a1128] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0"></div>
        <div className="elysium-container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            Start Your <span className="text-primary">Mental Health</span> Journey
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80">
            Take the first step towards better mental health with our supportive services.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/signup">
              <Button className="bg-white text-[#0a1128] hover:bg-primary hover:text-white transition-colors px-10 py-6 text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 transition-colors px-10 py-6 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;