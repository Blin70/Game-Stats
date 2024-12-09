'use client'

import Link from "next/link";
import { useUser } from "@/app/context/userContext";
import { signOut } from "@/app/utils/server-actions/AuthActions";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import CommandItems from "./CommandItems";
import ModeToggle from "./ModeToggle";
import defaultProfilePic from "/public/icons/default_profile_pic.png";

const Sidebar = () => {
  const { user } = useUser();
  
  return (
    <div className="flex flex-col flex-1 w-[350px] min-w-[350px] max-w-[350px] max-h-screen px-3 py-1 overflow-hidden break-words rounded-md bg-gray-50">
      <div className="flex items-center w-full py-3">
        <Avatar className="inline-block size-16">
          <Link href='/user/Profile'>
            <AvatarImage src={defaultProfilePic.src} />
            <AvatarFallback>s</AvatarFallback>
          </Link>
        </Avatar>
        <div className="inline-block ml-2">
          <label className="block text-2xl">{user.user_metadata.first_name}</label>
          <label className="block text-sm">{user.email}</label>
        </div>
      </div>
      <Separator />
      <Command className="bg-transparent">
        <CommandList className="min-h-full">
          <CommandGroup heading="Suggestions">
            <Link href='/SupportedGames'>
              <CommandItems text='Game Stats' iconName="ChartNoAxesCombined" />
            </Link>
            <CommandItems text='Notifications' iconName="Bell" />
          </CommandGroup>
          {user.role == 'service_role'
            &&(
              <CommandGroup heading="Administation">
                <Link href='/admin'>
                  <CommandItems text='User Management' iconName="User" />            
                </Link>
              </CommandGroup>
            )
          }
          <CommandGroup heading="Account">
            <Link href='/Help'>
              <CommandItems text='Help' iconName="Info" />
            </Link>
            <Link href='/user/Settings'>
              <CommandItems text='Settings' iconName="Settings" />
            </Link>
            <Link href='/' onClick={()=>signOut()}>
              <CommandItems text='Log out' iconName="LogOut" />
            </Link>
          </CommandGroup>
        </CommandList>
      </Command>
      <ModeToggle />
    </div>
  );
};


export default Sidebar;