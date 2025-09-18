import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для базы данных
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          class?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          class?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          class?: number
          created_at?: string
          updated_at?: string
        }
      }
      labs: {
        Row: {
          id: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          theory: string
          theory_kz?: string
          process: string
          process_kz?: string
          image_url?: string
          video_url?: string
          external_links?: string[]
          files: string[]
          class_level: number
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          theory: string
          theory_kz?: string
          process: string
          process_kz?: string
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          class_level: number
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          title_kz?: string
          description?: string
          description_kz?: string
          theory?: string
          theory_kz?: string
          process?: string
          process_kz?: string
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          class_level?: number
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      steam: {
        Row: {
          id: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          image_url?: string
          external_links?: string[]
          files: string[]
          class_level: number
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          image_url?: string
          external_links?: string[]
          files?: string[]
          class_level: number
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          title_kz?: string
          description?: string
          description_kz?: string
          image_url?: string
          external_links?: string[]
          files?: string[]
          class_level?: number
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      teachers_materials: {
        Row: {
          id: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          files: string[]
          class_level?: number
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          title_kz?: string
          description: string
          description_kz?: string
          files?: string[]
          class_level?: number
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          title_kz?: string
          description?: string
          description_kz?: string
          files?: string[]
          class_level?: number
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
    }
  }
}


