"use server";

import { createClient } from "../supabase/server";


export async function getCurrentUser() {
  const supabase = createClient();

  const {data, error} = await supabase.auth.getUser();

  if (error) {
    console.error("Error while getting User", error);
    return null;
  }

  return data.user;
}

export async function getRole() {
  const supabase = createClient();

  const {data, error} = await supabase.from('profiles').select('role');

  if (error) {
    console.error("Error getting user role from supabase", error);
    return null;
  }

  return data[0].role;
}