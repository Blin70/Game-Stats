"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { sendNotification } from "./notificationActions";

export async function signUp(values) {
  const supabase = createClient();

  const data = {
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.name,
      },
    },
  };

  const { data: UserData, error } = await supabase.auth.signUp(data);

  if(error){
    if(error.code === 'user_already_exists') return { error: 'This user already exists' }

    console.error('[signUp] Supabase error while signing up', error);
    return { error: "Something went wrong. Please try again"}
  }

  sendNotification(UserData?.user?.id, "New User", "Welcome to Game Stats!", "Track your game stats, compare leaderboards, and improve your skills. Start by searching for your in-game name!");

  revalidatePath("/");
  return redirect("/user/Profile");
}

export async function signIn(values) {
  const supabase = createClient();

  const data = {
    email: values.email,
    password: values.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if(error) {
    if(error.code === 'invalid_credentials') return { error: 'Invalid login credentials' }
    if(error.code === 'user_banned') return { error: 'This user is banned' }
    if(error.code === 'email_not_confirmed') return { error: 'Email not confirmed' }

    console.error("[signIn] Supabase error while logging in", error);
    return { error: 'Something went wrong' };
  }

  redirect("/user/Profile");
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('[signOut] Supabase error while signing out', error);
    return { error: "Couldn't log out. Please try again" };
  }

  revalidatePath("/");
  redirect("/");
}

export async function sendPasswordResetEmail(baseUrl, email, userId) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email,
    {
      redirectTo: `${baseUrl}/user/ResetPassword`,
    }
  );

  if (error) {
    if(error.code === 'over_email_send_rate_limit') return { error: 'Please wait a bit before sending a new password reset email.' }

    console.error("[resetPassword] Supabase error while sending password reset link", error);
    return { error: 'Something went wrong with sending you the password reset link' };
  }

  sendNotification(userId, 'System', 'Password Change Initiated', "A request to reset your password was made. A reset link has been sent to your email. If you didn't request this, we recommend resetting your password and securing your account.")

  return { success: 'A password reset link has been sent to your email' };
}

export async function deleteOwnAccount(userId) { //have to clear localstorage? and signOut from client comp
  const supabase = createClient();

  const { error } = await supabase.rpc("delete_own_account", {user_id: userId});
  
  if(error){
    console.error('[deleteOwnAccount] Supabase error: ', error)
    return { error: 'Error while deleting account'}
  }

  return { success: 'Account deleted successfully'};
}

export async function changePassword(newPassword) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("[changePassword] Supabase error while changing the users password", error);
    return { error: 'Error while changing password. Please try again' };
  }

  sendNotification(data.user.id, 'System', 'Password changed', "Your password was successfully changed. If you did not make this change, reset your password immediately and check your account for any unusual activity.")
  
  redirect("/")
}