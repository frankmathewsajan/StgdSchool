
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useSchoolLife } from "@/hooks/useSchoolLife";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GalleryManager = () => {
  const { data: gallery, refetch } = useSchoolLife();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    image_url: "",
    date_taken: ""
  });

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    
    try {
      if (id) {
        const { error } = await supabase
          .from("school_life_gallery")
          .update(formData)
          .eq("id", id);
        
        if (error) throw error;
        toast({ title: "Gallery item updated successfully" });
      } else {
        const { error } = await supabase
          .from("school_life_gallery")
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Gallery item created successfully" });
      }
      
      setIsEditing(null);
      setIsCreating(false);
      setFormData({ title: "", description: "", category: "general", image_url: "", date_taken: "" });
      refetch();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to save gallery item", 
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    
    try {
      const { error } = await supabase
        .from("school_life_gallery")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast({ title: "Gallery item deleted successfully" });
      refetch();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to delete gallery item", 
        variant: "destructive" 
      });
    }
  };

  const startEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      image_url: item.image_url,
      date_taken: item.date_taken || ""
    });
    setIsEditing(item.id);
  };

  const startCreate = () => {
    setFormData({ title: "", description: "", category: "general", image_url: "", date_taken: "" });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Gallery</h3>
        <Button onClick={startCreate} className="bg-[#7d0a0a] hover:bg-[#5d0808]">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Gallery Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="campus">Campus</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={formData.date_taken}
                  onChange={(e) => setFormData({ ...formData, date_taken: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#7d0a0a] hover:bg-[#5d0808]">Save</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              {isEditing === item.id ? (
                <form onSubmit={(e) => handleSubmit(e, item.id)} className="space-y-4">
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="academics">Academics</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="campus">Campus</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={formData.date_taken}
                      onChange={(e) => setFormData({ ...formData, date_taken: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" size="sm" className="bg-[#7d0a0a] hover:bg-[#5d0808]">Save</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setIsEditing(null)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div>
                  <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(item)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {item.description && <p className="text-xs text-gray-600 mb-2">{item.description}</p>}
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
