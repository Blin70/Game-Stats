import Link from "next/link";
import Image from "next/image";
import apexImage from "/public/icons/apexImage.jpg";
import apexIcon from "/public/icons/apexIcon.png";
import csgoImage from "/public/icons/csgoImage.png";
import csgoIcon from "/public/icons/csgoIcon.png";
import division2Image from "/public/icons/division2Image.jpg";
import division2Icon from "/public/icons/division2Icon.png";
import splitgateImage from "/public/icons/splitgateImage.jpg";
import splitgateIcon from "/public/icons/splitgateIcon.png";
import valorantImage from "/public/icons/valorantImage.jpg";
import gtaImage from "/public/icons/gtaImage.jpg";
import assassinscreedImage from "/public/icons/assassinscreedImage.jpg";
import eafcImage from "/public/icons/eafcImage.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const CurrentlySupportedGames = [
  { name: "Apex Legends", image: apexImage, icon: apexIcon },
  { name: "CSGO 2", image: csgoImage, icon: csgoIcon },
  { name: "The Division 2", image: division2Image, icon: division2Icon },
  { name: "Splitgate", image: splitgateImage, icon:splitgateIcon },
]

const Games = [
        ...CurrentlySupportedGames,
        {name: "Valorant", image: valorantImage},
        {name: "GTA V", image: gtaImage},
        {name: "Assassins Creed 2", image: assassinscreedImage},
        {name: "EA FC 24", image: eafcImage}
];

const SupportedGames = () => {

    const renderedGames = Games.map((i)=>{
        return(
            <Card key={i.name} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-200">
                <CardHeader className="p-0">
                    <Image src={i.image} alt="Apex Legends" className="w-full h-40 object-cover" />
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
export { CurrentlySupportedGames, Games };