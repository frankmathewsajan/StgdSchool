
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Image, 
  Calendar, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Total Students", value: "500", icon: Users, color: "bg-blue-500" },
    { title: "Announcements", value: "12", icon: Calendar, color: "bg-green-500" },
    { title: "Learning Materials", value: "45", icon: FileText, color: "bg-purple-500" },
    { title: "Gallery Images", value: "156", icon: Image, color: "bg-orange-500" },
  ];

  const recentAnnouncements = [
    { id: 1, title: "Final Examination Schedule Released", date: "2024-02-28", type: "Academic" },
    { id: 2, title: "School Holiday - Republic Day", date: "2024-01-25", type: "Holiday" },
    { id: 3, title: "Parent-Teacher Meeting", date: "2024-02-01", type: "Meeting" },
  ];

  const recentMaterials = [
    { id: 1, title: "Mathematics - Class 10 Sample Papers", downloads: 245, uploadDate: "2024-02-20" },
    { id: 2, title: "English Literature Study Guide", downloads: 189, uploadDate: "2024-02-18" },
    { id: 3, title: "Science Laboratory Manual", downloads: 156, uploadDate: "2024-02-15" },
  ];

  const navigationTabs = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "announcements", label: "Announcements", icon: Calendar },
    { id: "materials", label: "Learning Materials", icon: FileText },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "leadership", label: "Leadership", icon: Users },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Announcements
              <Button size="sm" className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-sm text-gray-600">{announcement.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{announcement.type}</Badge>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Popular Materials
              <Button size="sm" className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{material.title}</h4>
                    <p className="text-sm text-gray-600">
                      {material.downloads} downloads • {material.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "announcements":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manage Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create, edit, and manage school announcements.</p>
              <Button className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Plus className="h-4 w-4 mr-2" />
                Add New Announcement
              </Button>
            </CardContent>
          </Card>
        );
      case "materials":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manage Learning Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Upload and manage educational resources.</p>
              <Button className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
            </CardContent>
          </Card>
        );
      case "gallery":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manage School Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Add and organize school life images.</p>
              <Button className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Plus className="h-4 w-4 mr-2" />
                Add Images
              </Button>
            </CardContent>
          </Card>
        );
      case "leadership":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Manage Leadership Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Add and update leadership team information.</p>
              <Button className="bg-[#7d0a0a] hover:bg-[#5d0808]">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-[#7d0a0a]">Admin Dashboard</h1>
              <Badge variant="outline">St. G. D. Convent School</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  View Website
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigationTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-[#7d0a0a] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
