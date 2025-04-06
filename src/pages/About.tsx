
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-dark mb-6">About Mindful Grove</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Bridging the gap between technology and mental healthcare for a more accessible future.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-forest-dark mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At Mindful Grove, we believe that everyone deserves access to quality mental health support. 
                  Our mission is to break down barriers to mental healthcare by combining innovative AI technology 
                  with human expertise, creating a supportive ecosystem that meets people where they are.
                </p>
                <p className="text-gray-600">
                  We're committed to making mental health support accessible, affordable, and stigma-free, 
                  helping individuals navigate their mental health journey with dignity and personalized care.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-forest-dark mb-4">Our Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-medium text-lg">Accessibility</h4>
                      <p className="text-gray-600">Breaking down barriers to mental health support for everyone.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-medium text-lg">Compassion</h4>
                      <p className="text-gray-600">Treating every individual with dignity, empathy and respect.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 mt-1">3</div>
                    <div>
                      <h4 className="font-medium text-lg">Innovation</h4>
                      <p className="text-gray-600">Leveraging technology to improve mental healthcare delivery.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest-dark mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-primary">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Dr. Sarah Johnson</h3>
                <p className="text-primary text-center mb-3">Chief Medical Officer</p>
                <p className="text-gray-600 text-center">
                  With over 15 years of experience in psychiatry, Dr. Johnson leads our medical team with compassion and expertise.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-primary">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Michael Chen</h3>
                <p className="text-primary text-center mb-3">CTO</p>
                <p className="text-gray-600 text-center">
                  A pioneer in AI for healthcare, Michael ensures our technology is both innovative and ethically sound.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-primary">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Dr. Amara Patel</h3>
                <p className="text-primary text-center mb-3">Lead Therapist</p>
                <p className="text-gray-600 text-center">
                  Dr. Patel specializes in making therapy accessible and effective in digital formats.
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

export default About;
