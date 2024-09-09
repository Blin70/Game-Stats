import Image from "next/image";
import defaultProfilePic from "/public/icons/default_profile_pic.png"
import { games } from "@/app/_components/SidebarComp/GamesContainer";
import { getCurrentUser } from "@/app/utils/auth/AuthActions";
import ClientImage from "@/app/_components/StatsComp/ClientImage";

const Profile = async () => {

    const renderedGames = games.map((game)=>{
        return(
            <div key={game.name} className="inline-block cursor-pointer">
                <ClientImage game={game} />
                <label>{game.name}</label>
            </div>
        ); 
    })
    

    return (
        <div className="w-1/3 h-fit mx-auto text-center ">
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