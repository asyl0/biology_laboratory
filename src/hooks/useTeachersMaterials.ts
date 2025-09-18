import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { TeacherMaterial } from '@/types'

export function useTeachersMaterials() {
  const [teacherMaterials, setTeacherMaterials] = useState<TeacherMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeacherMaterials()
  }, [])

  const fetchTeacherMaterials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teachers_materials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTeacherMaterials(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const createTeacherMaterial = async (materialData: Omit<TeacherMaterial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('teachers_materials')
        .insert([materialData])
        .select()
        .single()

      if (error) throw error
      
      setTeacherMaterials(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания')
      throw err
    }
  }

  const updateTeacherMaterial = async (id: string, materialData: Partial<TeacherMaterial>) => {
    try {
      const { data, error } = await supabase
        .from('teachers_materials')
        .update({ ...materialData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setTeacherMaterials(prev => prev.map(material => material.id === id ? data : material))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления')
      throw err
    }
  }

  const deleteTeacherMaterial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teachers_materials')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setTeacherMaterials(prev => prev.filter(material => material.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
      throw err
    }
  }

  return {
    teacherMaterials,
    loading,
    error,
    fetchTeacherMaterials,
    createTeacherMaterial,
    updateTeacherMaterial,
    deleteTeacherMaterial
  }
}

