
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@stgdconvent.edu");
  const [password, setPassword] = useState("admin123456");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn, createAdminUser, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      console.log("User already authenticated, redirecting to dashboard");
      navigate("/admin/dashboard");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Attempting login with:", email);

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.log("Login error:", error);
        setError(error.message);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.user) {
        console.log("Login successful:", data.user.email);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        // Navigation will be handled by the useEffect above
      }
    } catch (err) {
      console.log("Login exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    setCreating(true);
    setError("");

    try {
      const { data, error } = await createAdminUser(email, password);
      
      if (error) {
        setError(error.message);
        toast({
          title: "Admin Creation Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Admin Created Successfully",
          description: "Admin user created. You can now sign in.",
        });
      }
    } catch (err) {
      console.log("Create admin exception:", err);
      setError("Failed to create admin user.");
    } finally {
      setCreating(false);
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7d0a0a] via-[#8d1515] to-[#6d0808] flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7d0a0a] via-[#8d1515] to-[#6d0808] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#7d0a0a] p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Portal</CardTitle>
          <p className="text-gray-600">St. G. D. Convent School</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#7d0a0a] hover:bg-[#5d0808]"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4">
            <Button
              onClick={handleCreateAdmin}
              variant="outline"
              className="w-full"
              disabled={creating}
            >
              {creating ? (
                "Creating Admin..."
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Admin User
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Email: admin@stgdconvent.edu</p>
              <p>Password: admin123456</p>
              <p className="text-xs mt-2 text-gray-500">
                Use "Create Admin User" if this is your first time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
