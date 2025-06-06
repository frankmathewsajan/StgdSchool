
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Download, FileText } from "lucide-react";
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
    file_url: "",
    file_type: "pdf",
    file_size: "",
    class_level: "",
    subject: ""
  });

  const { toast } = useToast();
  const { data: materials = [], refetch } = useLearningMaterials();
  const queryClient = useQueryClient();

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      file_url: "",
      file_type: "pdf",
      file_size: "",
      class_level: "",
      subject: ""
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
          description: "Learning material added successfully",
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
      file_url: material.file_url,
      file_type: material.file_type,
      file_size: material.file_size || "",
      class_level: material.class_level,
      subject: material.subject
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="class_level">Class Level</Label>
                <Select
                  value={formData.class_level}
                  onValueChange={(value) => setFormData({ ...formData, class_level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nursery">Nursery</SelectItem>
                    <SelectItem value="LKG">LKG</SelectItem>
                    <SelectItem value="UKG">UKG</SelectItem>
                    <SelectItem value="Class 1">Class 1</SelectItem>
                    <SelectItem value="Class 2">Class 2</SelectItem>
                    <SelectItem value="Class 3">Class 3</SelectItem>
                    <SelectItem value="Class 4">Class 4</SelectItem>
                    <SelectItem value="Class 5">Class 5</SelectItem>
                    <SelectItem value="Class 6">Class 6</SelectItem>
                    <SelectItem value="Class 7">Class 7</SelectItem>
                    <SelectItem value="Class 8">Class 8</SelectItem>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file_type">File Type</Label>
                <Select
                  value={formData.file_type}
                  onValueChange={(value) => setFormData({ ...formData, file_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="doc">DOC</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="ppt">PPT</SelectItem>
                    <SelectItem value="pptx">PPTX</SelectItem>
                    <SelectItem value="xls">XLS</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file_size">File Size</Label>
                <Input
                  id="file_size"
                  value={formData.file_size}
                  onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                  placeholder="e.g., 2.5 MB"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="file_url">File URL</Label>
              <Input
                id="file_url"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                placeholder="Enter file URL"
                required
              />
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
                {isLoading ? "Saving..." : editingId ? "Update" : "Add"} Material
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
            <p className="text-gray-500 text-center py-4">No learning materials found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {material.title}
                      </div>
                    </TableCell>
                    <TableCell>{material.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.class_level}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{material.file_type.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{material.file_size || "N/A"}</TableCell>
                    <TableCell>{material.downloads || 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(material.file_url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningMaterialsManager;
