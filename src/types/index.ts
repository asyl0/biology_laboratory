export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  class?: number; // 7-11 для учеников
  role: UserRole; // Добавляем роль в профиль
  created_at: string;
  updated_at: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  theory: string;
  process: string;
  image_url?: string;
  video_url?: string;
  external_links?: string[];
  files: string[];
  class_level: number; // 7-11
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface SteamMaterial {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  external_links?: string[];
  files: string[];
  class_level: number; // 7-11
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface TeacherMaterial {
  id: string;
  title: string;
  description: string;
  files: string[];
  class_level?: number; // 7-11, опционально
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

export interface SearchFilters {
  class_level?: number;
  type?: 'labs' | 'steam' | 'teachers';
  search?: string;
}

