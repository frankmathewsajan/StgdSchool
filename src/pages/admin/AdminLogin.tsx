
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  
  const { signInWithGoogle, verifyPasscode, user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log("Admin already authenticated, redirecting to dashboard");
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle OAuth redirect callback
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        console.error("Google sign in error:", error);
        setError(error.message);
      }
    } catch (err) {
      console.error("Google sign in exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { success, error } = await verifyPasscode(passcode);
      
      if (error) {
        console.log("Passcode verification error:", error);
        setError(error.message);
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (success) {
        console.log("Passcode verification successful");
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
          <p className="text-gray-600">St. G. D. Convent School</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {verificationStep ? (
            // Step 2: Passcode verification form
            <>
              <div className="mb-6 text-center">
                <p className="font-medium">Signed in as:</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-700">{user?.email}</p>
                </div>
              </div>
              
              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <div>
                  <Label htmlFor="passcode">Admin Passcode</Label>
                  <Input
                    id="passcode"
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode"
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
                      <LogIn className="h-4 w-4 mr-2" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            // Step 1: Google sign in button
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600">Sign in with your Google account to access the admin dashboard.</p>
              </div>
              
              <Button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
            </>
          )}
          
          {/* Debug info for development only - remove in production */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold mb-2">Admin Passcode:</p>
              <p className="font-mono text-lg">143143</p>
              <p className="text-xs mt-2 text-gray-500">
                After Google Sign-in, enter this passcode to access the admin dashboard.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
