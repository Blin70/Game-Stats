import { Button } from "@/components/ui/button"
import { CurrentlySupportedGames } from "@/app/(authorized)/SupportedGames/page";
import { redirect } from "next/navigation";
import { TRNProfile } from "@/app/utils/external-apis/externalApi";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { SiOrigin, SiSteam, SiPlaystation } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import RenderedLegends from "@/components/GameStats/RenderedLegends";
import SteamAliasSection from "@/components/GameStats/SteamAliasSection";
import GameBackgroundImage from "@/components/GameStats/GameBackgroundImage";
import RankSection from "@/components/GameStats/RankSection";
import LifetimeOverviewSection from "@/components/GameStats/LifetimeOverviewSection";


const UserGameStats = async ({ params: { game_name, ign } }) => {
  const isSupported = (await CurrentlySupportedGames()).some((game) => game.name.toLowerCase() === decodeURIComponent(game_name).toLowerCase());

  if(!isSupported) redirect('/unauthorized');

  const PlayerData = await TRNProfile('apex', 'origin', ign);
  

  const rankKeys = ['lifetimePeakRankScore', 'peakRankScore', 'rankScore'];
  const coreStatsKeys = ['level', 'kills', 'damage', 'wins'];

  PlayerData.stats = Object.fromEntries(
    Object.entries(PlayerData.stats).filter(([key]) => key !== 'arenaRankScore')   //removes the arenaRankScore property
  );

  const rankStats = Object.fromEntries(Object.entries(PlayerData.stats).filter(([key]) => rankKeys.includes(key)));
  const coreStats = Object.entries(PlayerData.stats).filter(([key]) => coreStatsKeys.includes(key));
  const otherStats = Object.entries(PlayerData.stats).filter(([key]) => !rankKeys.includes(key) && !coreStatsKeys.includes(key));

    return (
        <>
          <GameBackgroundImage game_name={decodeURIComponent(game_name)} />
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
                </div>
                <span className="text-3xl">{PlayerData.platformUserHandle}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
            <div></div>
            <ul className="flex gap-6 text-white/80">
              <li className="h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100">Overview</li>
              <li className="h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100">Legends</li>
              <li className="h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100">Matches</li>
            </ul>
          </div>

          <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <div>
              <RankSection Ranks={rankStats} />
              {PlayerData.steamUsername && <SteamAliasSection steamUsername={PlayerData.steamUsername} /> }
            </div>

            <div>
              <LifetimeOverviewSection CurrentRank={rankStats.rankScore} coreStats={coreStats} otherStats={otherStats} />
              <div>
                <RenderedLegends legendsArray={PlayerData.segments.slice(1)} />
              </div>
            </div>
          </div>
        </>
    )
}

export default UserGameStats;