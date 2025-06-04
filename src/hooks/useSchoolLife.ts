
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSchoolLife = () => {
  return useQuery({
    queryKey: ["school-life"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("school_life_gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};
