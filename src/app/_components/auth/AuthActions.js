'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function getTheUser() {
  const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if(error){
      console.error('Error while getting User', error)
      return;
    }

    return data.user;
}

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
  redirect(`/user/${(await getTheUser()).user_metadata.first_name}/Profile`)
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
  redirect(`/user/${(await getTheUser()).user_metadata.first_name}/Profile`)
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

export async function resetPassword(email){
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email.email)

    if(error){
        console.error('Something went wrong with sending you the password reset link ', error);
    }

}

export async function deleteOwnAccount(user){
  const supabase = createClient();

  let { error } = await supabase.rpc('delete_own_account', { user_id: user.user.id })
  //have to clear localstorage from client comp
  if(error) console.error(error);
  await signOut();

}

export async function changePassword(newPassword){
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if(error){
    console.error('Please try again', error)
  }

  if(data){
      console.log('Password changed successfully')
      redirect('/')
  }
}