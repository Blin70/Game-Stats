"use server";

import { createClient } from "../supabase/server";

const supabase = createClient();

export async function getCurrentUser() {

  const {data, error} = await supabase.auth.getUser();

  if (error) {
    console.error("Error while getting User", error);
    return null;
  }

  return data.user;
}

export async function getRole() {

  const {data, error} = await supabase.from('profiles').select('role');

  if (error) {
    console.error("Error getting user role from supabase", error);
    return null;
  }

  return data[0].role;
}