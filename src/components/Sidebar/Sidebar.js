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
import { ChartNoAxesCombined, Bell, Info, Settings, LogOut, User} from 'lucide-react';
import { toast } from "sonner";
import LinkedAccountsSection from "./LinkedAccountsSection";

const Sidebar = () => {
  const { user } = useUser();

  const handleSignOut = async () => {
    const res = await signOut();

    if(res?.error){
      toast.error(res.error)
      return;
    }

    toast.success('Successfully signed out')
  };
  
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
          <span className="block text-2xl">{user?.user_metadata?.first_name}</span>
          <span className="block text-sm">{user?.email}</span>
        </div>
      </div>
      <Separator />
      <Command className="bg-transparent">
        <CommandList className="min-h-full">
          <CommandGroup heading="Suggestions">
            <Link href='/SupportedGames'>
              <CommandItems text='Game Stats' icon={<ChartNoAxesCombined className="size-8 mr-3" />} />
            </Link>
            <Link href='/Notifications'>
              <CommandItems text='Notifications' icon={<Bell className="size-8 mr-3" />} />
            </Link>
          </CommandGroup>
          <LinkedAccountsSection userId={user.id} />
          {user?.role == 'service_role'
            &&(
              <CommandGroup heading="Administation">
                <Link href='/admin'>
                  <CommandItems text='User Management' icon={<User className="size-8 mr-3" />} />            
                </Link>
              </CommandGroup>
            )
          }
          <CommandGroup heading="Account">
            <Link href='/Help'>
              <CommandItems text='Help' icon={<Info className="size-8 mr-3" />} />
            </Link>
            <Link href='/user/Settings'>
              <CommandItems text='Settings' icon={<Settings className="size-8 mr-3" />} />
            </Link>
            <CommandItems onSelect={handleSignOut} text='Log out' icon={<LogOut className="size-8 mr-3" />} />
          </CommandGroup>
        </CommandList>
      </Command>
      <ModeToggle />
    </div>
  );
};


export default Sidebar;