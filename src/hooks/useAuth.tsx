import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// The passcode should ideally be stored in environment variables or database
// For now, we'll keep it here but in a real app, move this to a secure storage
const ADMIN_PASSCODE = "143143";
const ALLOWED_ADMIN_DOMAINS = ["gmail.com"]; // Add your allowed domains here

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        if (session?.user) {
          setUser(session.user);
          // Check if the user has been verified as admin
          const adminVerified = localStorage.getItem("adminVerified");
          if (adminVerified === "true") {
            setIsAuthenticated(true);
            ensureAdminUser(session.user.id);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("adminVerified");
        }
        
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem("adminVerified");
          setIsAuthenticated(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session?.user?.email);
      if (session?.user) {
        setUser(session.user);
        // Check if the user has been verified as admin
        const adminVerified = localStorage.getItem("adminVerified");
        if (adminVerified === "true") {
          setIsAuthenticated(true);
          ensureAdminUser(session.user.id);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const ensureAdminUser = async (userId) => {
    try {
      console.log("Ensuring admin user exists in database");
      // Create a dummy admin user entry if it doesn't exist
      const { error } = await supabase
        .from("admin_users")
        .upsert({ 
          user_id: userId, 
          role: "admin" 
        }, { 
          onConflict: "user_id" 
        });
      
      if (error) {
        console.log("Admin user setup error:", error);
      } else {
        console.log("Admin user setup successful");
      }
    } catch (error) {
      console.log("Admin user setup exception:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign in");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin/login`
        }
      });
      
      if (error) {
        console.error("Google sign in error:", error);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      console.log("Google sign in initiated:", data);
      return { success: true, error: null };
    } catch (error) {
      console.error("Login exception:", error);
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const verifyPasscode = async (passcode) => {
    if (!user) {
      return { success: false, error: { message: "Not signed in" } };
    }
    
    try {
      console.log("Verifying admin passcode");
      
      // Check if email domain is allowed
      const emailDomain = user.email.split('@')[1];
      const isDomainAllowed = ALLOWED_ADMIN_DOMAINS.includes(emailDomain);
      
      if (!isDomainAllowed) {
        console.log("Email domain not allowed:", emailDomain);
        return { 
          success: false, 
          error: { message: "Email domain not authorized for admin access" } 
        };
      }
      
      if (passcode === ADMIN_PASSCODE) {
        console.log("Passcode verification successful");
        localStorage.setItem("adminVerified", "true");
        setIsAuthenticated(true);
        await ensureAdminUser(user.id);
        return { success: true, error: null };
      } else {
        console.log("Invalid passcode");
        return { success: false, error: { message: "Invalid passcode" } };
      }
    } catch (error) {
      console.error("Passcode verification error:", error);
      return { success: false, error: { message: "Verification failed" } };
    }
  };

  const signOut = async () => {
    try {
      console.log("Admin signing out");
      localStorage.removeItem("adminVerified");
      setIsAuthenticated(false);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        return { error };
      }
      
      console.log("Sign out successful");
      return { error: null };
    } catch (error) {
      console.error("Logout exception:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  return {
    isAuthenticated,
    loading,
    user,
    signInWithGoogle,
    verifyPasscode,
    signOut,
  };
};
