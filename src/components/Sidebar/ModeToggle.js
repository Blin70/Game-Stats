"use client";

import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes";
import { useState } from "react";


const ModeToggle = () => {
    const [theme, setThemeState] = useState("light");
    const { setTheme } = useTheme();

    // const handleClick = () => {
    //     if(theme==="light") setThemeState("dark");
    //     if(theme==="dark") setThemeState("light");
    //     setTheme(theme);
    // }

    return (
      <div className="flex justify-center mb-3 space-x-1">
        <Sun className="inline-block size-8 mt-1 " />
        <Switch className="h-[38px] w-[72px] inline-block mb-2 data-[state=unchecked]:[&>span]:h-8 data-[state=unchecked]:[&>span]:w-8 data-[state=checked]:[&>span]:w-8 data-[state=checked]:[&>span]:h-8 data-[state=checked]:[&>span]:translate-x-9" />
        <Moon className="inline-block size-8 mt-1" />
      </div>
    );
}

export default ModeToggle;