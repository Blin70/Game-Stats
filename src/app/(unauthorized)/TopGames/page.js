import { cookies } from "next/headers";
import { PandaScoreApi } from "@/app/utils/external-apis/externalApi";
import { RawgApi } from "@/app/utils/external-apis/externalApi";
import Carousel from "./components/Carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import valorantImage from '/public/icons/valorantImage.jpg';
import starcraftBroodWarImage from '/public/icons/starcraftBroodWarImage.jpg';
import starcraft2Image from '/public/icons/starcraft2Image.jpg';
import rocketLeagueImage from '/public/icons/rocketLeagueImage.jpg';
import r6SiegeImage from '/public/icons/r6SiegeImage.jpg';
import pubgMobileImage from '/public/icons/pubgMobileImage.jpg';
import overwatchImage from '/public/icons/overwatchImage.jpg';
import leagueOfLegendsImage from '/public/icons/lolImage.jpg';
import dota2Image from '/public/icons/dota2Image.jpg';
import csgoImage from '/public/icons/csgoImage.png';
import codMWImage from '/public/icons/codMWImage.jpg';


const TopGames = async () => {
    const cookieStore = cookies();
    const indexCookie = cookieStore.get('selectedGame')?.value || '0';

    let GameName = 'valorant';
    let TournamentGameName;

   switch(indexCookie){
    case '0':
        GameName = 'valorant';
        TournamentGameName = GameName;
        break;
    case '1':
        GameName = 'starcraft-brood-war';
        TournamentGameName = GameName;
        break;
    case '2':
        GameName = 'starcraft-2';
        TournamentGameName = GameName;
        break;
    case '3':
        GameName = 'rocket-league'
        TournamentGameName = 'rl';
        break;
    case '4':
        GameName = 'tom-clancys-rainbow-six-siege-2'
        TournamentGameName = 'r6siege';
        break;
    case '5':
        GameName = 'pubg-mobile'
        TournamentGameName = 'pubg';
        break;
    case '6':
        GameName = 'overwatch'
        TournamentGameName = 'ow';
        break;
    case '7':
        GameName = 'league-of-legends'
        TournamentGameName = 'lol';
        break;
    case '8':
        GameName = 'dota-2'
        TournamentGameName = 'dota2';
        break;
    case '9':
        GameName = 'counter-strike-global-offensive'
        TournamentGameName = 'csgo'
        break;
    case '10':
        GameName = 'call-of-duty-modern-warfare'
        TournamentGameName = 'codmw';
        break;
   }

    const GameInfo = await RawgApi(GameName);
    const Tournaments = await PandaScoreApi(TournamentGameName, 6);

    const renderedTournaments = Tournaments.map((tournament, index) => {
                return(
                    <Card key={index} className="w-full max-w-sm min-h-full px-5 py-2 inline-block overflow-hidden ml-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-secondary-foreground">{tournament.LeagueName}</CardTitle>
                        </CardHeader>
                        <CardContent className="font-medium text-lg space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-card-foreground">{tournament.Date}</span>
                                <span className="text-xs text-grayed-out">Date</span>
                            </div>
        
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <span className="text-2xl font-bold text-primary">{tournament.Prizepool}</span>
                                <span className="text-sm text-grayed-out">Prize Pool</span>
                            </div>
        
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-grayed-out">Teams:</span>
                                <span className="text-sm font-medium text-card-foreground ml-5">{tournament.Teams}</span>
                            </div>
        
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-grayed-out">Type:</span>
                                <span className="text-sm font-medium text-card-foreground">{tournament.Type}</span>
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
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Platforms</strong><br/>{game.Platforms}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Release Date</strong><br/>{game.Released}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Developer</strong><br/>{game.Developers}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Rating</strong><br/>{game.Rating}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Genre</strong><br/>{game.Genres}</h1>
                        <h1 className="mb-2 text-xl inline-block bg-secondary text-secondary-foreground rounded-xl p-4"><strong>Stores</strong><br/>{game.Stores}</h1>
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

    const TheGames = [
      {name: "valorant", image: valorantImage},
      {name: "starcraft-brood-war", image: starcraftBroodWarImage},
      {name: "starcraft-2", image: starcraft2Image},
      {name: "rocket-league", image: rocketLeagueImage},
      {name: "tom-clancys-rainbow-six-siege-2", image: r6SiegeImage},
      {name: "pubg-mobile", image: pubgMobileImage},
      {name: "overwatch", image: overwatchImage},
      {name: "league-of-legends", image: leagueOfLegendsImage},
      {name: "dota-2", image: dota2Image},
      {name: "counter-strike-global-offensive", image: csgoImage},
      {name: "call-of-duty-modern-warfare", image: codMWImage},
  ];
    

    return (
       <div className="container mx-auto px-36 py-4 space-y-8">
        <h1 className="text-center font-bold text-5xl">{GameInfo[0].Name}</h1>
            <Carousel TheGames={TheGames} />
            {renderedGameInfo}
       </div>
    )
}

export default TopGames;