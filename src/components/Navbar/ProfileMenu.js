import { RxHamburgerMenu } from "react-icons/rx";
import ProfileMenuList from "./ProfileMenuList";

const ProfileMenu = ({setShowGames}) => {

    return (
        <div className="w-1/6 h-28 rounded-3xl border-2 border-black absolute right-10 top-10">
            <ProfileMenuList />
            <RxHamburgerMenu className="size-20 mt-4 mb-4 ml-8 cursor-pointer" onClick={()=>setShowGames(prev => !prev)} />
        </div>
    );
}

export default ProfileMenu;