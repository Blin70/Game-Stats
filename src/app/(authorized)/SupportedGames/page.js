import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import valorantImage from "/public/icons/valorantImage.jpg";
import gtaImage from "/public/icons/gtaImage.jpg";
import assassinscreedImage from "/public/icons/assassinscreedImage.jpg";
import eafcImage from "/public/icons/eafcImage.jpg";
import { Circle } from "lucide-react";
import { getCurrentlySupportedGames } from "@/app/utils/server-actions/gameActions";


const SupportedGames = async () => {
  const supportedGames = await getCurrentlySupportedGames();

  const games = [
    ...(supportedGames),
    {name: "Valorant", image_url: valorantImage},
    {name: "GTA V", image_url: gtaImage},
    {name: "Assassins Creed 2", image_url: assassinscreedImage},
    {name: "EA FC 24", image_url: eafcImage}
  ];

  const supportedGamesNames = supportedGames.map(game => game.name)

    const renderedGames = games.map((i, index)=>{
        return(
            <Card key={index} className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-200">
                <CardHeader className="p-0">
                    <Image src={i.image_url} width={i.image_url.width || 500} height={i.image_url.height || 375} alt={i.name} className="w-full h-40 object-cover" />  {/*Adjust the 'size' when making the website responsive*/}
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-xl font-bold">{i.name}</CardTitle>
                    <p className="mt-2 text-grayed-out">Track your stats for this game.</p>
                    <Button asChild className="mt-4 px-4 py-2 rounded-lg">
                      <Link href={`/games/${i.alias}`}>View Stats</Link>
                    </Button>
                    <label className="flex items-center float-right gap-1 mt-6 font-medium leading-loose tracking-tight">
                      <Circle className={`size-2.5 ${supportedGamesNames.includes(i.name) ? 'text-green-600 fill-green-600' : 'text-red-600 fill-red-600'}`}/> 
                      {supportedGamesNames.includes(i.name) ? 'Supported' : 'Not Supported'}
                    </label>
                </CardContent>
            </Card>
        );
    })

    return (
      <div className="h-full w-full">
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold tracking-wide">Explore Supported Games</h1>
          <p className="mt-4 text-xl">
            Select a game below to find your stats and track your progress.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
            {renderedGames}
        </div>
      </div>
    );
}

export default SupportedGames;