
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, FileText, Image, Megaphone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useSchoolLife } from "@/hooks/useSchoolLife";
import { useLearningMaterials } from "@/hooks/useLearningMaterials";
import { useLeadership } from "@/hooks/useLeadership";
import AnnouncementManager from "@/components/admin/AnnouncementManager";
import GalleryManager from "@/components/admin/GalleryManager";
import LearningMaterialsManager from "@/components/admin/LearningMaterialsManager";
import LeadershipManager from "@/components/admin/LeadershipManager";

const AdminDashboard = () => {
  const { isAuthenticated, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const { data: announcements } = useAnnouncements();
  const { data: gallery } = useSchoolLife();
  const { data: materials } = useLearningMaterials();
  const { data: leadership } = useLeadership();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Dashboard - checking auth, authLoading:", authLoading, "isAuthenticated:", isAuthenticated);
      
      // Wait for auth to complete loading
      if (authLoading) {
        console.log("Dashboard - still loading auth...");
        return;
      }

      if (!isAuthenticated) {
        console.log("Dashboard - user not authenticated, redirecting to login");
        navigate("/admin/login");
        return;
      }

      console.log("Dashboard - user is authenticated");
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You are now logged in as admin",
      });
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, authLoading, navigate, toast]);

  const handleSignOut = async () => {
    try {
      console.log("Dashboard - signing out...");
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Dashboard - sign out error:", error);
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7d0a0a] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: "Announcements",
      count: announcements?.length || 0,
      icon: Megaphone,
      color: "bg-blue-500",
    },
    {
      title: "Gallery Images",
      count: gallery?.length || 0,
      icon: Image,
      color: "bg-green-500",
    },
    {
      title: "Learning Materials",
      count: materials?.length || 0,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Leadership Team",
      count: leadership?.length || 0,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">St. G. D. Convent School</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-[#7d0a0a]">
                Admin User
              </Badge>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Management Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="announcements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
              </TabsList>
              
              <TabsContent value="announcements" className="mt-6">
                <AnnouncementManager />
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6">
                <GalleryManager />
              </TabsContent>
              
              <TabsContent value="materials" className="mt-6">
                <LearningMaterialsManager />
              </TabsContent>
              
              <TabsContent value="leadership" className="mt-6">
                <LeadershipManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
