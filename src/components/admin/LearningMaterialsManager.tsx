
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLearningMaterials } from "@/hooks/useLearningMaterials";
import { useQueryClient } from "@tanstack/react-query";

const LearningMaterialsManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    class_level: "",
    file_type: "",
    file_size: "",
    file_url: ""
  });

  const { toast } = useToast();
  const { data: materials = [], refetch } = useLearningMaterials();
  const queryClient = useQueryClient();

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      subject: "",
      class_level: "",
      file_type: "",
      file_size: "",
      file_url: ""
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting learning material:", formData);

      if (editingId) {
        const { error } = await supabase
          .from("learning_materials")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Learning material updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("learning_materials")
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Learning material created successfully",
        });
      }

      resetForm();
      await refetch();
      queryClient.invalidateQueries({ queryKey: ["learning-materials"] });
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save learning material",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (material: any) => {
    setFormData({
      title: material.title,
      description: material.description || "",
      subject: material.subject,
      class_level: material.class_level,
      file_type: material.file_type,
      file_size: material.file_size || "",
      file_url: material.file_url
    });
    setEditingId(material.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this learning material?")) return;

    try {
      const { error } = await supabase
        .from("learning_materials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Learning material deleted successfully",
      });

      await refetch();
      queryClient.invalidateQueries({ queryKey: ["learning-materials"] });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete learning material",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Learning Material" : "Add New Learning Material"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter subject"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class_level">Class Level</Label>
                <Input
                  id="class_level"
                  value={formData.class_level}
                  onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                  placeholder="Enter class level"
                  required
                />
              </div>
              <div>
                <Label htmlFor="file_type">File Type</Label>
                <Input
                  id="file_type"
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  placeholder="Enter file type (PDF, DOC, etc.)"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="file_size">File Size</Label>
                <Input
                  id="file_size"
                  value={formData.file_size}
                  onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                  placeholder="Enter file size (e.g., 2.5 MB)"
                />
              </div>
              <div>
                <Label htmlFor="file_url">File URL</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="Enter file download URL"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter material description"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editingId ? "Update" : "Create"} Material
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Materials</CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No learning materials found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((material) => (
                <Card key={material.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(material)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(material.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Subject: {material.subject}</p>
                    <p>Class: {material.class_level}</p>
                    <p>Type: {material.file_type}</p>
                    {material.file_size && <p>Size: {material.file_size}</p>}
                    <p>Downloads: {material.downloads || 0}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningMaterialsManager;
