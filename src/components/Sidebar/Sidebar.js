import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { getCurrentUser, signOut } from "@/app/utils/auth/AuthActions";
import Link from "next/link";
import CommandItems from "./CommandItems";
import ModeToggle from "./ModeToggle";


const Sidebar = async () => {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col flex-1 w-[350px] min-w-[350px] max-w-[350px] max-h-screen px-3 py-1 overflow-hidden break-words rounded-md bg-gray-50">
      <div className="flex items-center w-full py-3">
        <Avatar className="inline-block size-16">
          <Link href={`/user/${user.user_metadata.first_name}/Profile`}>
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
          <CommandGroup heading="Administation">
            <Link href='/Table'>
              <CommandItems text='User Management' iconName="User" />            
            </Link>
          </CommandGroup>
          <CommandGroup heading="Account">
            <Link href='/Help'>
              <CommandItems text='Help' iconName="Info" />
            </Link>
            <Link href={`/user/${user.user_metadata.first_name}/Settings`}>
              <CommandItems text='Settings' iconName="Settings" />
            </Link>
            <CommandItems text='Log out' iconName="LogOut" />
          </CommandGroup>
        </CommandList>
      </Command>
      <ModeToggle />
    </div>
  );
};


export default Sidebar;