import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Games } from "@/app/(authorized)/SupportedGames/page";
import { PandaScoreApi } from "@/app/utils/auth/AuthActions";
import gtaImage from "/public/icons/gtaImage.jpg";
import { RawgApi } from "@/app/utils/auth/AuthActions";
import Image from "next/image";
import TopGamesCarousel from "@/components/Carousel/TopGamesCarousel";

const TopGames = async () => {
    const GameName = 'valorant';
    const GameInfo = await RawgApi(GameName);

    let TournamentGameName;

    switch(GameName){
        case 'counter-strike-global-offensive':
            TournamentGameName = 'csgo';
            break;
        case 'rocket-league':
            TournamentGameName = 'rl';
            break;
        case 'tom-clancys-rainbow-six-siege-2':
            TournamentGameName = 'r6siege';
            break;
        case 'pubg-mobile':
            TournamentGameName = 'pubg';
            break;
        case 'overwatch':
            TournamentGameName = 'ow';
            break;
        case 'call-of-duty-modern-warfare':
            TournamentGameName = 'codmw';
            break;
        case 'league-of-legends':
            TournamentGameName = 'lol';
            break;
        case 'dota-2':
            TournamentGameName = 'dota2';
            break;
        default:
            TournamentGameName = GameName;
    }

    const Tournaments = await PandaScoreApi(TournamentGameName, '6');

    

    const renderedTournaments = Tournaments.map((tournament, index) => {
                return(
                    <Card key={index} className="w-full max-w-sm min-h-full px-5 py-2 inline-block overflow-hidden ml-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-gray-800">{tournament.LeagueName}</CardTitle>
                        </CardHeader>
                        <CardContent className="font-medium text-lg space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{tournament.Date}</span>
                                <span className="text-xs text-gray-400">Date</span>
                            </div>
        
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <span className="text-2xl font-bold text-primary">{tournament.Prizepool}</span>
                                <span className="text-sm text-gray-500">Prize Pool</span>
                            </div>
        
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Teams:</span>
                                <span className="text-sm font-medium text-gray-800 ml-5">{tournament.Teams}</span>
                            </div>
        
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Type:</span>
                                <span className="text-sm font-medium text-gray-800">{tournament.Type}</span>
                            </div>
                        </CardContent>
                    </Card>
                );
    })

    const renderedGameInfo = GameInfo.map((game, index) => {
        return(
            <div key={index} className="space-y-5">
                <div className="space-x-5 text-center my-5 w-fit mx-auto">
                    <div className="p-0 space-x-8 rounded-xl py-2 w-fit mx-auto">
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Platforms</strong><br/>{game.Platforms}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Release Date</strong><br/>{game.Released}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Developer</strong><br/>{game.Developers}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Rating</strong><br/>{game.Rating}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Genre</strong><br/>{game.Genres}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-zinc-100 rounded-xl p-4"><strong>Stores</strong><br/>{game.Stores}</h1>
                    </div>
                        <div className="p-4 mx-auto mt-3 text-center">
                            <h1 className="text-3xl mx-auto mb-2"><strong>Game Description </strong></h1>
                            <p className="w-2/3 mx-auto text-md text-center">{game.Description}</p>
                        </div>
                </div>

                <div className="text-center flex flex-wrap justify-center gap-y-3">
                    {renderedTournaments.length > 0 ? renderedTournaments : <h1 className="font-semibold text-lg">There are currently no upcoming tournaments</h1>}
                </div>
            </div>
        );
    })

    


    return (
       <div className="container mx-auto px-36 py-4 space-y-8">
        <h1 className="text-center font-bold text-5xl">{GameInfo[0].Name}</h1>
            <TopGamesCarousel gamename={GameName} />
            {renderedGameInfo}
       </div>
    )
}

export default TopGames;