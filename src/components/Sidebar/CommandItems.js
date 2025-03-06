"use client";

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const CommandItems = ({ text, icon, className, ...props }) => {
  return (
    <CommandItem className={cn("h-12 text-xl rounded-md cursor-pointer gap-0", className)} {...props} >
      {icon} {text}
    </CommandItem>
  );
}

export default CommandItems;