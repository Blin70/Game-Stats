"use server";

import { createClient } from "../supabase/server";

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

export async function getCurrentlySupportedGames(){
  const supabase = createClient();

  const { data, error } = await supabase.from('games').select('*');

  if(error){
    console.error("[getCurrentlySupportedGames] Supabase error while getting games from supabase", error);
    return [];
  }

  return data;
}

export async function getGamePlatforms(game_name, searchField){
  const supabase = createClient();

  const { data, error } = await supabase.from('games').select('name, game_platforms(platform)').eq(searchField, game_name).single();

  if(error){
    console.error("[getGamePlatforms] Supabase error while getting game platforms", error);
    return { name: null, platforms: [] };
  }

  return {
    name: data?.name,
    platforms: data?.game_platforms?.map(p => p.platform)
  };
}

export async function updateProfile(updateFields, userId) {
  const supabase = createClient();

  if(updateFields['phone'] === ""){
    const res = await removePhoneNumber(userId);
    if(res?.error) return { error: "Error while removing phone number. Please try again!" };
  }

  const { data, error } = await supabase.auth.updateUser(updateFields)

  if(error){
    if(error.code === "over_email_send_rate_limit") return { error: error.message };
    if(error.code === "phone_exists") return { error: "This phone number is already linked to a user. Please use another phone number!" };

    console.error("[updateProfile] Supabase error while updating profile", error);
    return { error: "Error while updating profile. Please try again!"};
  }

  if(updateFields.email){
    return Object.keys(updateFields).length === 1
      ? { info: "Please check your email to confirm the email change.", user: data.user }
      : { success: "Account updated successfully! Please check your email to confirm the email change.", user: data.user };
  }

  return { success: "Account updated successfully!", user: data.user };
}

export async function removePhoneNumber(userId) {
  const supabase = createClient();

  const { error } = await supabase.rpc('remove_user_phone_number', { user_id: userId });

  if(error){
    console.error('[removePhoneNumber] Supabase error while removing phone number', error);
    return { error };
  }
}