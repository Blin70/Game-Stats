import Image from "next/image";
import defaultProfilePic from "@/app/icons/default_profile_pic.png"
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const ProfileMenu = ({setShowGames}) => {

    return (
        <div className="w-1/6 h-28 rounded-3xl border-2 border-black absolute right-10 top-10">
            <Link href='/Profile'>
                <Image className="size-20 mt-4 mb-4 mr-8 float-right cursor-pointer" alt="Profile" src={defaultProfilePic} />
            </Link>
            <RxHamburgerMenu className="size-20 mt-4 mb-4 ml-8 cursor-pointer" onClick={()=>setShowGames(prev => !prev)} />
        </div>
    );
}

export default ProfileMenu;