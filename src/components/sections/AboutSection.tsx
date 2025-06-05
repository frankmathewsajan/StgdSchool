import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BookOpen, Heart } from "lucide-react";
const AboutSection = () => {
  const stats = [{
    number: "500+",
    label: "Students",
    icon: Users
  }, {
    number: "50+",
    label: "Faculty",
    icon: BookOpen
  }, {
    number: "35+",
    label: "Years",
    icon: Award
  }, {
    number: "100%",
    label: "Success",
    icon: Heart
  }];
  const values = [{
    title: "Academic Excellence",
    description: "Committed to providing high-quality education that challenges and inspires students to reach their full potential."
  }, {
    title: "Character Development",
    description: "Fostering moral values, integrity, and leadership qualities that prepare students for life beyond academics."
  }, {
    title: "Holistic Growth",
    description: "Encouraging physical, emotional, and social development through sports, arts, and community service."
  }];
  return <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Our School</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Since 2015, St. G. D. Convent School has been a beacon of educational excellence, nurturing young minds and building tomorrow's leaders through innovative teaching and holistic development.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-[#7d0a0a] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#7d0a0a] mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default AboutSection;