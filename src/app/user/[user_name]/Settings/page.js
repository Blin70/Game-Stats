import Image from "next/image";
import defaultProfilePic from "@/app/icons/default_profile_pic.png"
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import EditInfo from "@/app/_components/auth/EditInfo";
import { ResetPasswordModal, DeleteAccountModal } from "@/app/_components/auth/EditInfo";

const Settings = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if(error || !data?.user){
        redirect('/user/SignIn')
    }
    
    return (
        <div className="w-1/3 h-fit mx-auto text-center">
            <Image className="size-1/3 mx-auto cursor-pointer" alt="Default Profile Image" src={defaultProfilePic} />
            <EditInfo user={data.user} info='Name' />
            <EditInfo user={data.user} info='Email' />
            <h1 className="text-4xl mt-5">Account created on {new Date(data.user.created_at).toISOString().slice(0,10)}</h1>
            <EditInfo user={data.user} info='Phone' />
            <ResetPasswordModal email={data.user.email} />
            <DeleteAccountModal user={data.user} />
        </div>
    );
}

export default Settings;