'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function signIn(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('Email'),
    password: formData.get('Password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error(error)
  }

  revalidatePath('/', 'layout')
  redirect('/Profile')
}


export async function signUp(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('Email'),
    password: formData.get('Password'),
    options: {
        data: {
          first_name: formData.get('Name')
        }
      }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error(error)
  }

  revalidatePath('/', 'layout')
  redirect('/Profile')
}

export async function signOut(){
  const supabase = createClient();
    
  const { error } = await supabase.auth.signOut()

  if(error){
    console.error(error)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}