import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
    return(
        <div className="h-44 relative">
            <ProfileMenu />
            <Link href="/Components/navbar/Table" className="absolute border-2 border-black rounded-3xl w-fit p-3 mt-16 right-1/4 text-3xl">Table</Link>
        </div>
    );
}

export default Navbar;