const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Отсутствуют переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdmin() {
  try {
    console.log('🚀 Создание админ-пользователя...')

    // Создаем пользователя
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@biolab.kz',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    if (authError) {
      console.error('❌ Ошибка создания пользователя:', authError.message)
      return
    }

    console.log('✅ Пользователь создан:', authData.user.email)

    // Создаем профиль
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        full_name: 'Администратор',
        role: 'admin'
      })
      .select()
      .single()

    if (profileError) {
      console.error('❌ Ошибка создания профиля:', profileError.message)
      return
    }

    console.log('✅ Профиль создан:', profileData.full_name)
    console.log('🎉 Админ-пользователь успешно создан!')
    console.log('📧 Email: admin@biolab.kz')
    console.log('🔑 Password: admin123456')
    console.log('🌐 Войти: http://localhost:3000/auth/login')

  } catch (error) {
    console.error('❌ Ошибка:', error.message)
  }
}

createAdmin()

