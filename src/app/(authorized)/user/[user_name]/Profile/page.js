import Image from "next/image";
import defaultProfilePic from "/public/icons/default_profile_pic.png"
import { CurrentlySupportedGames } from "@/app/(authorized)/SupportedGames/page";
import { getCurrentUser } from "@/app/utils/auth/AuthActions";
import Link from "next/link";

const Profile = async () => {

    const renderedGames = CurrentlySupportedGames.map((game)=>{
        return(
            <div key={game.name} className="inline-block cursor-pointer text-center">
                <Link href={'/games/'+encodeURIComponent(game.name)}>
                    <Image alt={game.name} src={game.icon} className="size-24" />
                </Link>
                <label>{game.name}</label>
            </div>
        ); 
    })
    

    return (
        <div className="w-fit h-full mx-auto text-center">
            <h1 className="text-4xl mb-2">{(await getCurrentUser()).user_metadata.first_name}</h1>
            <Image className="size-1/3 mx-auto cursor-pointer" alt="Profile" src={defaultProfilePic} />
            <div className="w-full mt-14">
                <h1 className="text-4xl">Select a Game To View Your Stats</h1>
                <div className="inline-block space-x-10 mt-10">
                    {renderedGames}
                </div>
            </div>
        </div>
    );
}

export default Profile;