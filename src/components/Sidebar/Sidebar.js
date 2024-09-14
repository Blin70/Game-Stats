import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import defaultProilePic from "/public/icons/default_profile_pic.png";

const Sidebar = () => {
    
    
    return (
      <div className="grow w-96 min-w-96 max-w-96 px-3 overflow-hidden break-words rounded-md bg-gray-50" >
        <div className="flex items-center w-full py-3">
          <Avatar className="inline-block size-16">
            <AvatarImage src={defaultProilePic} />
            <AvatarFallback src={defaultProilePic} />
          </Avatar>
            <div className="inline-block ml-2">
                <label className="block text-2xl">Blini</label>
                <label className="block text-sm">blini.axhirexha@gmail.com</label>
            </div>
        </div>
        <Separator />
        {/* <Command className="bg-transparent">
          <CommandList>
            <CommandGroup>
              <CommandItem>Game Stats</CommandItem>
              <CommandItem>User Management</CommandItem>
              <CommandItem>Notifications</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command> */}
      </div>
    );
};


export default Sidebar;