import Image from "next/image";
import defaultProfilePic from "/public/icons/default_profile_pic.png"
import EditInfo from "@/app/utils/auth/EditInfo";
import { getCurrentUser } from "@/app/utils/auth/AuthActions";
import { ResetPasswordModal, DeleteAccountModal } from "@/app/utils/auth/EditInfo";

const Settings = async () => {
    const user = await getCurrentUser()
    
    return (
        <div className="w-1/3 h-fit mx-auto text-center">
            <Image className="size-1/3 mx-auto cursor-pointer" alt="Default Profile Image" src={defaultProfilePic} />
            <EditInfo user={user} info='Name' />
            <EditInfo user={user} info='Email' />
            <h1 className="text-4xl mt-5">Account created on {new Date(user.created_at).toISOString().slice(0,10)}</h1>
            <EditInfo user={user} info='Phone' />
            <ResetPasswordModal email={user.email} />
            <DeleteAccountModal user={user} />
        </div>
    );
}

export default Settings;