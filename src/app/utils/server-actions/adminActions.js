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
  
  const { data, error } = await supabaseAdmin.auth.admin.createUser(optionFields);

  if(error) console.error("Error while creating a new user", error)
  if(data) revalidatePath('/admin');//ALSO RETURN A TOSTER THAT SAYS SUCCESSFULLY CREATED NEW USER [Selected user json].
}

export async function AdminDeleteUser(user){
    const supabaseAdmin = createAdmin();

    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
      
    if (error) console.error('Error while deleting user', error);
    if(data) revalidatePath('/admin') //ALSO RETURN A TOSTER THAT SAYS SUCCESSFULLY DELETED USER [USER EMAIL].
}

export async function AdminBanUser(user, input) {
    const supabaseAdmin = createAdmin();

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
        { ban_duration:  (input === 'none' ? input : input.trim() + 'h' )}
      )

      if(error) console.error('Error while banning user', error); //RETURN A TOSTER THAT SAYS SUCCESSFULLY BANNED USER [USER EMAIL].
}

export async function AdminUpdateEmail(user, input) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { email: input }
  )

  if(error) console.error("(ADMIN) Error while updating user email", error);
}

export async function AdminUpdateName(user, input) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { user_metadata: { first_name: input } }
  )  
  
  if(error) console.error("(ADMIN) Error while updating user name", error);
}

export async function AdminUpdatePhone(user, input) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { phone: input }
  )

  if(error) console.error("(ADMIN) Error while updating user phone", error);
}

export async function AdminUpdatePassword(user, input) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { password: input }
  )
  
  if(error) console.error("(ADMIN) Error while updating user password", error);
}

export async function AdminUpdateRole(user, input) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id,
    { role: input }
  )
  
  if(error) console.error("(ADMIN) Error while updating user role", error);
}

export async function ConfirmEmailorPhone(user, type) {
  const supabaseAdmin = createAdmin();

  const updateFields = {
    ...(type === 'email' && { email_confirm: true }),
    ...(type === 'phone' && { phone_confirm: true })
  }

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, updateFields);

  if(error) console.error(`Error while confirming the users ${type} `, error)
}

export async function UnconfirmEmailorPhone(user, type) {
  const supabaseAdmin = createAdmin();

  const { data, error } = await supabaseAdmin.rpc('unconfirm_user_email_or_phone', {
    user_id: user.id,
    confirmation_type: type 
  })

  if (error) console.error(`Error while unconfirming the users ${type} `, error)
}