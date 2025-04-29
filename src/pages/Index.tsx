
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const Index = () => {
  // State for managing the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/doctors/dr.png",
    "/images/doctors/dr1.png",
    "/images/doctors/dr2.png",
    "/images/doctors/dr3.png",
    "/images/doctors/dr4.png",
  ];

  // Effect for cycling through images every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // 20 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  useEffect(() => {
    // Initialize polygon animation
    const initPolygons = () => {
      const container = document.createElement('div');
      container.className = 'polygon-container';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.zIndex = '-1';
      container.style.pointerEvents = 'none';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);

      const colors = [
        'rgba(59, 130, 246, 0.1)',
        'rgba(29, 78, 216, 0.1)',
        'rgba(30, 64, 175, 0.1)'
      ];
      const polygonCount = 8;

      const animatePolygon = (element) => {
        let x = parseFloat(element.style.left);
        let y = parseFloat(element.style.top);
        let xSpeed = (Math.random() - 0.5) * 0.2;
        let ySpeed = (Math.random() - 0.5) * 0.2;

        const move = () => {
          x += xSpeed;
          y += ySpeed;

          if (x < -20 || x > 100) xSpeed *= -1;
          if (y < -20 || y > 100) ySpeed *= -1;

          element.style.left = `${x}%`;
          element.style.top = `${y}%`;

          requestAnimationFrame(move);
        };

        move();
      };

      for (let i = 0; i < polygonCount; i++) {
        const polygon = document.createElement('div');
        polygon.style.position = 'absolute';
        polygon.style.width = `${Math.random() * 200 + 100}px`;
        polygon.style.height = `${Math.random() * 200 + 100}px`;
        polygon.style.background = colors[Math.floor(Math.random() * colors.length)];
        polygon.style.clipPath = `polygon(
          ${Math.random() * 50}% ${Math.random() * 50}%,
          ${Math.random() * 50 + 50}% ${Math.random() * 50}%,
          ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}%,
          ${Math.random() * 50}% ${Math.random() * 50 + 50}%
        )`;
        polygon.style.filter = 'blur(20px)';
        polygon.style.left = `${Math.random() * 100}%`;
        polygon.style.top = `${Math.random() * 100}%`;
        container.appendChild(polygon);

        animatePolygon(polygon);
      }

      return () => {
        const container = document.querySelector('.polygon-container');
        if (container) {
          document.body.removeChild(container);
        }
      };
    };

    const cleanup = initPolygons();
    return cleanup;
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Polygon Background */}
      <section className="relative bg-gradient-to-b from-black to-navy-950 py-24 overflow-hidden">
        <div className="elysium-container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Your Mental Health Journey Starts Here
              </h1>
              <p className="text-lg text-blue-100 max-w-md">
                Access convenient mental health support through AI triage and connect with professional care providers when you need it most.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/signup">
                  <Button className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-2">Get Started</Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="text-white border-blue-700 hover:bg-blue-900 hover:text-white px-6 py-2">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-blue-900 animate-fade-in w-full h-[400px]">
              <img
                src={images[currentImageIndex]}
                alt="Mental health consultation interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-navy-950 to-black">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Elysium AI Works</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our platform combines AI-powered triage with professional human support to provide accessible mental health care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-blue-900 bg-navy-950 hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <CardTitle className="text-white text-xl">AI-Powered Chat</CardTitle>
                <CardDescription className="text-blue-200">Begin with our AI assistant for initial support and triage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Our AI chatbot helps identify your needs and provides immediate resources for common concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-blue-900 bg-navy-950 hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <CardTitle className="text-white text-xl">Professional Matching</CardTitle>
                <CardDescription className="text-blue-200">Get matched with the right mental health professional</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Based on your needs, we'll connect you with qualified professionals who specialize in your area of concern.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-blue-900 bg-navy-950 hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <CardTitle className="text-white text-xl">Flexible Consultations</CardTitle>
                <CardDescription className="text-blue-200">Choose your preferred consultation method</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">
                  Connect through text chat, video calls, or phone calls based on your comfort and needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-to-b from-black to-navy-950">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Comprehensive mental health support designed around your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-900 border border-blue-900">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <CardTitle className="text-white">AI Chat Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-100 mb-4">
                  24/7 AI-powered chat for immediate support and resources.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="text-white border-blue-700 hover:bg-blue-800 hover:text-white">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-900 border border-blue-900">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Video Consultations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-100 mb-4">
                  Face-to-face sessions with professionals via secure video.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="text-white border-blue-700 hover:bg-blue-800 hover:text-white">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-900 border border-blue-900">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Professional Therapy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-100 mb-4">
                  Licensed therapists specializing in various mental health areas.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="text-white border-blue-700 hover:bg-blue-800 hover:text-white">Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-900 border border-blue-900">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-blue-7
                00 flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-white">Mental Health Resources</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-100 mb-4">
                  Educational content, self-help tools, and community support.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="text-white border-blue-700 hover:bg-blue-800 hover:text-white">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-navy-950 to-black">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Leadership Team</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Meet the dedicated professionals leading Elysium AI's mission to make mental health support accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Akshay Gurav */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="src/img/akshay.jpg" alt="Akshay Gurav" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">AG</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Akshay Gurav</CardTitle>
                <CardDescription className="text-blue-300">Team Leader & Developer Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Developed complete frontend and backend systems
                  Conducted technical research and architecture design
                  Coordinated team tasks.
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/akshay--gurav/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/akshay._.gurav" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683-.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Vardhan Mudhiraj */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="src/img/sai.jpg" alt="Vardhan Mudhiraj" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">VM</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Vardhan Mudhiraj</CardTitle>
                <CardDescription className="text-blue-300">Database & Deployment Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Produced professional demo presentation
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/sai-vardhan-ameenla/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/sai_vardhan_ameenla/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683-.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Shreyash Kumar */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="src/img/Shreyash.jpg" alt="Shreyash Kumar" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">SK</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Shreyash Kumar</CardTitle>
                <CardDescription className="text-blue-300">Presentation & Teaser Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Ensured final submission met all requirements & Created comprehensive technical documentation and tesing work
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/shreyash-bhagat-sb-9774b622a/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/shreyashbhagat.sb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683-.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Meghana Yegireddi */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="src/img/meghana.jpg" alt="Meghana Yegireddi" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">MY</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Meghana Yegireddi</CardTitle>
                <CardDescription className="text-blue-300">UI/UX Design Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Suggested key UI/UX improvements that enhanced the product
                  Created all presentation materials including the final PPT
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/meghana-yegireddi-639280320/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/me.ghana___/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683-.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black to-navy-950">
        <div className="elysium-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What People Are Saying</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Hear from those who have experienced Elysium AI's mental health support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-blue-900 bg-navy-950">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2016/10/13/07/09/model-1736962_1280.jpg" alt="Yesha" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex items-center">
                    <h4 className="font-medium text-white">Yesha</h4>
                    <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p className="text-sm text-blue-300 ml-2">Anxiety Support</p>
                  </div>
                </div>
                <p className="text-blue-100">
                  "The AI chat was surprisingly helpful in calming my anxiety attacks. When I needed more help, the transition to a human therapist was seamless."
                </p>
              </CardContent>
            </Card>

            <Card className="border border-blue-900 bg-navy-950">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2016/10/13/07/09/model-1736963_1280.jpg" alt="Anushka" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex items-center">
                    <h4 className="font-medium text-white">Anushka</h4>
                    <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p className="text-sm text-blue-300 ml-2">Depression Therapy</p>
                  </div>
                </div>
                <p className="text-blue-100">
                  "I was matched with a therapist who truly understands my cultural background. The video sessions feel just as effective as in-person visits."
                </p>
              </CardContent>
            </Card>

            <Card className="border border-blue-900 bg-navy-950">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2020/06/20/16/13/male-5321547_1280.jpg" alt="Raj" />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex items-center">
                    <h4 className="font-medium text-white">Raj</h4>
                    <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p className="text-sm text-blue-300 ml-2">Stress Management</p>
                  </div>
                </div>
                <p className="text-blue-100">
                  "As someone who travels frequently, having consistent mental health support through this platform has been life-changing."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
