
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Users, Star } from "lucide-react";

const VisionMission = () => {
  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "We pursue the highest standards in all aspects of education and personal development."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We embrace diversity and create an environment where every student can thrive."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously evolve our teaching methods to meet the needs of modern learners."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Vision & Mission</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Guiding principles that shape our educational philosophy and commitment to excellence
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Vision Card */}
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-[#7d0a0a] text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-8 w-8" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be a leading educational institution that empowers students to become 
                  confident, compassionate, and capable global citizens who contribute positively 
                  to society through innovation, leadership, and service.
                </p>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 italic">
                    "We envision a future where our students become the changemakers and 
                    leaders who shape a better tomorrow for all."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-[#7d0a0a] text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To provide quality education that nurtures the intellectual, emotional, 
                  physical, and spiritual development of every student through:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#7d0a0a] font-bold">•</span>
                    <span>Innovative and student-centered teaching methodologies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#7d0a0a] font-bold">•</span>
                    <span>Character building through moral and ethical education</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#7d0a0a] font-bold">•</span>
                    <span>Fostering critical thinking and problem-solving skills</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#7d0a0a] font-bold">•</span>
                    <span>Creating a supportive and inclusive learning environment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="bg-gray-50 rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              These fundamental values guide our daily interactions, decisions, and 
              the overall culture of our school community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-[#7d0a0a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Philosophy */}
          <div className="mt-16">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white">
                <CardTitle className="text-2xl text-center">Our Educational Philosophy</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#7d0a0a]">Holistic Development</h3>
                    <p className="text-gray-700 mb-4">
                      We believe in developing the whole child - academically, socially, 
                      emotionally, and physically. Our curriculum is designed to address 
                      all aspects of human development.
                    </p>
                    <h3 className="text-xl font-semibold mb-4 text-[#7d0a0a]">Student-Centered Learning</h3>
                    <p className="text-gray-700">
                      Every student is unique, and our teaching approaches are tailored 
                      to meet individual learning styles and needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#7d0a0a]">Future-Ready Skills</h3>
                    <p className="text-gray-700 mb-4">
                      We prepare students for the challenges of tomorrow by developing 
                      critical thinking, creativity, collaboration, and communication skills.
                    </p>
                    <h3 className="text-xl font-semibold mb-4 text-[#7d0a0a]">Community Engagement</h3>
                    <p className="text-gray-700">
                      We encourage active participation in community service and 
                      social responsibility to develop empathetic and engaged citizens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;
