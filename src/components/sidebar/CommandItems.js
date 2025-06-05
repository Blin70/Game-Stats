"use client";

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const CommandItems = ({ text, icon, className, href, ...props }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <CommandItem
      data-active={isActive ? "true" : undefined}
      className={cn(
        "h-12 text-xl rounded-md cursor-pointer gap-0 hover:!bg-accent",
        "group-hover:[&:not(:hover)]:!bg-transparent",
        "data-[selected=true]:bg-transparent data-[selected=true]:text-foreground",
        "transition duration-200 ease-in-out",
        isActive && "[&:not(:hover)]:bg-accent",
        className
      )}
      {...props}
    >
      {icon} {text}
    </CommandItem>
  );
}

export default CommandItems;