"use client";

import { CommandItem } from "@/components/ui/command";

const CommandItems = ({ text, icon, ...props }) => {
  return (
    <CommandItem className="h-12 text-xl rounded-md cursor-pointer" {...props} >
      {icon} {text}
    </CommandItem>
  );
}

export default CommandItems;