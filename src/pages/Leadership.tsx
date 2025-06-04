
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const Leadership = () => {
  const leaders = [
    {
      name: "Dr. Margaret Johnson",
      position: "Principal",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=400&h=400",
      email: "principal@stgdconvent.edu",
      phone: "+1 (555) 123-4567",
      bio: "Dr. Johnson brings over 20 years of educational leadership experience. She holds a Ph.D. in Educational Administration and is passionate about student-centered learning.",
      qualifications: "Ph.D. in Educational Administration, M.Ed. in Curriculum Development"
    },
    {
      name: "Mr. Robert Chen",
      position: "Vice Principal",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400",
      email: "vp@stgdconvent.edu",
      phone: "+1 (555) 123-4568",
      bio: "Mr. Chen oversees academic operations and student affairs. He has been with our school for 15 years and is known for his innovative teaching methods.",
      qualifications: "M.Ed. in Educational Leadership, B.Sc. in Mathematics"
    },
    {
      name: "Ms. Sarah Williams",
      position: "Head of Primary Section",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400",
      email: "primary@stgdconvent.edu",
      phone: "+1 (555) 123-4569",
      bio: "Ms. Williams specializes in early childhood education and has developed several award-winning programs for primary school students.",
      qualifications: "M.Ed. in Elementary Education, B.Ed. in Primary Teaching"
    },
    {
      name: "Dr. Michael Brown",
      position: "Head of Secondary Section",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400",
      email: "secondary@stgdconvent.edu",
      phone: "+1 (555) 123-4570",
      bio: "Dr. Brown leads our secondary education program with a focus on preparing students for higher education and career readiness.",
      qualifications: "Ph.D. in Secondary Education, M.Sc. in Biology"
    },
    {
      name: "Ms. Emily Davis",
      position: "Academic Coordinator",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400",
      email: "academic@stgdconvent.edu",
      phone: "+1 (555) 123-4571",
      bio: "Ms. Davis coordinates our curriculum development and ensures alignment with national education standards.",
      qualifications: "M.Ed. in Curriculum and Instruction, B.A. in English Literature"
    },
    {
      name: "Mr. James Wilson",
      position: "Student Affairs Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400",
      email: "student.affairs@stgdconvent.edu",
      phone: "+1 (555) 123-4572",
      bio: "Mr. Wilson manages extracurricular activities, student counseling, and campus life programs.",
      qualifications: "M.A. in Student Affairs, B.Sc. in Psychology"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Leadership Team</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Meet our dedicated leadership team committed to educational excellence and student success
          </p>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-red-200">{leader.position}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#7d0a0a] mb-2">Qualifications:</h4>
                    <p className="text-xs text-gray-600">{leader.qualifications}</p>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-[#7d0a0a]" />
                      <a href={`mailto:${leader.email}`} className="text-gray-600 hover:text-[#7d0a0a] transition-colors">
                        {leader.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-[#7d0a0a]" />
                      <a href={`tel:${leader.phone}`} className="text-gray-600 hover:text-[#7d0a0a] transition-colors">
                        {leader.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Principal */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#7d0a0a] mb-2">Message from the Principal</h2>
                <p className="text-gray-600">Dr. Margaret Johnson</p>
              </div>
              <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                "At St. G. D. Convent School, we believe that every child has the potential to excel. 
                Our commitment goes beyond academic achievement – we nurture confident, compassionate, 
                and capable individuals who will make meaningful contributions to society. With our 
                dedicated faculty and comprehensive programs, we ensure that each student receives 
                the support and guidance they need to reach their full potential."
              </blockquote>
              <div className="text-right mt-4">
                <p className="text-[#7d0a0a] font-semibold">- Dr. Margaret Johnson, Principal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
