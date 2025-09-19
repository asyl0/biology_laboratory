import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Lab } from '@/types'

export function useLabs() {
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLabs()
  }, [])

  const fetchLabs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('labs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setLabs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const createLab = async (labData: Omit<Lab, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating lab with data:', labData)
      
      // Временно отключаем проверки для тестирования
      console.log('Skipping auth checks for testing...')

      console.log('Sending to Supabase...')
      console.log('Supabase client:', supabase)
      console.log('Lab data being sent:', JSON.stringify(labData, null, 2))
      
      const startTime = Date.now()
      console.log('Starting insert at:', new Date().toISOString())
      
            // Добавляем таймаут для отладки
            const insertPromise = supabase
              .from('labs')
              .insert([labData])
              .select()
              .single()

            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout after 30 seconds')), 30000)
            )

      try {
        const result = await Promise.race([insertPromise, timeoutPromise]) as { data: any; error: any }
        const { data, error } = result

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

        console.log('Lab created successfully:', data)
        setLabs(prev => [data, ...prev])
        return data
            } catch (raceError) {
              console.error('Race error (timeout or other):', raceError)
              console.error('Race error details:', {
                message: raceError instanceof Error ? raceError.message : 'Unknown race error',
                stack: raceError instanceof Error ? raceError.stack : undefined,
                name: raceError instanceof Error ? raceError.name : undefined
              })
              throw raceError
            }
          } catch (err) {
            console.error('Error in createLab:', err)
            console.error('Error details:', {
              message: err instanceof Error ? err.message : 'Unknown error',
              stack: err instanceof Error ? err.stack : undefined,
              name: err instanceof Error ? err.name : undefined
            })
            setError(err instanceof Error ? err.message : 'Ошибка создания')
            throw err
          }
  }

  const addLab = createLab

  const updateLab = async (id: string, labData: Partial<Lab>) => {
    try {
      const { data, error } = await supabase
        .from('labs')
        .update({ ...labData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setLabs(prev => prev.map(lab => lab.id === id ? data : lab))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления')
      throw err
    }
  }

  const deleteLab = async (id: string) => {
    try {
      const { error } = await supabase
        .from('labs')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setLabs(prev => prev.filter(lab => lab.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
      throw err
    }
  }

  const getLabById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('labs')
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
    labs,
    loading,
    error,
    fetchLabs,
    createLab,
    addLab,
    updateLab,
    deleteLab,
    getLabById
  }
}
