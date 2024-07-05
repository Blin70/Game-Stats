import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import defaultProfilePic from "@/app/icons/default_profile_pic.png"
import { games } from "@/app/_components/SidebarComp/GamesContainer";

const Profile = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user){
      redirect('/SignIn')
    }

    const renderedGames = games.map((game)=>{
        return(
            <div key={game.name} className="inline-block cursor-pointer">
                <Image  alt={game.name} src={game.icon} className="size-24" />
                <label>{game.name}</label>
            </div>
        ); 
    })
    

    return (
        <div className="w-1/3 h-fit mx-auto text-center ">
            <h1 className="text-4xl mb-2">{data.user.user_metadata.first_name}</h1>
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