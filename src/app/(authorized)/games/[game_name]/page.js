import { Input } from "@/components/ui/input";
import { getCurrentlySupportedGames, getGamePlatforms } from "@/app/utils/server-actions/gameActions";
import { redirect } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiOrigin, SiSteam, SiPlaystation, SiUbisoft } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


const UsernameEntry = async ({ params: { game_name } }) => {
    const isSupported = (await getCurrentlySupportedGames()).some((game) => game.alias.toLowerCase() === game_name.toLowerCase() && !game.deprecated);
    
    if(!isSupported) redirect('/unauthorized');

    const gameData = await getGamePlatforms(game_name, 'alias');

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

    const renderedPlatforms = gameData?.platforms?.map((platform, index) => (
        <SelectItem key={index} value={platform} className="font-semibold">
            {possiblePlatforms[platform].icon} {possiblePlatforms[platform].name} 
        </SelectItem>
    ))


    const submitUsername = async (formData) => {
        "use server";

        const username = formData.get('Username');
        const platform = formData.get('SelectedPlatform');

        redirect(`/games/${game_name}/${platform}/${encodeURIComponent(username)}`)
    }

    return (
        <form action={submitUsername} className="h-fit w-fit mx-auto p-4 text-center mt-40 space-y-4">
            <h1 className="text-5xl">{gameData.name} Stats</h1>
            <div className="flex space-x-5 items-center">
                <Select name="SelectedPlatform">
                    <SelectTrigger className="w-fit space-x-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                        {renderedPlatforms}
                    </SelectContent>
                </Select>
                <Input type="text" name="Username" placeholder="Enter Player Id" className="w-fit h-fit mx-auto rounded-2xl !text-3xl p-3" autoComplete="off"  />
            </div>
            <Button variant="outline" type="submit" className="gap-2 text-2xl font-normal rounded-2xl px-8 py-6 mx-auto border-2 hover:bg-accent/90 transition-all duration-200 active:scale-95">
                Search <Search className="!size-7" />
            </Button>
        </form>
    );

}

export default UsernameEntry;