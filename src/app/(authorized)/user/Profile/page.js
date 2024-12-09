'use client';

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/context/userContext";
import EditProfileModal from "@/components/modals/EditInfo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import defaultProfilePic from "/public/icons/default_profile_pic.png"

const Profile = () => {
  const { user } = useUser()

  const renderedInfo = [
    { label:'Name', info: user.user_metadata.first_name },
    { label:'Email', info: user.email },
    { label:'Phone', info: user.phone || 'No number added' }
  ].map((i) => {
      return (
        <div key={i.label}>
          <label className="text-lg text-gray-500">{i.label}</label>
          <h1 className="text-xl ml-1 font-bold">{i.info}</h1>
        </div>
      );
    });
    
    return (
      <div className="pl-2">
        <div className="w-full h-fit mt-5 mx-auto text-center">
            <Image className="size-48 mx-auto cursor-pointer" alt="Profile" src={defaultProfilePic} priority />
            <h1 className="text-4xl font-bold pt-5">{user.user_metadata.first_name}</h1>
            <h1 className="text-gray-500 text-lg pt-3">Joined {user.created_at.slice(0,10)}</h1>
        </div>
        <Separator className='mt-12 mb-5'/>
        <div className="mb-12">
          <h1 className="text-2xl font-bold">User Information</h1>
          <div className="grid grid-cols-3 m-5 p-5 bg-gray-100 shadow-md rounded-lg">
            {renderedInfo}
          </div>
          <EditProfileModal user={user} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Linked Game Accounts</h1>
          <div className="m-5 p-5 bg-gray-100 shadow-md rounded-lg text-center">
            <h1 className="text-gray-500">You havent linked any game accounts yet</h1>
            <Link href="/user/Settings">
              <Button className="mt-5">Link a Game Account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Profile;