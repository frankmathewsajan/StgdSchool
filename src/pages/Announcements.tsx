
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, Info, Star } from "lucide-react";
import { useAnnouncements } from "@/hooks/useAnnouncements";

const Announcements = () => {
  const { data: announcements, isLoading, error } = useAnnouncements();

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Latest Announcements</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Stay updated with the latest news, events, and important information from our school
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse text-gray-500">Loading announcements...</div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Latest Announcements</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
            Failed to load announcements. Please try again later.
          </div>
        </section>
      </div>
    );
  }

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
            {announcements?.map((announcement) => (
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
                              <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(announcement.created_at).toLocaleTimeString()}</span>
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
          {!announcements || announcements.length === 0 && (
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
