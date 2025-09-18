'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface TeacherMaterial {
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

export function useTeachersMaterials() {
  const [materials, setMaterials] = useState<TeacherMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchMaterials = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teachers_materials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching teacher materials:', error)
        setError(error.message)
        return
      }

      setMaterials(data || [])
    } catch (err) {
      console.error('Error in fetchMaterials:', err)
      setError('Failed to fetch materials')
    } finally {
      setLoading(false)
    }
  }, [])

  const createMaterial = async (materialData: Omit<TeacherMaterial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating teacher material with data:', materialData)
      
      // Подготавливаем данные для вставки, убираем undefined значения
      const insertData = {
        title: materialData.title,
        description: materialData.description,
        class_level: materialData.class_level,
        image_url: materialData.image_url || null,
        files: materialData.files || null,
        theory: null, // Поле не используется в упрощенной форме
        process: null, // Поле не используется в упрощенной форме
        video_url: null, // Поле не используется в упрощенной форме
        external_links: null // Поле не используется в упрощенной форме
      }
      
      const { data, error } = await supabase
        .from('teachers_materials')
        .insert([insertData])
        .select()

      if (error) {
        console.error('Error creating teacher material:', error)
        throw error
      }

      console.log('Teacher material created successfully:', data)
      await fetchMaterials()
      return data?.[0]
    } catch (err) {
      console.error('Error in createMaterial:', err)
      throw err
    }
  }

  const updateMaterial = async (id: string, materialData: Partial<TeacherMaterial>) => {
    try {
      const { data, error } = await supabase
        .from('teachers_materials')
        .update(materialData)
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error updating teacher material:', error)
        throw error
      }

      await fetchMaterials()
      return data?.[0]
    } catch (err) {
      console.error('Error in updateMaterial:', err)
      throw err
    }
  }

  const deleteMaterial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teachers_materials')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting teacher material:', error)
        throw error
      }

      await fetchMaterials()
    } catch (err) {
      console.error('Error in deleteMaterial:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  return {
    materials,
    teachersMaterials: materials, // Алиас для совместимости
    loading,
    error,
    fetchMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial
  }
}