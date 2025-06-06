'use client'

import Link from "next/link";
import { useUser } from "@/app/context/userContext";
import { signOut } from "@/app/utils/server-actions/authActions";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import CommandItems from "./CommandItems";
import ModeToggle from "./ModeToggle";
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { ChartNoAxesCombined, Bell, Info, Settings, LogOut, User} from 'lucide-react';
import { toast } from "sonner";
import LinkedAccountsSection from "./LinkedAccountsSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

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
    <div className="flex flex-col flex-1 w-[350px] min-w-[350px] max-w-[350px] max-h-screen px-3 py-1 overflow-hidden break-words rounded-md bg-background">
      <div className="flex items-center w-full py-3">
        <Avatar className="inline-block size-16">
          <Link href='/user/profile'>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>
              <Image src={defaultProfilePic} alt="Default profile picture" />
            </AvatarFallback>
          </Link>
        </Avatar>
        <div className="inline-block ml-2">
          <span className="block text-2xl">{user?.user_metadata?.first_name}</span>
          <span className="block text-sm">{user?.email}</span>
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-full">
        <Command className="bg-transparent">
          <CommandList className="min-h-fit group">
            <CommandGroup heading="Suggestions">
              <Link href='/games'>
                <CommandItems href="/games" text='Game Stats' icon={<ChartNoAxesCombined className="!size-8 mr-3" />} />
              </Link>
              <Link href='/notifications'>
                <CommandItems href='/notifications' text='Notifications' icon={<Bell className="!size-8 mr-3" />} />
              </Link>
            </CommandGroup>
            <LinkedAccountsSection />
            {user?.role == 'service_role'
              &&(
                <CommandGroup heading="Administation">
                  <Link href='/admin'>
                    <CommandItems href='/admin' text='User Management' icon={<User className="!size-8 mr-3" />} />            
                  </Link>
                </CommandGroup>
              )
            }
            <CommandGroup heading="Account">
              <Link href='/help'>
                <CommandItems href='/help' text='Help' icon={<Info className="!size-8 mr-3" />} />
              </Link>
              <Link href='/user/settings'>
                <CommandItems href='/user/settings' text='Settings' icon={<Settings className="!size-8 mr-3" />} />
              </Link>
              <CommandItems onSelect={handleSignOut} text='Log out' icon={<LogOut className="!size-8 mr-3" />} />
            </CommandGroup>
          </CommandList>
        </Command>
      </ScrollArea>
      <ModeToggle />
    </div>
  );
};


export default Sidebar;