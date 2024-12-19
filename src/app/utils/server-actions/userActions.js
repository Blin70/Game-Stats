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

  const { data: { user: { role } }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user role", error);
    return null;
  }

  return role;
}