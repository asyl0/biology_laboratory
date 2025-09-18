import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FileUpload } from '@/types'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File, folder: string = 'files'): Promise<string> => {
    try {
      setUploading(true)
      
      // Генерируем уникальное имя файла
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Загружаем файл в Supabase Storage
      const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file)

      if (error) throw error

      // Получаем публичный URL
      const { data: urlData } = supabase.storage
        .from('files')
        .getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const uploadMultipleFiles = async (files: File[], folder: string = 'files'): Promise<string[]> => {
    try {
      setUploading(true)
      const uploadPromises = files.map(file => uploadFile(file, folder))
      const urls = await Promise.all(uploadPromises)
      return urls
    } catch (error) {
      console.error('Error uploading multiple files:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const deleteFile = async (filePath: string): Promise<void> => {
    try {
      const { error } = await supabase.storage
        .from('files')
        .remove([filePath])

      if (error) throw error
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  return {
    uploading,
    uploadFile,
    uploadMultipleFiles,
    deleteFile
  }
}

