
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session first
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.log("Initial session error:", error);
        } else {
          console.log("Initial session:", session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.log("Initial session exception:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.log("Sign in error:", error);
        return { data: null, error };
      }
      
      console.log("Sign in successful:", data.user?.email);
      return { data, error: null };
    } catch (error) {
      console.log("Sign in exception:", error);
      return { data: null, error: { message: "An unexpected error occurred" } };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("Sign out error:", error);
      }
      return { error };
    } catch (error) {
      console.log("Sign out exception:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const isAdmin = async () => {
    if (!user) {
      console.log("No user for admin check");
      return false;
    }
    
    console.log("Checking admin status for user:", user.id);
    
    try {
      // Use the service role or ensure RLS allows this check
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      
      console.log("Admin check result:", { data, error });
      
      if (error) {
        console.log("Admin check error:", error.message);
        return false;
      }
      
      const isAdminUser = !!data;
      console.log("User is admin:", isAdminUser);
      return isAdminUser;
    } catch (error) {
      console.log("Admin check exception:", error);
      return false;
    }
  };

  const createAdminUser = async (email: string, password: string) => {
    try {
      // First, sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.log("Admin signup error:", signUpError);
        return { error: signUpError };
      }

      if (signUpData.user) {
        // Add user to admin_users table
        const { error: adminError } = await supabase
          .from("admin_users")
          .insert([{ user_id: signUpData.user.id, role: "admin" }]);

        if (adminError) {
          console.log("Admin creation error:", adminError);
          return { error: adminError };
        }

        console.log("Admin user created successfully");
        return { data: signUpData.user, error: null };
      }

      return { error: { message: "Failed to create user" } };
    } catch (error) {
      console.log("Create admin exception:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
    createAdminUser,
  };
};
