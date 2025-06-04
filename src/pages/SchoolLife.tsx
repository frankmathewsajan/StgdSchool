
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSchoolLife } from "@/hooks/useSchoolLife";

const SchoolLife = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: galleryImages, isLoading, error } = useSchoolLife();

  const categories = [
    { id: "all", label: "All", count: galleryImages?.length || 0 },
    { id: "academics", label: "Academics", count: galleryImages?.filter(img => img.category === "academics").length || 0 },
    { id: "sports", label: "Sports", count: galleryImages?.filter(img => img.category === "sports").length || 0 },
    { id: "events", label: "Events", count: galleryImages?.filter(img => img.category === "events").length || 0 },
    { id: "campus", label: "Campus", count: galleryImages?.filter(img => img.category === "campus").length || 0 },
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages || []
    : galleryImages?.filter(img => img.category === selectedCategory) || [];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academics":
        return "bg-blue-100 text-blue-800";
      case "sports":
        return "bg-green-100 text-green-800";
      case "events":
        return "bg-purple-100 text-purple-800";
      case "campus":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <section className="bg-gradient-to-r from-[#7d0a0a] to-[#5d0808] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">School Life Gallery</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Explore the vibrant life at our school through moments captured in our campus, classrooms, and events
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse text-gray-500">Loading gallery...</div>
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">School Life Gallery</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
            Failed to load gallery. Please try again later.
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">School Life Gallery</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Explore the vibrant life at our school through moments captured in our campus, classrooms, and events
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-[#7d0a0a] hover:bg-[#5d0808]"
                    : "hover:bg-[#7d0a0a] hover:text-white"
                }`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative">
                  <img 
                    src={image.image_url} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getCategoryColor(image.category)}>
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {image.description}
                    </p>
                  )}
                  {image.date_taken && (
                    <p className="text-xs text-gray-500">
                      {new Date(image.date_taken).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📷</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Found</h3>
              <p className="text-gray-600">
                No images found for the selected category. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#7d0a0a] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{galleryImages?.length || 0}</div>
              <div className="text-red-200">Total Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-red-200">Events Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-red-200">Campus Areas</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-red-200">Happy Students</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolLife;
