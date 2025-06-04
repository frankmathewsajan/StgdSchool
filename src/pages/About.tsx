
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Students", icon: Users },
    { number: "50+", label: "Teachers", icon: BookOpen },
    { number: "25+", label: "Awards", icon: Award },
    { number: "39", label: "Years of Excellence", icon: Heart }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Our School</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Dedicated to providing quality education and nurturing young minds since 1985
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  St. G. D. Convent School was established in 1985 with a vision to provide quality education 
                  that goes beyond academics. Our school has been a beacon of learning, character building, 
                  and holistic development for nearly four decades.
                </p>
                <p>
                  We believe in nurturing not just the intellectual capabilities of our students, but also 
                  their emotional, social, and spiritual growth. Our comprehensive approach to education 
                  ensures that every child who walks through our doors is prepared for the challenges 
                  and opportunities of tomorrow.
                </p>
                <p>
                  With a dedicated faculty, modern infrastructure, and a commitment to excellence, 
                  we continue to evolve and adapt our teaching methodologies to meet the changing 
                  needs of education in the 21st century.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=600" 
                alt="Students in classroom" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="bg-[#7d0a0a] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#7d0a0a] mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Values Section */}
          <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Academic Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest standards in education, encouraging critical thinking 
                  and lifelong learning.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Character Building</h3>
                <p className="text-gray-600">
                  We focus on developing strong moral values, integrity, and compassion 
                  in all our students.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Spirit</h3>
                <p className="text-gray-600">
                  We foster a sense of belonging and encourage students to contribute 
                  positively to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
