
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Calendar, Image, FileText } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Comprehensive curriculum designed to nurture academic excellence and personal growth."
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated teachers committed to providing personalized attention to every student."
    },
    {
      icon: Award,
      title: "Excellence Awards",
      description: "Recognized for outstanding performance in academics, sports, and extracurricular activities."
    }
  ];

  const quickLinks = [
    {
      icon: Calendar,
      title: "Latest Announcements",
      description: "Stay updated with school news and important dates",
      link: "/announcements",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: Image,
      title: "School Life Gallery",
      description: "Explore our vibrant school community in action",
      link: "/school-life",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: FileText,
      title: "Learning Materials",
      description: "Access study materials and resources",
      link: "/learning-materials",
      color: "bg-purple-50 hover:bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen">
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
              <Link to="/about">
                <Button size="lg" className="bg-white text-[#7d0a0a] hover:bg-gray-100">
                  Learn More About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#7d0a0a]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our School?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a nurturing environment where students can grow academically, socially, and personally
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-20">
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
              return (
                <Link key={index} to={link.link}>
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
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#7d0a0a] text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Join Our School Community?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Contact us today to learn more about admissions and how we can help your child succeed
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#7d0a0a] hover:bg-gray-100">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
