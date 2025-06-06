export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      connected_devices: {
        Row: {
          battery_level: number | null
          created_at: string | null
          device_id: string
          device_name: string
          device_type: string
          id: string
          is_active: boolean | null
          last_sync: string | null
          user_id: string | null
        }
        Insert: {
          battery_level?: number | null
          created_at?: string | null
          device_id: string
          device_name: string
          device_type: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          user_id?: string | null
        }
        Update: {
          battery_level?: number | null
          created_at?: string | null
          device_id?: string
          device_name?: string
          device_type?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connected_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone_number: string
          relationship: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone_number: string
          relationship?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone_number?: string
          relationship?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_incidents: {
        Row: {
          created_at: string | null
          id: string
          location_address: string | null
          location_latitude: number | null
          location_longitude: number | null
          notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["emergency_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["emergency_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["emergency_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_incidents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_goals: {
        Row: {
          created_at: string | null
          current_value: number | null
          goal_type: string
          id: string
          is_active: boolean | null
          target_date: string | null
          target_value: number
          unit: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_value?: number | null
          goal_type: string
          id?: string
          is_active?: boolean | null
          target_date?: string | null
          target_value: number
          unit: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_value?: number | null
          goal_type?: string
          id?: string
          is_active?: boolean | null
          target_date?: string | null
          target_value?: number
          unit?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_metrics: {
        Row: {
          device_id: string | null
          id: string
          is_anomaly: boolean | null
          metric_type: Database["public"]["Enums"]["health_metric_type"]
          recorded_at: string | null
          unit: string
          user_id: string | null
          value: number
        }
        Insert: {
          device_id?: string | null
          id?: string
          is_anomaly?: boolean | null
          metric_type: Database["public"]["Enums"]["health_metric_type"]
          recorded_at?: string | null
          unit: string
          user_id?: string | null
          value: number
        }
        Update: {
          device_id?: string | null
          id?: string
          is_anomaly?: boolean | null
          metric_type?: Database["public"]["Enums"]["health_metric_type"]
          recorded_at?: string | null
          unit?: string
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leadership_team: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number | null
          email: string | null
          id: string
          image_url: string | null
          name: string
          phone: string | null
          position: string
          qualifications: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          name: string
          phone?: string | null
          position: string
          qualifications?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string
          phone?: string | null
          position?: string
          qualifications?: string | null
        }
        Relationships: []
      }
      learning_materials: {
        Row: {
          class_level: string
          created_at: string
          description: string | null
          downloads: number | null
          file_size: string | null
          file_type: string
          file_url: string
          id: string
          subject: string
          title: string
        }
        Insert: {
          class_level: string
          created_at?: string
          description?: string | null
          downloads?: number | null
          file_size?: string | null
          file_type: string
          file_url: string
          id?: string
          subject: string
          title: string
        }
        Update: {
          class_level?: string
          created_at?: string
          description?: string | null
          downloads?: number | null
          file_size?: string | null
          file_type?: string
          file_url?: string
          id?: string
          subject?: string
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          scheduled_for: string | null
          sent_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          scheduled_for?: string | null
          sent_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          gender: string | null
          height_cm: number | null
          id: string
          medical_conditions: string[] | null
          medications: string[] | null
          phone_number: string | null
          theme_preference:
            | Database["public"]["Enums"]["theme_preference"]
            | null
          updated_at: string | null
          weight_kg: number | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          phone_number?: string | null
          theme_preference?:
            | Database["public"]["Enums"]["theme_preference"]
            | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          phone_number?: string | null
          theme_preference?:
            | Database["public"]["Enums"]["theme_preference"]
            | null
          updated_at?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      school_life_gallery: {
        Row: {
          category: string
          created_at: string
          date_taken: string | null
          description: string | null
          id: string
          image_url: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          date_taken?: string | null
          description?: string | null
          id?: string
          image_url: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          date_taken?: string | null
          description?: string | null
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      sleep_sessions: {
        Row: {
          created_at: string | null
          deep_sleep_minutes: number | null
          duration_minutes: number | null
          id: string
          light_sleep_minutes: number | null
          quality_score: number | null
          rem_sleep_minutes: number | null
          sleep_end: string | null
          sleep_start: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deep_sleep_minutes?: number | null
          duration_minutes?: number | null
          id?: string
          light_sleep_minutes?: number | null
          quality_score?: number | null
          rem_sleep_minutes?: number | null
          sleep_end?: string | null
          sleep_start: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deep_sleep_minutes?: number | null
          duration_minutes?: number | null
          id?: string
          light_sleep_minutes?: number | null
          quality_score?: number | null
          rem_sleep_minutes?: number | null
          sleep_end?: string | null
          sleep_start?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sleep_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_status: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
    }
    Enums: {
      emergency_status: "active" | "resolved" | "false_alarm"
      health_metric_type:
        | "heart_rate"
        | "spo2"
        | "steps"
        | "calories"
        | "sleep"
        | "hydration"
        | "stress_hrv"
      notification_type:
        | "medication"
        | "hydration"
        | "safety"
        | "health_insight"
        | "emergency"
      theme_preference: "dark" | "light" | "auto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      emergency_status: ["active", "resolved", "false_alarm"],
      health_metric_type: [
        "heart_rate",
        "spo2",
        "steps",
        "calories",
        "sleep",
        "hydration",
        "stress_hrv",
      ],
      notification_type: [
        "medication",
        "hydration",
        "safety",
        "health_insight",
        "emergency",
      ],
      theme_preference: ["dark", "light", "auto"],
    },
  },
} as const
