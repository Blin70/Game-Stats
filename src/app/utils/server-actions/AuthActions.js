"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";


export async function signUp(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("Email"),
    password: formData.get("Password"),
    options: {
      data: {
        first_name: formData.get("Name"),
      },
    },
  };

  const {error} = await supabase.auth.signUp(data);

  if (error) console.error(error);

  revalidatePath("/");
  return redirect("/");
}

export async function signIn(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("Email"),
    password: formData.get("Password"),
  };

  const {error} = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error while Logging in", error);
    return;
  }

  redirect("/user/Profile");
  //MAYBE PLACE THE AUTH PAGES IN ANOTHER FOLDER OUTSIDE OF THE GROUP FOLDERS??
}

export async function signOut() {
  const supabase = createClient();

  const { data, error} = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  if(data) console.log(data);
  revalidatePath("/");
  return redirect("/");
}

export async function resetPassword(baseUrl) {
  const supabase = createClient();

  const {error} = await supabase.auth.resetPasswordForEmail(
    (
      await getCurrentUser()
    ).email,
    {
      redirectTo: `${baseUrl}/user/ResetPassword`,
    }
  );

  if (error) {
    console.error("Something went wrong with sending you the password reset link ", error);
    return null;
  }
}

export async function deleteOwnAccount(userId) {
  const supabase = createClient();
  const {error} = await supabase.rpc("delete_own_account", {user_id: userId});
  //have to clear localstorage from client comp
  if (error) console.error(error);
  await signOut();
}

export async function changePassword(newPassword) {
  const supabase = createClient();

  const {data, error} = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Please try again", error);
  }

  if (data) {
    console.log("Password changed successfully");
    redirect("/");
  }
}