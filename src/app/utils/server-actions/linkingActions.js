"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./userActions";
import { sendNotification } from "./userActions";

export async function getLinkedAccounts(userId) {
  const supabase = createClient();

  const { data, error } = await supabase.from('linkedAccounts').select('*,games:game_name(icon_url, deprecated, alias)').eq('user_id', userId);

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
  const platform = formData.get('SelectedPlatform');

  if(!game || !ign || !platform) return { error: 'Missing fields'};

  const { data, error } = await supabase.from('linkedAccounts').insert(
    { user_id: id, game_name: game, in_game_username: ign, platform }
  ).select('*,games:game_name(icon_url, deprecated, alias)').eq('user_id', id).single();

  if(error){
    if(error.code === '23505') return { warning: 'This account is already linked' };

    console.error('[LinkAccount] Supabase error: ', error);
    return { error: 'Error while linking account'};
  }

  sendNotification(id, 'Account Connection', 'Account linked!', `Your ${game} (@${ign}) account has been successfully linked to your profile.`);

  return { success: 'Account linked successfully', account: data };
}

export async function UnlinkAccount(AccountId) {
  const supabase = createClient();

  const { error } = await supabase.from('linkedAccounts').delete().eq('id', AccountId);

  if(error){
    console.error("[UnlinkAccount] Error while unlinking account", error);
    return { error: 'Error while unlinking account' };
  }

  return { success: 'Account unlinked'};
}