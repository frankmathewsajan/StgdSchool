
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, LogIn, Mail, KeyRound, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passkey, setPasskey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  
  const { signIn, signUp, verifyPasskey, user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log("Admin already authenticated, redirecting to dashboard");
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle auth redirect callback
  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting auth session:", error);
        return;
      }
      
      if (data?.session?.user) {
        setVerificationStep(true);
      }
    };

    if (!authLoading && !isAuthenticated) {
      handleAuthRedirect();
    }
  }, [authLoading, isAuthenticated]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { success, error, user } = await signIn(email, password);
      if (error) {
        console.error("Email/password sign in error:", error);
        setError(error.message);
      } else if (success) {
        setVerificationStep(true);
      }
    } catch (err) {
      console.error("Sign in exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { success, error } = await signUp(email, password);
      if (error) {
        console.error("Signup error:", error);
        setError(error.message);
      } else if (success) {
        toast({
          title: "Sign Up Successful",
          description: "Check your email for verification link.",
        });
        setActiveTab("signin");
      }
    } catch (err) {
      console.error("Signup exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPasskey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { success, error } = await verifyPasskey(passkey);
      
      if (error) {
        console.log("Passkey verification error:", error);
        setError(error.message);
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (success) {
        console.log("Passkey verification successful");
        toast({
          title: "Verification Successful",
          description: "Welcome to the admin dashboard!",
        });
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("Verification exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
          <CardDescription className="text-gray-600">St. G. D. Convent School</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {verificationStep ? (
            // Step 2: Passkey verification form
            <>
              <div className="mb-6 text-center">
                <p className="font-medium">Signed in as:</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-700">{user?.email}</p>
                </div>
              </div>
              
              <form onSubmit={handleVerifyPasskey} className="space-y-4">
                <div>
                  <Label htmlFor="passkey">Admin Passkey</Label>
                  <Input
                    id="passkey"
                    type="password"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter admin passkey"
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
                    "Verifying..."
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4 mr-2" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            // Step 1: Email/Password Authentication
            <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
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
                      placeholder="******"
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
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                      required
                      className="mt-1"
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#7d0a0a] hover:bg-[#5d0808]"
                    disabled={loading}
                  >
                    {loading ? (
                      "Signing up..."
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
          
          {/* Debug info for development only - remove in production */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold mb-2">Admin Passkey:</p>
              <p className="font-mono text-lg">143143</p>
              <p className="text-xs mt-2 text-gray-500">
                After signing in, enter this passkey to access the admin dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
