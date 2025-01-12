import { Button } from "@/components/ui/button"
import { CurrentlySupportedGames } from "@/app/(authorized)/SupportedGames/page";
import { redirect } from "next/navigation";
import { TRNProfile } from "@/app/utils/external-apis/externalApi";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { SiOrigin, SiSteam, SiPlaystation, SiUbisoft } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import RenderedLegends from "@/components/GameStats/RenderedLegends";
import SteamAliasSection from "@/components/GameStats/SteamAliasSection";
import GameBackgroundImage from "@/components/GameStats/GameBackgroundImage";
import RankSection from "@/components/GameStats/RankSection";
import LifetimeOverviewSection from "@/components/GameStats/LifetimeOverviewSection";
import StatTabs from "@/components/GameStats/StatTabs";
import IgnNotFound from "@/components/GameStats/IgnNotFound";
import ApexLegendsTabs from "@/components/GameStats/ApexLegendsTabs";


const UserGameStats = async ({ params: { game_name, platform , ign } }) => {
  const isSupported = (await CurrentlySupportedGames()).some((game) => game.alias.toLowerCase() === game_name.toLowerCase());
  if(!isSupported) redirect('/unauthorized');

  const SupportedPlatforms = ['steam', 'xbl', 'psn', 'origin', 'ubi'];    
  if(!SupportedPlatforms.includes(platform)) redirect('/unauthorized');

  const PlayerData = await TRNProfile(game_name, platform, ign);

  if(Object.keys(PlayerData) == "err" && PlayerData?.err?.code === 'CollectorResultStatus::NotFound') {

    return(
      <IgnNotFound errorMessage={PlayerData?.err?.message} />
    );
  }
  

  const rankKeys = ['lifetimePeakRankScore', 'peakRankScore', 'rankScore'];
  const coreStatsKeys = ['level', 'kills', 'damage', 'wins'];
  
  let AllTimeStats = PlayerData?.categorizedStats?.overview[0]?.stats;

  AllTimeStats = Object.fromEntries(
    Object.entries(AllTimeStats).filter(([key]) => key !== 'arenaRankScore')
  );

  const rankStats = Object.fromEntries(Object.entries(AllTimeStats).filter(([key]) => rankKeys.includes(key)));
  const coreStats = Object.entries(AllTimeStats).filter(([key]) => coreStatsKeys.includes(key));
  const otherStats = Object.entries(AllTimeStats).filter(([key]) => !rankKeys.includes(key) && !coreStatsKeys.includes(key));

  const GameComponent = (
    game_name === 'apex' ? (
      <ApexLegendsTabs 
        RankSection={<RankSection Ranks={rankStats} />} 
        SteamAliasSection={PlayerData.steamUsername && <SteamAliasSection steamUsername={PlayerData.steamUsername} />}
        LifetimeOverviewSection={<LifetimeOverviewSection CurrentRank={rankStats.rankScore} coreStats={coreStats} otherStats={otherStats} />} 
        RenderedLegends={PlayerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={PlayerData.categorizedStats.legend} /> : null}
        RenderedSomeLegends={PlayerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={PlayerData.categorizedStats.legend.slice(0,4)} /> : null} 
      />
    ) : game_name === 'division-2' ? (
      <div>
        <h1 className="text-black">Division 2</h1>
      </div>
    ) : game_name === 'csgo' ? (
      <div>
        <h1 className="text-black">CSGO</h1>
      </div>
    ) : game_name === 'splitgate' ? (
      <div>
        <h1 className="text-black">Splitgate</h1>
      </div>
    ) : null
  )

    return (
        <>
          <GameBackgroundImage game_name={game_name} />
          <div className="flex relative max-w-7xl mx-auto -mt-14 -mb-10 text-white">
            <div className="mr-6 flex flex-shrink-0 relative size-24">
              <Image alt="User Avatar" width={100} height={100} src={PlayerData.avatarUrl} className="h-full w-full absolute left-0 top-0 rounded-full object-cover z-10 border-4 border-solid border-white"/>
            </div>
            <div className="flex flex-col justify-start gap-1">
              <div className="flex items-center -mt-3">
                <span className="flex items-center gap-2 text-sm"><BsEyeFill /> {PlayerData.pageviews} views</span>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 items-start rounded-full p-2 bg-black/15 w-9">
                  { PlayerData.platformSlug === 'origin' && <SiOrigin className="size-5" /> }
                  { PlayerData.platformSlug === 'steam' && <SiSteam className="size-5" /> }
                  { PlayerData.platformSlug === 'psn' && <SiPlaystation className="size-5" /> }
                  { PlayerData.platformSlug === 'xbl' && <FaXbox className="size-5" /> }
                  { PlayerData.platformSlug === 'ubi' && <SiUbisoft className="size-5" />}
                </div>
                <span className="text-3xl">{PlayerData.platformUserHandle}</span>
              </div>
            </div>
          </div>

          <StatTabs 
            CategorizedStats={PlayerData.categorizedStats}
            GameComponent={GameComponent}
          />
        </>
    )
}

export default UserGameStats;