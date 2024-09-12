import Image from "next/image";
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import { useState } from "react";
import { signOut } from "@/app/utils/auth/AuthActions";
import { getCurrentUser } from "@/app/utils/auth/AuthActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfileMenuList = () => {
  const supabase = createClient();
  const router = useRouter();
  const [openList, setOpenList] = useState(false);

  const handleProfileClick = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      router.push("/user/SignIn");
      return;
    }

    setOpenList((prev) => !prev);
  };

  const handleItemClick = async (item) => {
    switch (item) {
      case 'Profile':
        router.push(`/user/${(await getCurrentUser()).user_metadata.first_name}/Profile`);
        break;
      case 'Settings':
        router.push(`/user/${(await getCurrentUser()).user_metadata.first_name}/Settings`);
        break;
      case 'SignOut':
        await signOut();
        break;
      default:
        break;
    }
    setOpenList(false);
  };

  const renderedProfileMenuItems = ["Profile", "Settings", "SignOut"].map((i) => {
    return (
      <div onClick={() => handleItemClick(i)} key={i} className="w-full h-20 border-b-2 border-black flex items-center justify-center text-4xl last:border-b-0 cursor-pointer">{i}</div>
    );
  });


  return (
    <>
      {openList && (
        <div className="relative top-24 z-50">
          <div className="absolute right-12 w-0 h-0 text-3xl border-l-[25px] border-r-[25px] border-b-[25px] border-l-transparent border-r-transparent border-b-black"></div>
          <div className="absolute w-5/6 right-6 rounded-3xl h-fit mt-6 border-2 border-black">
            {renderedProfileMenuItems}
          </div>
        </div>
      )}
      <Image onClick={handleProfileClick} className="size-20 mt-4 mb-4 mr-8 float-right cursor-pointer" alt="Profile" src={defaultProfilePic} />
    </>
  );
};

export default ProfileMenuList;