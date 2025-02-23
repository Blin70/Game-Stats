import Link from "next/link";
import Image from "next/image";
import Logo from "/public/icons/LogoSword.png";
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';


const Navbar = () => {

    return(
        <>
            <nav className="h-24 px-32 grid grid-cols-[20%,45%,25%] rounded-lg bg-gray-50">
                    <div className="h-full w-full overflow-hidden">
                        <div className="h-full w-fit">
                            <Link href='/'>
                                <Image alt="Logo" src={Logo} className="h-full w-fit" priority />
                            </Link>
                        </div>
                    </div>
                <div className="flex h-full w-full text-2xl space-x-20 items-center ">
                    <Link href='/TopGames'>Top Games</Link>
                    <Link href='#'>Leaderboards</Link>
                </div>
                <div className="flex items-center w-full relative">
                        <Input type="text" name="SearchBar" className="w-full text-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <Search  className="absolute right-0 m-3 block size-6 opacity-90"/>
                </div>
            </nav>
        </>
    );
}

export default Navbar;