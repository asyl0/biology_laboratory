import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { SteamMaterial } from '@/types'

export function useSteam() {
  const [materials, setMaterials] = useState<SteamMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('steam')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setMaterials(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const createMaterial = async (materialData: Omit<SteamMaterial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating steam material with data:', materialData)
      
      // Временно отключаем проверки для тестирования
      console.log('Skipping auth checks for testing...')

      console.log('Sending to Supabase...')
      console.log('Supabase client:', supabase)
      console.log('Steam material data being sent:', JSON.stringify(materialData, null, 2))
      
      const startTime = Date.now()
      console.log('Starting insert at:', new Date().toISOString())
      
      // Убираем таймаут для отладки
      const { data, error } = await supabase
        .from('steam')
        .insert([materialData])
        .select()
        .single()

      const endTime = Date.now()
      console.log('Insert completed in:', endTime - startTime, 'ms')
      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          status: error.status,
          statusText: error.statusText
        })
        throw error
      }

      console.log('Steam material created successfully:', data)
      setMaterials(prev => [data, ...prev])
      return data
    } catch (err) {
      console.error('Error in createMaterial:', err)
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        name: err instanceof Error ? err.name : undefined
      })
      setError(err instanceof Error ? err.message : 'Ошибка создания')
      throw err
    }
  }

  const addMaterial = createMaterial;

  const updateMaterial = async (id: string, materialData: Partial<SteamMaterial>) => {
    try {
      const { data, error } = await supabase
        .from('steam')
        .update({ ...materialData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setMaterials(prev => prev.map(material => material.id === id ? data : material))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления')
      throw err
    }
  }

  const deleteMaterial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('steam')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setMaterials(prev => prev.filter(material => material.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
      throw err
    }
  }

  const getMaterialById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('steam')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
      throw err
    }
  }

  return {
    materials,
    loading,
    error,
    fetchMaterials,
    createMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialById
  }
}