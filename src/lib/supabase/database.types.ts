export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      courts: {
        Row: {
          id: number;
          name: string;
          type: "panorama" | "indoor" | "outdoor";
          indoor: boolean;
          mode: "Doppel" | "Einzel";
          price: number;
        };
        Insert: {
          id?: number;
          name: string;
          type: "panorama" | "indoor" | "outdoor";
          indoor?: boolean;
          mode: "Doppel" | "Einzel";
          price: number;
        };
        Update: Partial<Database["public"]["Tables"]["courts"]["Insert"]>;
      };
      equipment: {
        Row: {
          id: string;
          cat: "racket" | "ball" | "shoe" | "extra";
          name: string;
          tag: string;
          price: number;
          per_day: boolean;
          stock: number;
          blurb: string;
        };
        Insert: Database["public"]["Tables"]["equipment"]["Row"];
        Update: Partial<Database["public"]["Tables"]["equipment"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          name: string;
          initials: string;
          member_tier: string;
          since_year: number | null;
          credit: number;
          level: string | null;
          role: "player" | "admin";
        };
        Insert: {
          id: string;
          name: string;
          initials: string;
          member_tier?: string;
          since_year?: number | null;
          credit?: number;
          level?: string | null;
          role?: "player" | "admin";
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          court_id: number;
          booking_date: string;
          slot_index: number;
          time_label: string;
          players: number;
          gear: string[];
          price: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          court_id: number;
          booking_date: string;
          slot_index: number;
          time_label: string;
          players?: number;
          gear?: string[];
          price: number;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      slot_occupancy: {
        Row: {
          court_id: number;
          booking_date: string;
          slot_index: number;
          state: "free" | "booked" | "mine";
          booked_by: string | null;
          booking_id: string | null;
        };
        Insert: Database["public"]["Tables"]["slot_occupancy"]["Row"];
        Update: Partial<Database["public"]["Tables"]["slot_occupancy"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
