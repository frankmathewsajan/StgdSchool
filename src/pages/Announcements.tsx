
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, Info, Star } from "lucide-react";

const Announcements = () => {
  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Final Examination Schedule Released",
      content: "The final examination schedule for all classes has been released. Students and parents can download the schedule from the learning materials section. Exams will begin on March 15th, 2024.",
      date: "2024-02-28",
      time: "10:30 AM",
      type: "important",
      category: "Academics"
    },
    {
      id: 2,
      title: "School Holiday - Republic Day",
      content: "The school will remain closed on January 26th, 2024, in observance of Republic Day. Classes will resume on January 27th, 2024. Enjoy the holiday!",
      date: "2024-01-25",
      time: "2:15 PM",
      type: "holiday",
      category: "Holiday"
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      content: "Parent-Teacher meetings for grades 6-10 are scheduled for February 10th, 2024. Please check with your child's class teacher for specific timing slots.",
      date: "2024-02-01",
      time: "9:00 AM",
      type: "meeting",
      category: "Meetings"
    },
    {
      id: 4,
      title: "Annual Sports Day",
      content: "Our Annual Sports Day will be held on March 5th, 2024, at the school playground. All students are required to participate. Event registration forms are available at the office.",
      date: "2024-02-20",
      time: "11:45 AM",
      type: "event",
      category: "Events"
    },
    {
      id: 5,
      title: "Science Fair Registration Open",
      content: "Registration for the Annual Science Fair is now open for grades 3-12. Deadline for project submission is February 28th, 2024. Contact the science department for guidelines.",
      date: "2024-02-05",
      time: "3:20 PM",
      type: "registration",
      category: "Academics"
    },
    {
      id: 6,
      title: "Library Book Fair",
      content: "Join us for our annual Book Fair from February 12-16, 2024. Explore a wide collection of educational and recreational books. Special discounts available for students.",
      date: "2024-02-08",
      time: "1:30 PM",
      type: "event",
      category: "Events"
    }
  ];

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "holiday":
        return <Calendar className="h-5 w-5 text-green-500" />;
      case "meeting":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "event":
        return <Star className="h-5 w-5 text-purple-500" />;
      case "registration":
        return <Info className="h-5 w-5 text-orange-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "bg-red-100 text-red-800";
      case "holiday":
        return "bg-green-100 text-green-800";
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      case "registration":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Latest Announcements</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and important information from our school
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      {getAnnouncementIcon(announcement.type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 mb-2">
                          {announcement.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getTypeColor(announcement.type)}>
                            {announcement.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(announcement.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{announcement.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State Message */}
          {announcements.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Announcements</h3>
                <p className="text-gray-600">
                  There are no announcements at the moment. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Never miss important school announcements. Contact our office to subscribe to our notification system.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> +1 (555) 123-4567<br />
              <strong>Email:</strong> info@stgdconvent.edu
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
