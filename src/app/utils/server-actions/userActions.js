"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function getUserFromSession() {//using getSession returns a warning on the terminal console although getSession should be used here
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();
  if(error) console.error('[getUserFromSession] Supabase error while getting user from session', error);

  return data.session?.user || null;
}

export async function getCurrentUser() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if(error){
    console.error('[getCurrentUser] Supabase error while getting current user', error);
    return null;
  }
  if (!user) return null;

  return user;
}

export async function getRole() {
  const supabase = createClient();

  const { data: { user: { role } }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("[getRole] Supabase error while getting user role", error);
    return null;
  }

  return role;
}

export async function sendNotification(user_id, type, title, message) {
  const supabase = createClient();

  const { error } = await supabase.from('notifications').insert([
    { 
      user_id,
      type,
      title,
      message
    }
  ]);

  if(error) console.error('[sendNotification] Supabase error while sending notification', error);
}

export async function getNotifications() {
  const supabase = createClient();

  const { id } = await getCurrentUser();
  
  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', id).order('date', { ascending: false });
    
  if(error){
    console.error('[getNotifications] Supabase error while getting notifications for user', error);
    return [];
  }

  return data;
}

export async function discardNotification(NotificationId) {
  const supabase = createClient();

  const { error } = await supabase.from('notifications').delete().eq('id', NotificationId);

  if(error){
    console.error(`[discardNotification] Supabase error while discarding notification with id: ${NotificationId}`, error);
    return { error: 'Error while discarding notification. Please try again' };
  }

  return (
    revalidatePath('/Notifications'),
    { success: 'Notification discarded successfully' }
  );
}

export async function getCurrentlySupportedGames(){
  const supabase = createClient();

  const { data, error } = await supabase.from('games').select('*');

  if(error){
    console.error("[getCurrentlySupportedGames] Supabase error while getting games from supabase", error);
    return [];
  }

  return data;
}