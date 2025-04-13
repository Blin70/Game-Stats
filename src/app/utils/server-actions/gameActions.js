"use server";

import { createClient } from "../supabase/server";

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

export async function getCurrentlySupportedGames(){
  const supabase = createClient();
  
  const { data, error } = await supabase.from('games').select('*');
  
  if(error){
    console.error("[getCurrentlySupportedGames] Supabase error while getting games from supabase", error);
    return [];
  }
  
  return data;
}

export async function getGameBackgroundImage(alias) {
  const supabase = createClient();

  const { data, error } = await supabase.from('games').select('background_img').eq('alias', alias).single();

  if(error){
    console.error("[getGameBackgroundImage] Supabase error while getting the games background image", error);
    return null;
  }

  return data.background_img;
}