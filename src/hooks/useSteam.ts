import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { SteamMaterial } from '@/types'

export function useSteam() {
  const [steamMaterials, setSteamMaterials] = useState<SteamMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSteamMaterials()
  }, [])

  const fetchSteamMaterials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('steam')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSteamMaterials(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const createSteamMaterial = async (materialData: Omit<SteamMaterial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('steam')
        .insert([materialData])
        .select()
        .single()

      if (error) throw error
      
      setSteamMaterials(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания')
      throw err
    }
  }

  const updateSteamMaterial = async (id: string, materialData: Partial<SteamMaterial>) => {
    try {
      const { data, error } = await supabase
        .from('steam')
        .update({ ...materialData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setSteamMaterials(prev => prev.map(material => material.id === id ? data : material))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления')
      throw err
    }
  }

  const deleteSteamMaterial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('steam')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setSteamMaterials(prev => prev.filter(material => material.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
      throw err
    }
  }

  return {
    steamMaterials,
    loading,
    error,
    fetchSteamMaterials,
    createSteamMaterial,
    updateSteamMaterial,
    deleteSteamMaterial
  }
}

