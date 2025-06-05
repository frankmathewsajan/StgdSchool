
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Mail, Phone } from "lucide-react";
import { useLeadership } from "@/hooks/useLeadership";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LeadershipManager = () => {
  const { data: leadership, refetch } = useLeadership();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    qualifications: "",
    email: "",
    phone: "",
    image_url: "",
    display_order: 0
  });

  const handleSubmit = async (e: React.FormEvent, id?: string) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting leadership member:", formData);
      
      if (id) {
        const { error } = await supabase
          .from("leadership_team")
          .update(formData)
          .eq("id", id);
        
        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        toast({ title: "Leadership member updated successfully" });
      } else {
        const { error } = await supabase
          .from("leadership_team")
          .insert([formData]);
        
        if (error) {
          console.error("Insert error:", error);
          throw error;
        }
        toast({ title: "Leadership member created successfully" });
      }
      
      setIsEditing(null);
      setIsCreating(false);
      setFormData({ name: "", position: "", bio: "", qualifications: "", email: "", phone: "", image_url: "", display_order: 0 });
      await refetch();
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to save leadership member", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leadership member?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("leadership_team")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Delete error:", error);
        throw error;
      }
      toast({ title: "Leadership member deleted successfully" });
      await refetch();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete leadership member", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (member: any) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || "",
      qualifications: member.qualifications || "",
      email: member.email || "",
      phone: member.phone || "",
      image_url: member.image_url || "",
      display_order: member.display_order || 0
    });
    setIsEditing(member.id);
  };

  const startCreate = () => {
    setFormData({ name: "", position: "", bio: "", qualifications: "", email: "", phone: "", image_url: "", display_order: 0 });
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Leadership Team</h3>
        <Button onClick={startCreate} className="bg-[#7d0a0a] hover:bg-[#5d0808]" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Leadership Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />
                <Input
                  placeholder="Position (e.g., Principal, HOD Mathematics)"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <Textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={loading}
              />
              <Textarea
                placeholder="Qualifications"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                disabled={loading}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
                <Input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                />
              </div>
              <Input
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                disabled={loading}
              />
              <Input
                placeholder="Display Order (0 for highest priority)"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
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

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leadership?.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              {isEditing === member.id ? (
                <form onSubmit={(e) => handleSubmit(e, member.id)} className="space-y-4">
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    disabled={loading}
                  />
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
                  <div className="relative mb-4">
                    <img
                      src={member.image_url || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=400&h=400"}
                      alt={member.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(member)}
                        disabled={loading}
                        className="bg-white/80"
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(member.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{member.name}</h4>
                  <Badge variant="outline" className="text-xs mb-2">{member.position}</Badge>
                  {member.bio && <p className="text-xs text-gray-600 mb-2 line-clamp-2">{member.bio}</p>}
                  {member.qualifications && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-[#7d0a0a]">Qualifications:</p>
                      <p className="text-xs text-gray-600">{member.qualifications}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    {member.email && (
                      <div className="flex items-center space-x-1 text-xs">
                        <Mail className="h-3 w-3 text-[#7d0a0a]" />
                        <span className="text-gray-600">{member.email}</span>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center space-x-1 text-xs">
                        <Phone className="h-3 w-3 text-[#7d0a0a]" />
                        <span className="text-gray-600">{member.phone}</span>
                      </div>
                    )}
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

export default LeadershipManager;
