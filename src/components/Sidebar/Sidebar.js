import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ChartNoAxesCombined, Bell, Info, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { Switch } from "@/components/ui/switch"


const Sidebar = () => {
  return (
    <div className="flex flex-col flex-1 w-[350px] min-w-[350px] max-w-[350px] h-full px-3 py-1 overflow-hidden break-words rounded-md bg-gray-50">
      <div className="flex items-center w-full py-3">
        <Avatar className="inline-block size-16">
          <AvatarImage src={defaultProfilePic.src} />
          <AvatarFallback>s</AvatarFallback>
        </Avatar>
        <div className="inline-block ml-2">
          <label className="block text-2xl">Blini</label>
          <label className="block text-sm">blini.axhirexha@gmail.com</label>
        </div>
      </div>
      <Separator />
      <Command className="bg-transparent">
        <CommandList className="min-h-full">
          <CommandGroup heading="Suggestions">
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <ChartNoAxesCombined className="size-8 mr-3" />
              Game Stats
            </CommandItem>
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <Bell className="size-8 mr-3" />
              Notifications
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Administation">
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <Info className="size-8 mr-3" />
              User Management
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Account">
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <Info className="size-8 mr-3" />
              Help
            </CommandItem>
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <Settings className="size-8 mr-3" />
              Settings
            </CommandItem>
            <CommandItem className="h-12 text-xl rounded-md cursor-pointer">
              <LogOut className="size-8 mr-3" />
              Log out
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex justify-center mb-3 space-x-1">
        <Sun className="inline-block size-8 mt-1 " />
        <Switch className="h-[38px] w-[72px] inline-block mb-2 data-[state=unchecked]:[&>span]:h-8 data-[state=unchecked]:[&>span]:w-8 data-[state=checked]:[&>span]:w-8 data-[state=checked]:[&>span]:h-8 data-[state=checked]:[&>span]:translate-x-9" />
        <Moon className="inline-block size-8 mt-1" />
      </div>
    </div>
  );
};


export default Sidebar;