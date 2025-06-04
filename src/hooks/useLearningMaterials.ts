
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLearningMaterials = () => {
  return useQuery({
    queryKey: ["learning-materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_materials")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};
