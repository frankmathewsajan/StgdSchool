
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLeadership } from "@/hooks/useLeadership";
import { useQueryClient } from "@tanstack/react-query";

const LeadershipManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const { toast } = useToast();
  const { data: leadership = [], refetch } = useLeadership();
  const queryClient = useQueryClient();

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      bio: "",
      qualifications: "",
      email: "",
      phone: "",
      image_url: "",
      display_order: 0
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting leadership member:", formData);

      const dataToSave = {
        ...formData,
        bio: formData.bio || null,
        qualifications: formData.qualifications || null,
        email: formData.email || null,
        phone: formData.phone || null,
        image_url: formData.image_url || null,
        display_order: formData.display_order || 0
      };

      if (editingId) {
        const { error } = await supabase
          .from("leadership_team")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Leadership member updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("leadership_team")
          .insert([dataToSave]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Leadership member added successfully",
        });
      }

      resetForm();
      await refetch();
      queryClient.invalidateQueries({ queryKey: ["leadership"] });
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save leadership member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: any) => {
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
    setEditingId(member.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leadership member?")) return;

    try {
      const { error } = await supabase
        .from("leadership_team")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Leadership member deleted successfully",
      });

      await refetch();
      queryClient.invalidateQueries({ queryKey: ["leadership"] });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete leadership member",
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
            {editingId ? "Edit Leadership Member" : "Add New Leadership Member"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Enter position/role"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="Enter display order"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                placeholder="Enter qualifications and credentials"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Enter biography and background"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editingId ? "Update" : "Add"} Member
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

      {/* Leadership List */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
        </CardHeader>
        <CardContent>
          {leadership.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No leadership members found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadership.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{member.name}</div>
                          {member.qualifications && (
                            <div className="text-sm text-gray-500">{member.qualifications}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.position}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {member.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.display_order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(member.id)}
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

export default LeadershipManager;
