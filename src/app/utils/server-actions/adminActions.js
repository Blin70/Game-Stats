"use server"

import { createAdmin } from "@/app/utils/supabase/admin";
import { revalidatePath } from "next/cache";


export async function AdminCreateUser(formData){
  const supabaseAdmin = createAdmin();
  
  const inputValues = {
    email: formData.get('Email'),
    password: formData.get('Password'),
    phone: formData.get('Phone'),
    name: formData.get('Name'),
    role: formData.get('Role'),
    emailConfirmed: formData.get('emailConfirmed'),
    phoneConfirmed: formData.get('phoneConfirmed'),
  };

  const optionFields = {
    ...(inputValues.email && { email: inputValues.email }),
    ...(inputValues.password && { password: inputValues.password }),
    ...(inputValues.phone && { phone: inputValues.phone }),
    ...(inputValues.name && { user_metadata: { first_name: inputValues.name }}),
    ...(inputValues.role && { role: inputValues.role }),
    ...(inputValues.emailConfirmed && { email_confirm: true }),
    ...(inputValues.phoneConfirmed && { phone_confirm: true })
  }
  
  const { error } = await supabaseAdmin.auth.admin.createUser(optionFields);

  if(error){
    if(error.code === 'email_exists') return { error: 'A user with this email already exists' }

    console.error("[AdminCreateUser] Supabase error: ", error)
    return { error: 'Error while creating a new user' };
  } 
  
  revalidatePath('/admin');
  return { success: 'New user created successfully'}
}

export async function AdminDeleteUser(user){
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
      
  if(error){
    console.error('[AdminDeleteUser] Supabase error while deleting user', error);
    return { error: 'Error while deleting user' }
  }

  revalidatePath('/admin')
  return { success: `Successfully deleted user with email: ${user.email}` }
}

export async function AdminBanUser(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { ban_duration:  (input === 'none' ? input : input.trim() + 'h' )}
  )

  if(error){
    console.error('[AdminBanUser] Supabase error while banning user', error);
    return { error: 'Error while banning user' };
  }

  if(input === 'none') return { success: `Successfully unbanned user with email: ${user.email}` }
  return { success: `Successfully banned user with email: ${user.email}` };
}

export async function AdminUpdateEmail(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { email: input }
  )

  if(error){
    console.error("[AdminUpdateEmail] Supabase error while updating user email", error);
    return { error: 'Error while updating user email. Please try again later.' };
  } 
}

export async function AdminUpdateName(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { user_metadata: { first_name: input } }
  )  
  
  if(error){
    console.error("[AdminUpdateName] Supabase error while updating user name", error);
    return { error: 'Error while updating user name. Please try again later.' };
  }
}

export async function AdminUpdatePhone(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { phone: input }
  )

  if(error){
    console.error("[AdminUpdatePhone] Supabase error while updating the users phone number", error);
    return { error: 'Error while updating the users phone number. Please try again later.' };
  } 
}

export async function AdminUpdatePassword(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { password: input }
  )
  
  if(error){
    console.error("[AdminUpdatePassword] Supabase error while updating user password", error);
    return { error: 'Error while updating user password. Please try again later.' };
  } 
}

export async function AdminUpdateRole(user, input) {
  const supabaseAdmin = createAdmin();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { role: input }
  )
  
  if(error){
    console.error("[AdminUpdateRole] Supabase error while updating user role", error);
    return { error: 'Error while updating user role. Please try again later.' };
  }
}

export async function ConfirmEmailorPhone(user, type) {
  const supabaseAdmin = createAdmin();

  const updateFields = {
    ...(type === 'email' && { email_confirm: true }),
    ...(type === 'phone' && { phone_confirm: true })
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, updateFields);

  if(error){
    console.error(`[ConfirmEmailorPhone] Supabase error while confirming the users ${type}`, error)
    return { error: `Error while confirming the users ${type}. Please try again later.` };
  } 
}

export async function UnconfirmEmailorPhone(user, type) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.rpc('unconfirm_user_email_or_phone', {
    user_id: user.id,
    confirmation_type: type 
  })

  if(error){
    console.error(`[UnconfirmEmailorPhone] Supabase error while unconfirming the users ${type}`, error)
    return { error: `Error while unconfirming the users ${type}. Please try again later.` };
  } 
}