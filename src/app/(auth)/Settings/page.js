import Image from "next/image";
import defaultProfilePic from "@/app/icons/default_profile_pic.png"
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import EditInfo from "@/app/_components/auth/EditInfo";

const Settings = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if(error || !data?.user){
        redirect('/SignIn')
    }

    return (
        <div className="w-1/3 h-fit mx-auto text-center">
            <Image className="size-1/3 mx-auto cursor-pointer" alt="Default Profile Image" src={defaultProfilePic} />
            <EditInfo user={data.user} info='Name' />
            <EditInfo user={data.user} info='Email' />
            <h1 className="text-4xl mt-5">Account created on {new Date(data.user.created_at).toISOString().slice(0,10)}</h1>
            <EditInfo user={data.user} info='Phone' />
            <button className="w-1/2 h-16 text-4xl bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 p-1 block mx-auto">Reset Password</button>
            <button className="w-1/2 h-16 text-4xl bg-red-500 hover:bg-red-900 rounded-xl mt-5 p-1 block mx-auto">Delete account</button>
        </div>
    );
}

export default Settings;