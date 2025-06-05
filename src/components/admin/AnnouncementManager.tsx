
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AnnouncementManager = () => {
  const { data: announcements, refetch } = useAnnouncements();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    type: "info"
  });

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting announcement:", formData);
      
      if (id) {
        const { error } = await supabase
          .from("announcements")
          .update(formData)
          .eq("id", id);
        
        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        toast({ title: "Announcement updated successfully" });
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert([formData]);
        
        if (error) {
          console.error("Insert error:", error);
          throw error;
        }
        toast({ title: "Announcement created successfully" });
      }
      
      setIsEditing(null);
      setIsCreating(false);
      setFormData({ title: "", content: "", category: "General", type: "info" });
      await refetch();
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to save announcement", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      toast({ title: "Announcement deleted successfully" });
      await refetch();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete announcement", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (announcement: any) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      type: announcement.type
    });
    setIsEditing(announcement.id);
  };

  const startCreate = () => {
    setFormData({ title: "", content: "", category: "General", type: "info" });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Announcements</h3>
        <Button onClick={startCreate} className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Announcement
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
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
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                disabled={loading}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Academics">Academics</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements?.map((announcement) => (
          <Card key={announcement.id}>
            <CardContent className="p-4">
              {isEditing === announcement.id ? (
                <form onSubmit={(e) => handleSubmit(e, announcement.id)} className="space-y-4">
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Academics">Academics</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Events">Events</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(null)} disabled={loading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(announcement)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(announcement.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{announcement.content}</p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{announcement.category}</Badge>
                    <Badge variant="outline">{announcement.type}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementManager;
