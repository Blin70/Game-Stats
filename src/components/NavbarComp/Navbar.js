'use client';

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import GamesContainer from "../SidebarComp/GamesContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const Navbar = () => {
    const [ showGames, setShowGames ] = useState(true);

    return(
        <>
            { showGames && <GamesContainer />}
            <div className="h-44 relative">
                <Button asChild variant="outline" className="absolute right-1/4 p-7 mt-16 rounded-3xl text-2xl">
                    <Link href="/Table">Table</Link>
                </Button>
                <ProfileMenu setShowGames={setShowGames} />
            </div>
        </>
    );
}

export default Navbar;