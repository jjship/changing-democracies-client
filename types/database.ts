export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          category: string | null;
          created_at: string;
          created_by: string | null;
          end_date: string | null;
          id: number;
          link: string | null;
          location: string | null;
          modified_at: string | null;
          modified_by: string | null;
          participants: number | null;
          start_date: string | null;
          title: string | null;
          type: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_date?: string | null;
          id?: number;
          link?: string | null;
          location?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          participants?: number | null;
          start_date?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_date?: string | null;
          id?: number;
          link?: string | null;
          location?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          participants?: number | null;
          start_date?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
export type EventDbEntry = Database["public"]["Tables"]["events"]["Row"];

export type Events = Event[];
