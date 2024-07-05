import Image from "next/image";
import defaultProfilePic from "@/app/icons/default_profile_pic.png"
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

const Settings = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if(error || !data?.user){
        redirect('/SignIn')
    }




    return (
        <div className="w-1/3 h-fit mx-auto text-center">
            <Image className="size-1/3 mx-auto cursor-pointer" alt="Default Profile Image" src={defaultProfilePic} />
            <h1 className="text-4xl">{data.user.user_metadata.first_name}</h1>
            <h1 className="text-4xl mt-4">{data.user.email}</h1>
            <h1 className="text-4xl mt-4">{new Date(data.user.created_at).toISOString().slice(0,10)}</h1>
            <h1 className="text-4xl mt-4">{data.user.phone ? data.user.phone : 'Add Phone Number'}</h1>
            <button className="text-4xl bg-red-500 rounded-xl mt-6 p-1">Delete account</button>
        </div>
    );
}

export default Settings;