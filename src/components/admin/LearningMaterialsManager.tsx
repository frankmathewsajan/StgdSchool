
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Download, FileText } from "lucide-react";
import { useLearningMaterials } from "@/hooks/useLearningMaterials";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LearningMaterialsManager = () => {
  const { data: materials, refetch } = useLearningMaterials();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class_level: "Class 1",
    subject: "Mathematics",
    file_url: "",
    file_type: "pdf",
    file_size: ""
  });

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting learning material:", formData);
      
      if (id) {
        const { error } = await supabase
          .from("learning_materials")
          .update(formData)
          .eq("id", id);
        
        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        toast({ title: "Learning material updated successfully" });
      } else {
        const { error } = await supabase
          .from("learning_materials")
          .insert([formData]);
        
        if (error) {
          console.error("Insert error:", error);
          throw error;
        }
        toast({ title: "Learning material created successfully" });
      }
      
      setIsEditing(null);
      setIsCreating(false);
      setFormData({ title: "", description: "", class_level: "Class 1", subject: "Mathematics", file_url: "", file_type: "pdf", file_size: "" });
      await refetch();
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to save learning material", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this learning material?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("learning_materials")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      toast({ title: "Learning material deleted successfully" });
      await refetch();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete learning material", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (material: any) => {
    setFormData({
      title: material.title,
      description: material.description || "",
      class_level: material.class_level,
      subject: material.subject,
      file_url: material.file_url,
      file_type: material.file_type,
      file_size: material.file_size || ""
    });
    setIsEditing(material.id);
  };

  const startCreate = () => {
    setFormData({ title: "", description: "", class_level: "Class 1", subject: "Mathematics", file_url: "", file_type: "pdf", file_size: "" });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Learning Materials</h3>
        <Button onClick={startCreate} className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Learning Material</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={loading}
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={loading}
              />
              <Input
                placeholder="File URL (e.g., https://example.com/file.pdf)"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                required
                disabled={loading}
              />
              <div className="grid grid-cols-3 gap-4">
                <Select value={formData.class_level} onValueChange={(value) => setFormData({ ...formData, class_level: value })} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={`Class ${i + 1}`}>Class {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.file_type} onValueChange={(value) => setFormData({ ...formData, file_type: value })} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="doc">DOC</SelectItem>
                    <SelectItem value="ppt">PPT</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="File Size (e.g., 2.5 MB)"
                value={formData.file_size}
                onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                disabled={loading}
              />
              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials?.map((material) => (
          <Card key={material.id}>
            <CardContent className="p-4">
              {isEditing === material.id ? (
                <form onSubmit={(e) => handleSubmit(e, material.id)} className="space-y-4">
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={formData.class_level} onValueChange={(value) => setFormData({ ...formData, class_level: value })} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={`Class ${i + 1}`}>Class {i + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Social Studies">Social Studies</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" size="sm" className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setIsEditing(null)} disabled={loading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="h-8 w-8 text-[#7d0a0a]" />
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(material)}
                        disabled={loading}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(material.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-2">{material.title}</h4>
                  {material.description && <p className="text-xs text-gray-600 mb-2">{material.description}</p>}
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">{material.class_level}</Badge>
                    <Badge variant="outline" className="text-xs">{material.subject}</Badge>
                    <Badge variant="outline" className="text-xs">{material.file_type.toUpperCase()}</Badge>
                  </div>
                  {material.file_size && <p className="text-xs text-gray-500 mb-2">Size: {material.file_size}</p>}
                  <a
                    href={material.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-[#7d0a0a] hover:underline"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningMaterialsManager;
