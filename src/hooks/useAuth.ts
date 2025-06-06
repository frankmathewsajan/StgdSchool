
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem("adminAuthenticated");
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true);
      // Ensure admin user exists in database
      ensureAdminUser();
    }
    setLoading(false);
  }, []);

  const ensureAdminUser = async () => {
    try {
      // Create a dummy admin user entry if it doesn't exist
      const { error } = await supabase
        .from("admin_users")
        .upsert({ 
          user_id: "admin-user-id", 
          role: "admin" 
        }, { 
          onConflict: "user_id" 
        });
      
      if (error) {
        console.log("Admin user setup:", error);
      }
    } catch (error) {
      console.log("Admin user setup exception:", error);
    }
  };

  const signIn = async (passkey: string) => {
    try {
      if (passkey === "143143") {
        localStorage.setItem("adminAuthenticated", "true");
        setIsAuthenticated(true);
        await ensureAdminUser();
        console.log("Admin login successful");
        return { success: true, error: null };
      } else {
        console.log("Invalid passkey");
        return { success: false, error: { message: "Invalid passkey" } };
      }
    } catch (error) {
      console.log("Login exception:", error);
      return { success: false, error: { message: "An unexpected error occurred" } };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("adminAuthenticated");
      setIsAuthenticated(false);
      console.log("Admin logout successful");
      return { error: null };
    } catch (error) {
      console.log("Logout exception:", error);
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  return {
    isAuthenticated,
    loading,
    signIn,
    signOut,
  };
};
