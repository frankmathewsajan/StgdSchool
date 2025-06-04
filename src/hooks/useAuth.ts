
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const isAdmin = async () => {
    if (!user) {
      console.log("No user for admin check");
      return false;
    }
    
    console.log("Checking admin status for user:", user.id);
    
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .single();
      
      console.log("Admin check result:", { data, error });
      
      if (error) {
        console.log("Admin check error:", error.message);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.log("Admin check exception:", error);
      return false;
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
  };
};
