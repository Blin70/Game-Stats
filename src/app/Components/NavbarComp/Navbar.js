'use client';

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import GamesContainer from "../SidebarComp/GamesContainer";
import { useState } from "react";

const Navbar = () => {
    const [ showGames, setShowGames ] = useState(true);

    return(
        <>
            { showGames && <GamesContainer />}
            <div className="h-44 relative">
                <ProfileMenu setShowGames={setShowGames} />
                <Link href="/Table" className="absolute border-2 border-black rounded-3xl w-fit p-3 mt-16 right-1/4 text-3xl" >Table</Link>
            </div>
        </>
    );
}

export default Navbar;