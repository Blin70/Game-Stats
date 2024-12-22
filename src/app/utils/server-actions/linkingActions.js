"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./userActions";
import { revalidatePath } from "next/cache";

export async function LinkAccount(formData) {
    const supabase = createClient();

    const { id } = await getCurrentUser();

    const game = formData.get('SelectedGame');
    const ign = formData.get('username');

    if(!game || !ign){
        console.error('Missing fields', { game, ign }); 
        return;
    }

    const { error } = await supabase.from('linkedAccounts').insert(
      { user_id: id, game_name: game, in_game_username: ign }
    )

    if(error){
      console.error('Error while linking account', error);
      return;
    }

    revalidatePath('/user/Profile');
    //Call a toaster
}

export async function UnlinkAccount(formData) {
    const supabase = createClient();

    const linkedAccountId = formData.get('linkedAccountId');

    const { error } = await supabase.from('linkedAccounts').delete().eq('id', linkedAccountId);

    if(error){
        console.error("Error while unlinking account", error);
        return;
    }

    revalidatePath('/user/Profile');
    //Call a toaster
}