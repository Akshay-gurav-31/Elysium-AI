import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Akshay Gurav",
    role: "Full Stack Developer",
    initials: "AG",
    description: "Leads the development of our platform with expertise in React, Node.js, and cloud architecture.",
    image: "/img/team/akshay.jpg",
    social: {
      linkedin: "https://linkedin.com/in/akshay-gurav",
      twitter: "https://twitter.com/akshay_gurav"
    }
  },
  {
    id: 2,
    name: "Vardhan Mudhiraj",
    role: "AI/ML Engineer",
    initials: "VM",
    description: "Develops our AI triage system and machine learning models for mental health assessment.",
    image: "/public/images/team/vardhan.jpg",

    social: {
      linkedin: "https://linkedin.com/in/vardhan-m",
      github: "https://github.com/vardhan-m"
    }
  },
  {
    id: 3,
    name: "Shreyash Kumar",
    role: "Product Manager",
    initials: "SK",
    description: "Oversees product development and ensures our solutions meet user needs effectively.",
    image: "/img/team/shreyash.jpg",
    social: {
      linkedin: "https://linkedin.com/in/shreyash-k"
    }
  },
  {
    id: 4,
    name: "Meghana Yegireddi",
    role: "UI/UX Designer",
    initials: "MY",
    description: "Designs intuitive interfaces that make mental health support accessible to everyone.",
    image: "/img/team/meghana.jpg",
    social: {
      linkedin: "https://linkedin.com/in/meghana-y"
    }
  }
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-[#0a1128] text-white py-20">
        <div className="elysium-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            About <span className="text-primary">Elysium AI</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/80">
            We're on a mission to make mental health support accessible, efficient, and personalized for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="elysium-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden border border-border group">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
                  <source src="/videos/vid.mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-foreground">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-muted-foreground">
                Elysium AI was founded in 2025 by a team of technologists and mental health advocates who recognized the growing need for accessible mental health support. Our journey began when one of our co-founders struggled to find timely help for a family member.
              </p>
              <p className="text-muted-foreground">
                Today, we combine cutting-edge AI technology with human expertise to guide individuals through their mental health journey with care, privacy, and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-[#0a1128]/10">
        <div className="elysium-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-foreground">
              Our <span className="text-primary">Mission & Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize access to quality mental health support through technology, making it available to anyone, anywhere, at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A world where mental health care is as accessible and stigma-free as physical health care, with technology bridging gaps in the system.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We approach every interaction with empathy and understanding, recognizing each person's unique journey.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously evolve our technology to better serve our users' mental health needs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain the highest standards of data security and confidentiality.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold font-display">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We design for everyone, removing barriers to mental health support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section (Replaced with Index's version) */}
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
                  <AvatarImage src="public/images/team/akshay.jpg" alt="Akshay Gurav" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">AG</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Akshay Gurav</CardTitle>
                <CardDescription className="text-blue-300">Frontend & Backend Developer Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Leading development of secure and effective mental health technologies with a full-stack approach.
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/akshay--gurav/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/akshay._.gurav" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Vardhan Mudhiraj */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="public/images/team/sai.jpg" alt="Vardhan Mudhiraj" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">VM</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Vardhan Mudhiraj</CardTitle>
                <CardDescription className="text-blue-300">Database & Deployment Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Specialized in database architecture and deployment solutions for healthcare applications.
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/sai-vardhan-ameenla/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/sai_vardhan_ameenla/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Shreyash Kumar */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="public/images/team/Shreyash.jpg" alt="Shreyash Kumar" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">SK</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Shreyash Kumar</CardTitle>
                <CardDescription className="text-blue-300">Presentation & Teaser Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Leading presentation strategies with a passion for creating impactful mental healthcare narratives.
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/shreyash-bhagat-sb-9774b622a/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/shreyashbhagat.sb" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Meghana Yegireddi */}
            <Card className="text-center hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-300 bg-navy-950 border border-blue-900">
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-blue-700 ring-offset-2 ring-offset-navy-950">
                  <AvatarImage src="public/images/team/meghana.jpg" alt="Meghana Yegireddi" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-800 to-blue-600 text-white text-2xl">MY</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">Meghana Yegireddi</CardTitle>
                <CardDescription className="text-blue-300">UI/UX Design Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-3">
                  Creating intuitive and user-centered designs for mental health applications with focus on accessibility.
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <a href="https://www.linkedin.com/in/meghana-yegireddi-639280320/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/me.ghana___/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default About;


