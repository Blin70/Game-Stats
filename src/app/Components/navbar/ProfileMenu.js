import Image from "next/image";
import defaultProfilePic from "../../icons/default_profile_pic.png"
import { RxHamburgerMenu } from "react-icons/rx";

const ProfileMenu = () => {
    return (
        <div className="w-1/6 h-28 rounded-3xl border-2 border-black absolute right-10 top-10">
            <Image className="size-20 mt-4 mb-4 mr-8 float-right cursor-pointer" alt="Profile" src={defaultProfilePic} />
            <RxHamburgerMenu className="size-20 mt-4 mb-4 ml-8 cursor-pointer"/>
        </div>
    );
}

export default ProfileMenu;