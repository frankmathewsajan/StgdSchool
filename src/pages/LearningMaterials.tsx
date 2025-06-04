
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen, Calculator, Beaker, Globe } from "lucide-react";
import { useLearningMaterials } from "@/hooks/useLearningMaterials";

const LearningMaterials = () => {
  const { data: materials, isLoading, error } = useLearningMaterials();

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "mathematics":
        return Calculator;
      case "science":
        return Beaker;
      case "social studies":
        return Globe;
      default:
        return BookOpen;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        return "bg-blue-100 text-blue-800";
      case "English":
        return "bg-green-100 text-green-800";
      case "Science":
        return "bg-purple-100 text-purple-800";
      case "Social Studies":
        return "bg-orange-100 text-orange-800";
      case "Hindi":
        return "bg-pink-100 text-pink-800";
      case "Computer Science":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const subjects = ["All", ...(materials ? [...new Set(materials.map(m => m.subject))] : [])];
  const classes = ["All", ...(materials ? [...new Set(materials.map(m => m.class_level))] : [])];

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Learning Materials</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Access a comprehensive collection of study materials, guides, and resources to support your learning journey
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse text-gray-500">Loading learning materials...</div>
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Learning Materials</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
            Failed to load learning materials. Please try again later.
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Learning Materials</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Access a comprehensive collection of study materials, guides, and resources to support your learning journey
          </p>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#7d0a0a] mb-2">{materials?.length || 0}</div>
                <div className="text-gray-600">Total Materials</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#7d0a0a] mb-2">
                  {subjects.length - 1}
                </div>
                <div className="text-gray-600">Subjects</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#7d0a0a] mb-2">
                  {classes.length - 1}
                </div>
                <div className="text-gray-600">Classes</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#7d0a0a] mb-2">
                  {materials?.reduce((sum, material) => sum + (material.downloads || 0), 0) || 0}
                </div>
                <div className="text-gray-600">Total Downloads</div>
              </CardContent>
            </Card>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials?.map((material) => {
              const Icon = getSubjectIcon(material.subject);
              return (
                <Card key={material.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#7d0a0a] p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {material.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className={getSubjectColor(material.subject)}>
                        {material.subject}
                      </Badge>
                      <Badge variant="outline">{material.class_level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {material.description && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {material.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      <div className="flex justify-between">
                        <span>Type: {material.file_type}</span>
                        <span>Size: {material.file_size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded: {new Date(material.created_at).toLocaleDateString()}</span>
                        <span>Downloads: {material.downloads || 0}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-[#7d0a0a] hover:bg-[#5d0808]">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {!materials || materials.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Materials Available</h3>
              <p className="text-gray-600">
                Learning materials will be uploaded here. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-[#7d0a0a]">Download Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">For Students:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Materials are organized by subject and class</li>
                    <li>• Download only materials relevant to your current class</li>
                    <li>• Save files in organized folders on your device</li>
                    <li>• Contact teachers for additional help with materials</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">For Parents:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Monitor your child's download and study activities</li>
                    <li>• Ensure materials are being used effectively</li>
                    <li>• Contact teachers if you need clarification</li>
                    <li>• Report any technical issues to the school office</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LearningMaterials;
