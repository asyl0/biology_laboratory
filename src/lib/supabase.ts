import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://imqhztqwongowiseqmff.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcWh6dHF3b25nb3dpc2VxbWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjkxMDksImV4cCI6MjA3Mzc0NTEwOX0.Q971ZjKrB1vqVNGx2yOqrPPNg_Z4-CMyP63sONQp7L0'

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
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          theory?: string
          process?: string
          class_level?: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      teachers_materials: {
        Row: {
          id: string
          title: string
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          theory?: string
          process?: string
          class_level?: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      students_materials: {
        Row: {
          id: string
          title: string
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          theory?: string
          process?: string
          class_level: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          theory?: string
          process?: string
          class_level?: number
          image_url?: string
          video_url?: string
          external_links?: string[]
          files?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}


