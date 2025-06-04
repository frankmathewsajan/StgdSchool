
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Lightbulb } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
          <p className="text-xl text-gray-600">Guiding principles that shape our educational philosophy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <Card className="h-full hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-[#7d0a0a] p-3 rounded-full mr-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be a premier educational institution that nurtures global citizens with strong moral values, 
                critical thinking skills, and a passion for lifelong learning, preparing them to contribute 
                meaningfully to society and lead positive change in the world.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="h-full hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-[#7d0a0a] p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide quality education that combines academic excellence with character development, 
                fostering creativity, innovation, and social responsibility while maintaining our commitment 
                to inclusivity, diversity, and the holistic development of every student.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Lightbulb className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Core Values</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-300">Excellence</h4>
                <p className="text-red-100">Striving for the highest standards in everything we do</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-300">Integrity</h4>
                <p className="text-red-100">Building character through honesty, respect, and responsibility</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-300">Innovation</h4>
                <p className="text-red-100">Embracing creativity and forward-thinking approaches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VisionMissionSection;
