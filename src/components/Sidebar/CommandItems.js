"use client";

import { CommandItem } from "@/components/ui/command";
import { ChartNoAxesCombined, Bell, Info, Settings, LogOut, User} from 'lucide-react';

const iconMap = {
  "settings": Settings,
  "info": Info,
  "logout": LogOut,
  "chartnoaxescombined": ChartNoAxesCombined,
  "bell": Bell,
  "user": User
};

const CommandItems = ({ text, iconName, ...others }) => {
  const Icon = iconMap[iconName.toLowerCase()];
  
  return (
    <CommandItem className="h-12 text-xl rounded-md cursor-pointer" {...others} >
      <Icon className="size-8 mr-3" />
      {text}
    </CommandItem>
  );
}

export default CommandItems;
