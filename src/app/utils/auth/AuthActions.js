'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';

export async function getCurrentUser() {
  const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if(error){
      console.error('Error while getting User', error)
      return;
    }

    return data.user;
}

export async function PandaScoreApi(game, size) {
  const access_key = process.env.PANDASCORE_API_ACCESS_KEY;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${access_key}`
    }
  };

  const returnThis = [];
  
  await fetch(`https://api.pandascore.co/${game}/tournaments/upcoming?page[size]=${size}`, options)
    .then(res => res.json())
    .then(res => res.map((i) => returnThis.push({
      'Date': [new Date(i.begin_at), new Date(i.end_at)].map(date => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })).join(' - '),
      'LeagueName': i.league.name,
      'Prizepool': i.prizepool?.includes('United States Dollar') ? `$${parseInt(i.prizepool.replace('United States Dollar', '')).toLocaleString()}` : (i.prizepool?.includes('South Korean Won') ? `₩${parseInt(i.prizepool.replace('South Korean Won', '')).toLocaleString()}` : (i.prizepool || '$0')),
      'Teams': i.teams.map((team)=>team.acronym).join(', ') || 'Not Available',
      'Type': i.name
    })))
    .catch(err => console.error(err));

    return(returnThis);
}

export async function RawgApi(game) {
  const access_key = process.env.RAWG_API_ACCESS_KEY;
  
  const returnThis = [];

  await fetch(`https://api.rawg.io/api/games/${game}?exclude_additions=true&page_size=10&key=${access_key}`, {
    method: 'GET'
  })
  .then(res => res.json())
  .then(res => returnThis.push({
    'Name': res.name,
    'Rating': Math.round(res.rating * 10)/10,
    'Genres': res.genres && res.genres.length > 0 ? (res.genres.map((genre) => genre.name).length > 3 ? (res.genres.map((genre) => genre.name)).slice(0, 3).join(', ') : res.genres.map((genre) => genre.name).join(', ')) : 'Not Available',
    'Released': res.released,
    'Platforms': res.platforms && res.platforms.length > 0 ? (res.platforms.map((platform) => platform.platform.name).length > 3 ? (res.platforms.map((platform) => platform.platform.name)).slice(0, 3).join(', ') : res.platforms.map((platform) => platform.platform.name).join(', ')) : 'Not Available',
    'Stores': res.stores && res.stores.length > 0 ? (res.stores.map((store) => store.store.name).length > 3 ? (res.stores.map((store) => store.store.name)).slice(0, 3).join(', ').replaceAll('Store', '') : res.stores.map((store) => store.store.name).join(', ').replaceAll('Store', '')) : 'Not Available',
    'BgImage': res.background_image,
    'Developers': res.developers && res.developers.length > 0 ? res.developers.map((i) => i.name).join(', ') : 'Not Available',
    'Description': res.description_raw || 'Not Available'
  }))
  .catch(err => console.error(err));

  return(returnThis);
}

export async function signInAction(formData){
  const supabase = createClient();

  const data = {
    email: formData.get('Email'),
    password: formData.get('Password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if(error){
    console.error('Error while Logging in', error);
    return;
  }

  redirect('/user/Profile');
  //MAYBE PLACE THE AUTH PAGES IN ANOTHER FOLDER OUTSIDE OF THE GROUP FOLDERS??
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

  if (error) console.error(error);

  revalidatePath('/');
  return redirect('/');
}

export async function signOut(){
  const supabase = createClient();
    
  const { error } = await supabase.auth.signOut()

  if(error){
    console.error(error)
  }

  revalidatePath('/')
  return redirect('/');
}

export async function resetPassword(baseUrl){
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(((await getCurrentUser()).email), {
    redirectTo: `${baseUrl}/user/${(await getCurrentUser()).user_metadata.first_name}/ResetPassword`
  })

    if(error){
        console.error('Something went wrong with sending you the password reset link ', error);
    }

}

export async function deleteOwnAccount(userId){
  const supabase = createClient();
  const { error } = await supabase.rpc('delete_own_account', { user_id: userId })
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