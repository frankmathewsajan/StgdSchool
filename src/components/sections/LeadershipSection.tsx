
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useLeadership } from "@/hooks/useLeadership";

const LeadershipSection = () => {
  const { data: leaders, isLoading, error } = useLeadership();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-500">Loading leadership team...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            Failed to load leadership team. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600">Meet our dedicated leaders committed to educational excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders?.map((leader) => (
            <Card key={leader.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={leader.image_url || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=400&h=400"} 
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
                
                {leader.qualifications && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[#7d0a0a] mb-2">Qualifications:</h4>
                    <p className="text-xs text-gray-600">{leader.qualifications}</p>
                  </div>
                )}

                <div className="space-y-2 border-t pt-4">
                  {leader.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-[#7d0a0a]" />
                      <a href={`mailto:${leader.email}`} className="text-gray-600 hover:text-[#7d0a0a] transition-colors">
                        {leader.email}
                      </a>
                    </div>
                  )}
                  {leader.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-[#7d0a0a]" />
                      <a href={`tel:${leader.phone}`} className="text-gray-600 hover:text-[#7d0a0a] transition-colors">
                        {leader.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
