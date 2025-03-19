"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./userActions";
import { revalidatePath } from "next/cache";

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

export async function discardNotification(notificationId) {
    const supabase = createClient();
  
    const { error } = await supabase.from('notifications').delete().eq('id', notificationId);
  
    if(error){
      console.error(`[discardNotification] Supabase error while discarding notification with id: ${notificationId}`, error);
      return { error: 'Error while discarding notification. Please try again' };
    }
  
    return (
      revalidatePath('/Notifications'),
      { success: 'Notification discarded successfully' }
    );
}