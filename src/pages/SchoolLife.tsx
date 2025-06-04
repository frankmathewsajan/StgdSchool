
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SchoolLife = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample gallery data
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=400",
      title: "Computer Lab Session",
      description: "Students engaged in coding and digital literacy programs",
      category: "academics",
      date: "2024-02-15"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400",
      title: "Science Laboratory",
      description: "Hands-on experiments in our well-equipped science lab",
      category: "academics",
      date: "2024-02-10"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400",
      title: "Annual Sports Day",
      description: "Athletes competing in various sports events",
      category: "sports",
      date: "2024-01-20"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400",
      title: "Digital Learning",
      description: "Modern technology integration in classroom learning",
      category: "academics",
      date: "2024-02-08"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400",
      title: "Programming Workshop",
      description: "Students learning Java programming fundamentals",
      category: "academics",
      date: "2024-01-25"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400",
      title: "Study Session",
      description: "Collaborative learning in our modern library",
      category: "academics",
      date: "2024-02-12"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&h=400",
      title: "School Campus",
      description: "Beautiful aerial view of our green campus",
      category: "campus",
      date: "2024-01-15"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
      title: "Heritage Day Celebration",
      description: "Cultural diversity celebration at our school",
      category: "events",
      date: "2024-01-30"
    }
  ];

  const categories = [
    { id: "all", label: "All", count: galleryImages.length },
    { id: "academics", label: "Academics", count: galleryImages.filter(img => img.category === "academics").length },
    { id: "sports", label: "Sports", count: galleryImages.filter(img => img.category === "sports").length },
    { id: "events", label: "Events", count: galleryImages.filter(img => img.category === "events").length },
    { id: "campus", label: "Campus", count: galleryImages.filter(img => img.category === "campus").length },
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

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
                    src={image.src} 
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
                  <p className="text-gray-600 text-sm mb-3">
                    {image.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(image.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
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
              <div className="text-3xl font-bold mb-2">{galleryImages.length}</div>
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
