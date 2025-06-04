import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Image, FileText, Megaphone } from "lucide-react";
import AboutSection from "@/components/sections/AboutSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import ContactSection from "@/components/sections/ContactSection";
const Home = () => {
  const quickLinks = [{
    icon: Megaphone,
    title: "Latest Announcements",
    description: "Stay updated with school news and important dates",
    link: "/announcements",
    color: "bg-blue-50 hover:bg-blue-100"
  }, {
    icon: Image,
    title: "School Life Gallery",
    description: "Explore our vibrant school community in action",
    link: "/school-life",
    color: "bg-green-50 hover:bg-green-100"
  }, {
    icon: FileText,
    title: "Learning Materials",
    description: "Access study materials and resources",
    link: "/learning-materials",
    color: "bg-purple-50 hover:bg-purple-100"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7d0a0a] via-[#8d1515] to-[#6d0808] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <br />
              <span className="text-yellow-300">St. G. D. Convent School</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto animate-fade-in">
              Nurturing young minds with quality education, values, and character development since 1985
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <a href="#about">
                <Button size="lg" className="bg-white text-[#7d0a0a] hover:bg-gray-100">
                  Learn More About Us
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-white hover:bg-white text-red-900">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quick Access
            </h2>
            <p className="text-xl text-gray-600">
              Find what you're looking for quickly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return <Link key={index} to={link.link}>
                  <Card className={`${link.color} border-none transition-all duration-200 hover:scale-105 cursor-pointer`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-[#7d0a0a] p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                          <p className="text-gray-600">{link.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>;
          })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Vision & Mission Section */}
      <div id="vision-mission">
        <VisionMissionSection />
      </div>

      {/* Leadership Section */}
      <div id="leadership">
        <LeadershipSection />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Call to Action */}
      <section className="bg-[#7d0a0a] text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Join Our School Community?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Contact us today to learn more about admissions and how we can help your child succeed
          </p>
          <a href="#contact">
            <Button size="lg" className="bg-white text-[#7d0a0a] hover:bg-gray-100">
              Get In Touch
            </Button>
          </a>
        </div>
      </section>
    </div>;
};
export default Home;