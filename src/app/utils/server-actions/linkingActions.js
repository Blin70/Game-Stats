"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./userActions";
import { revalidatePath } from "next/cache";
import { sendNotification } from "./userActions";

export async function getLinkedAccounts(userId) {
  const supabase = createClient();

  const { data, error } = await supabase.from('linkedAccounts').select('*,games:game_name(icon_url)').eq('user_id', userId);

  if(error){
    console.error('[getLinkedAccounts] Supabase error while getting Linked Accounts', error)
    return [];
  }

  return data;
}

export async function LinkAccount(formData) {
  const supabase = createClient();

  const { id } = await getCurrentUser();

  const game = formData.get('SelectedGame');
  const ign = formData.get('username');

  if(!game || !ign) return { error: 'Missing fields'};

  const { error } = await supabase.from('linkedAccounts').insert(
    { user_id: id, game_name: game, in_game_username: ign }
  )

  if(error){
    if(error.code === '23505') return { warning: 'This account is already linked' };

    console.error('[LinkAccount] Supabase error: ', error);
    return { error: 'Error while linking account'};
  }

  sendNotification(id, 'Account Connection', 'Account linked!', `Your ${game} (@${ign}) account has been successfully linked to your profile.`);

  revalidatePath('/user/Profile');
  return { success: 'Account linked successfully'}
}

export async function UnlinkAccount(formData) {
  const supabase = createClient();

  const linkedAccountId = formData.get('linkedAccountId');

  const { error } = await supabase.from('linkedAccounts').delete().eq('id', linkedAccountId);

  if(error){
    console.error("Error while unlinking account", error);
    return { error: 'Error while unlinking account' };
  }

  revalidatePath('/user/Profile');
  return { success: 'Account unlinked'};
}