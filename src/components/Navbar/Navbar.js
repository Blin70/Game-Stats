'use client';

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import GamesContainer from "../Sidebar/GamesContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "/public/icons/LogoSword.png";
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';



const Navbar = () => {
    const [ showGames, setShowGames ] = useState(true);

    return(
        <>
            {/* <div className="h-44 relative bg-gray-50">
                <Button asChild variant="outline" className="absolute right-1/4 p-7 mt-16 rounded-3xl text-2xl">
                    <Link href="/Table">Table</Link>
                </Button>
                <ProfileMenu setShowGames={setShowGames} />
            </div> */}
            <nav className="h-24 mb-2 px-32 grid grid-cols-[20%,45%,25%] rounded-lg bg-gray-50">
                <div className="h-full w-full overflow-hidden">
                    <Image alt="Logo" src={Logo} className="h-full w-fit" />
                </div>
                <div className="flex h-full w-full text-2xl space-x-20 items-center ">
                    <Link href='#' className="">Top Games</Link>
                    <Link href='#'>Leaderboards</Link>
                </div>
                <div className="flex items-center w-full relative">
                    {/* search bar */}
                        <Input type="text" name="SearchBar" className="w-full text-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <Search  className="absolute right-0 m-3 block size-6 opacity-90"/>
                </div>
            </nav>
        </>
    );
}

export default Navbar;