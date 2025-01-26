import { Input } from "@/components/ui/input"
import { CurrentlySupportedGames } from "../../SupportedGames/page";
import { redirect } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiOrigin, SiSteam, SiPlaystation, SiUbisoft } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { createClient } from "@/app/utils/supabase/server";


const UsernameEntry = async ({ params: { game_name } }) => {
    const isSupported = (await CurrentlySupportedGames()).some((game) => game.alias.toLowerCase() === game_name.toLowerCase() && !game.deprecated);
    
    if(!isSupported) redirect('/unauthorized');

    const supabase = createClient();

    const { data: GameData, error } = await supabase.from('games').select('name, platforms').eq('alias', game_name).single()

    if(error) console.error("Error while getting data for the game from supabase", error);

    const possiblePlatforms = {
        "ubi":{
            name: "Ubisoft",
            icon: <SiUbisoft className="size-6 inline-block mr-3"/>
        },
        "steam":{
            name: "Steam",
            icon: <SiSteam className="size-6 inline-block mr-3"/>
        },
        "xbl":{
            name: "Xbox Live",
            icon: <FaXbox className="size-6 inline-block mr-3"/>
        },
        "psn":{
            name: "PlayStation Network",
            icon: <SiPlaystation className="size-6 inline-block mr-3"/>
        },
        "origin":{
            name: "Origin",
            icon: <SiOrigin className="size-6 inline-block mr-3"/>
        }
    }

    const renderedPlatforms = GameData.platforms.map((platform, index) => (
        <SelectItem key={index} value={platform} className="font-semibold">
            {possiblePlatforms[platform].icon} {possiblePlatforms[platform].name} 
        </SelectItem>
    ))


    const submitUsername = async (formData) => {
        "use server";

        const Username = formData.get('Username');
        const Platform = formData.get('SelectedPlatform');

        redirect(`/games/${game_name}/${Platform}/${encodeURIComponent(Username)}`)
    }

    return (
        <form action={submitUsername} className="h-fit w-fit mx-auto p-4 text-center mt-40 space-y-4">
            <h1 className="text-5xl">{GameData.name} Stats</h1>
            <div className="flex space-x-5 items-center">
                <Select name="SelectedPlatform">
                    <SelectTrigger className="w-fit space-x-1">
                        <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                        {renderedPlatforms}
                    </SelectContent>
                </Select>
                <Input type="text" name="Username" placeholder="Enter Username" className="w-fit h-fit mx-auto rounded-2xl text-3xl p-3" autoComplete="off"  />
            </div>
        </form>
    );

}

export default UsernameEntry;