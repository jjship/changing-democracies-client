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
      posters: {
        Row: {
          created_at: string;
          created_by: string | null;
          // id: number;
          url: string;
          location: string | null;
          published: boolean;
          bunny_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          // id?: number;
          url: string;
          location: string;
          published: boolean;
          bunny_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          // id?: number;
          url?: string | null;
          location?: string | null;
          published?: boolean | null;
          bunny_id?: string | null;
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

export type PosterDbEntry = Database["public"]["Tables"]["posters"]["Row"];

export type PosterUpdateModel =
  Database["public"]["Tables"]["posters"]["Update"];

export type PosterInsertModel =
  Database["public"]["Tables"]["posters"]["Insert"];
