import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import valorantImage from "/public/icons/valorantImage.jpg";
import gtaImage from "/public/icons/gtaImage.jpg";
import assassinscreedImage from "/public/icons/assassinscreedImage.jpg";
import eafcImage from "/public/icons/eafcImage.jpg";
import { createClient } from "@/app/utils/supabase/server";


const CurrentlySupportedGames = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('games').select('*');

  if(error){
    console.error("Error while getting games from supabase", error);
    return [];
  }

  return data;
}

const SupportedGames = async () => {

  const Games = [
    ...(await CurrentlySupportedGames()),
    {name: "Valorant", image_url: valorantImage},
    {name: "GTA V", image_url: gtaImage},
    {name: "Assassins Creed 2", image_url: assassinscreedImage},
    {name: "EA FC 24", image_url: eafcImage}
  ];

  console.log("games: ",Games)
    const renderedGames = Games.map((i, index)=>{
        return(
            <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-200">
                <CardHeader className="p-0">
                    <Image src={i.image_url} width={i.image_url.width || 500} height={i.image_url.height || 375} alt={i.name} className="w-full h-40 object-cover" />  {/*Adjust the 'size' when making the website responsive*/}
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-xl font-bold">{i.name}</CardTitle>
                    <p className="mt-2 text-gray-600">Track your stats for this game.</p>
                    <Button asChild className="mt-4 text-white px-4 py-2 rounded-lg">
                      <Link href={`/games/${i.name}`}>View Stats</Link>
                    </Button>
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
export { CurrentlySupportedGames };