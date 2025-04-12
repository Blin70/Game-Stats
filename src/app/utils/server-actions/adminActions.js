"use server"

import { createAdmin } from "@/app/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function adminGetUsers() {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.from('profiles').select('*');
    
  if(error) return console.error("[adminGetUsers] Supabase error while fetching users from table", error);

  return data;
}

export async function adminCreateUser(userData){
  const supabaseAdmin = createAdmin();

  const optionFields = {
    email: userData.email,
    user_metadata: { first_name: userData.name },
    password: userData.password,
    role: userData.role,
    ...(userData.phone && { phone: userData.phone }),
    ...(userData.emailConfirmed && { email_confirm: true }),
    ...(userData.phoneConfirmed && { phone_confirm: true })
  }
  
  const { error } = await supabaseAdmin.auth.admin.createUser(optionFields);

  if(error){
    if(error.code === 'email_exists') return { error: 'A user with this email already exists' }
    if(error.code === 'phone_exists') return { error: 'This phone number is already linked to a user' }

    console.error("[adminCreateUser] Supabase error: ", error)
    return { error: 'Error while creating a new user' };
  } 
  
  revalidatePath('/admin');
  return { success: 'New user created successfully'}
}

export async function adminDeleteUser(user){
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
      
  if(error){
    console.error('[adminDeleteUser] Supabase error while deleting user', error);
    return { error: 'Error while deleting user' }
  }

  revalidatePath('/admin')
  return { success: `Successfully deleted user with email: ${user.email}` }
}

export async function adminBanUser(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { ban_duration:  (input === 'none' ? input : input.trim() + 'h' )}
  )

  if(error){
    console.error('[adminBanUser] Supabase error while banning user', error);
    return { error: 'Error while banning user' };
  }

  if(input === 'none') return { success: `Successfully unbanned user with email: ${user.email}` }
  return { success: `Successfully banned user with email: ${user.email}` };
}

export async function adminUpdateUser(updateFields, userId) {
  const supabaseAdmin = createAdmin();

  if(updateFields['phone'] === ""){
    const res = await adminRemovePhoneNumber(userId)
    if(res?.error) return res.error;
  }

  if(updateFields['email_confirm'] === false){
    const res = await adminUnconfirmEmailOrPhone(userId, 'email')
    if(res?.error) return res.error;
  }

  if(updateFields['phone_confirm'] === false){
    const res = await adminUnconfirmEmailOrPhone(userId, 'phone')
    if(res?.error) return res.error;
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, updateFields)

  if(error){
    if(error.code === "phone_exists") return { error: "This phone number is already linked to a user. Please use another phone number!" };

    console.error("[adminUpdateUser] Supabase error while updating user", error);
    return { error: "Error while updating user. Please try again!"};
  }

  return { success: "User updated successfully!" };
}

export async function adminRemovePhoneNumber(userId) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.rpc('remove_user_phone_number', { user_id: userId });

  if(error){
    console.error("[adminRemovePhoneNumber] Supabase error while removing the users phone number", error);
    return { error: 'Error while removing the users phone number. Please try again later.' };
  }
}

export async function adminUnconfirmEmailOrPhone(userId, type) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.rpc('unconfirm_user_email_or_phone', {
    user_id: userId,
    confirmation_type: type 
  })

  if(error){
    console.error(`[unconfirmEmailOrPhone] Supabase error while unconfirming the users ${type}`, error)
    return { error: `Error while unconfirming the users ${type}. Please try again later.` };
  } 
}