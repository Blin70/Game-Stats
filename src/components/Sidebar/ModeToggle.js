"use client"

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes";


const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex justify-center mb-3 space-x-1">
      <Sun className="inline-block size-8 mt-1" />
      <Switch checked={resolvedTheme === "dark"} onCheckedChange={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} className="h-[38px] w-[72px] inline-block mb-2 data-[state=unchecked]:[&>span]:h-8 data-[state=unchecked]:[&>span]:w-8 data-[state=checked]:[&>span]:w-8 data-[state=checked]:[&>span]:h-8 data-[state=checked]:[&>span]:translate-x-9" />
      <Moon className="inline-block size-8 mt-1" />
    </div>
  );
}

export default ModeToggle;