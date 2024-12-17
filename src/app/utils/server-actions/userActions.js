"use server";

import { createClient } from "../supabase/server";


export async function getCurrentUser() {  //using getSession returns a warning on the terminal console although getSession should be used here
  const supabase = createClient();

  const user = (await supabase.auth.getSession()).data.session?.user;

  if (!user) return null;

  return user;
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