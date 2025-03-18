import RefreshStatsBtn from "./components/RefreshStatsBtn";
import { getCurrentlySupportedGames } from "@/app/utils/server-actions/userActions";
import { redirect } from "next/navigation";
import { TRNProfile } from "@/app/utils/external-apis/externalApi";
import Image from "next/image";
import { SiOrigin, SiSteam, SiPlaystation, SiUbisoft } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import GameBackgroundImage from "./components/GameBackgroundImage";
import StatTabs from "./components/StatTabs";
import IgnNotFound from "./components/IgnNotFound";
import getGameProps from "./lib/getGameProps";


const UserGameStats = async ({ params: { game_name, platform , ign } }) => {
  const isSupported = (await getCurrentlySupportedGames()).some((game) => game.alias.toLowerCase() === game_name.toLowerCase() && !game.deprecated);
  if(!isSupported) redirect('/unauthorized');

  const supportedPlatforms = ['steam', 'xbl', 'psn', 'origin', 'ubi'];    
  if(!supportedPlatforms.includes(platform)) redirect('/unauthorized');

  const playerData = await TRNProfile(game_name, platform, ign);

  if(Object.keys(playerData) == "err" && playerData?.err?.code === 'CollectorResultStatus::NotFound') {

    return(
      <IgnNotFound errorMessage={playerData?.err?.message} />
    );
  }


  return (
    <>
      <div className="relative">
        <GameBackgroundImage game_name={game_name} />
        <div className="flex relative max-w-7xl mx-auto -mt-14 -mb-10 text-white">
          <div className="mr-6 flex flex-shrink-0 relative size-24">
            <Image alt="User Avatar" width={100} height={100} src={playerData.avatarUrl} className="h-full w-full absolute left-0 top-0 rounded-full object-cover z-10 border-4 border-solid border-white"/>
          </div>
          <div className="flex flex-col justify-start gap-1">
            {playerData?.pageviews && (
              <div className="flex items-center -mt-3">
                <span className="flex items-center gap-2 text-sm"><BsEyeFill /> {playerData.pageviews} views</span>
              </div>
            )}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 items-start rounded-full p-2 bg-black/15 w-9">
                { playerData.platformSlug === 'origin' && <SiOrigin className="size-5" /> }
                { playerData.platformSlug === 'steam' && <SiSteam className="size-5" /> }
                { playerData.platformSlug === 'psn' && <SiPlaystation className="size-5" /> }
                { playerData.platformSlug === 'xbl' && <FaXbox className="size-5" /> }
                { playerData.platformSlug === 'ubi' && <SiUbisoft className="size-5" />}
              </div>
              <span className="text-3xl">{playerData.platformUserHandle}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-5 right-10">
          <RefreshStatsBtn />
        </div>
      </div>

      <StatTabs 
        CategorizedStats={playerData.categorizedStats}
        GameProps={getGameProps(game_name, playerData, platform, ign)}
        gameName={game_name}
      />
    </>
  )
}

export default UserGameStats;