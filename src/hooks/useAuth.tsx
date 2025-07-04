import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// The passkey should ideally be stored in environment variables or database
// For now, we'll keep it here but in a real app, move this to a secure storage
const ADMIN_PASSKEY = "143143";
const ALLOWED_ADMIN_DOMAINS = ["gmail.com", "outlook.com", "hotmail.com"]; // Add your allowed domains here

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
      
      // First check if the admin user already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error("Error checking admin user:", checkError);
        return;
      }

      // If admin user doesn't exist, create it
      if (!existingAdmin) {
        const { error: insertError } = await supabase
          .from("admin_users")
          .insert({ 
            user_id: userId, 
            role: "admin",
            created_at: new Date().toISOString()
          });

        if (insertError) {
          console.error("Error creating admin user:", insertError);
          return;
        }
      }

      console.log("Admin user setup successful");
    } catch (error) {
      console.error("Admin user setup exception:", error);
    }
  };

  const signUp = async (email, password) => {
    try {
      console.log("Starting signup with email/password");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      console.log("Signup initiated:", data);
      toast({
        title: "Signup Successful",
        description: "Please check your email to confirm your account.",
      });
      return { success: true, error: null };
    } catch (error) {
      console.error("Signup exception:", error);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log("Starting sign in with email/password");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      console.log("Sign in successful:", data);
      return { success: true, error: null, user: data.user };
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

  const verifyPasskey = async (passkey) => {
    if (!user) {
      return { success: false, error: { message: "Not signed in" } };
    }
    
    try {
      console.log("Verifying admin passkey");
      
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
      
      if (passkey === ADMIN_PASSKEY) {
        console.log("Passkey verification successful");
        localStorage.setItem("adminVerified", "true");
        setIsAuthenticated(true);
        await ensureAdminUser(user.id);
        return { success: true, error: null };
      } else {
        console.log("Invalid passkey");
        return { success: false, error: { message: "Invalid passkey" } };
      }
    } catch (error) {
      console.error("Passkey verification error:", error);
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

  // Reset password functionality
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        console.error("Password reset error:", error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error("Password reset exception:", error);
      return { success: false, error: { message: "An unexpected error occurred" } };
    }
  };

  return {
    isAuthenticated,
    loading,
    user,
    signUp,
    signIn,
    verifyPasskey,
    signOut,
    resetPassword,
  };
};
