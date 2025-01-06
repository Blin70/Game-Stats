import { Button } from "@/components/ui/button"
import { CurrentlySupportedGames } from "@/app/(authorized)/SupportedGames/page";
import { redirect } from "next/navigation";
import { TRNProfile } from "@/app/utils/external-apis/externalApi";
import { revalidateTag } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
import Image from "next/image";
import { SiOrigin, SiSteam, SiPlaystation } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { Sparkles, Circle } from 'lucide-react';
import { Progress } from "@/components/ui/progress"

const UserGameStats = async ({ params: { game_name, ign } }) => {
  const isSupported = (await CurrentlySupportedGames()).some((game) => game.name.toLowerCase() === decodeURIComponent(game_name).toLowerCase());

  if(!isSupported) redirect('/unauthorized');

  const supabase = createClient();

  const PlayerData = await TRNProfile('apex', 'origin', ign);


  const rankKeys = ['lifetimePeakRankScore', 'peakRankScore', 'rankScore'];
  const coreStatsKeys = ['level', 'kills', 'damage', 'wins'];

  PlayerData.stats = Object.fromEntries(
    Object.entries(PlayerData.stats).filter(([key]) => key !== 'arenaRankScore')   //remove the arenaRankScore property
  );

  const rankStats = Object.entries(PlayerData.stats).filter(([key]) => rankKeys.includes(key));
  const coreStats = Object.entries(PlayerData.stats).filter(([key]) => coreStatsKeys.includes(key));
  const otherStats = Object.entries(PlayerData.stats).filter(([key]) => !rankKeys.includes(key) && !coreStatsKeys.includes(key));
  

  const renderedCoreStats = coreStats.map(([key, value]) => (
    <div key={key} className="bg-[#868e96] rounded-2xl flex flex-col justify-center items-center p-2 w-full max-w-72">
      <h3 className="text-xl font-medium -ml-14">{value.displayName}</h3>
      <h2 className="text-3xl font-bold">{value.displayValue}</h2>
      <div className="flex text-[#ffd43b] text-xs items-center">
        {value.rank && <span>#{value.rank}</span>}
        {(value.rank && value.percentile) && <Circle className="size-1.5 fill-[#ffd43b] mx-1" />}
        {value.percentile && <span>Top {Number.isInteger(value.percentile) ? (100 - value.percentile) : (parseFloat(100 - value.percentile).toFixed(1))}%</span>}
      </div>
    </div>
  ));

  const renderedOtherStats = otherStats.map(([key, value]) => (
    <div key={key} className="flex items-center w-full max-w-xs -space-x-8" >
      {value.percentile && <Progress value={value.percentile} className="[&>*]:bg-[#B7B7B7] bg-black h-2 w-20 -rotate-90 flex-none"/>}

      <div className="flex flex-col justify-center items-center w-full">
        <h3 className="text-xl font-medium truncate">{value.displayName}</h3>
        <h2 className="text-3xl font-bold">{value.displayValue}</h2>
        <div className="flex items-center text-xs text-[#ffd43b] space-x-1.5">
          {value.rank && <span>#{value.rank}</span>}
          {(value.rank && value.percentile) && <Circle className="size-1.5 fill-[#ffd43b]" />}
          {value.percentile && <span>Top {Number.isInteger(value.percentile) ? (100 - value.percentile) : parseFloat(100 - value.percentile).toFixed(1)}%</span>}
        </div>
      </div>
    </div>
  ))

    return (
        <>
          <Image alt={`${decodeURIComponent(game_name)} Image`} width={1472} height={900} src={(await supabase.from("games").select("background_img").eq("name", decodeURIComponent(game_name)).single()).data.background_img} className="rounded-md object-center w-full h-[40vh]"/>
          
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

          <div className="grid grid-cols-[25%,75%] mt-6 text-white/90">
            <div>
              <div className="w-fit rounded-2xl bg-[#1e1e1e] inline-block">
                <h1 className="text-center pt-4 text-3xl font-semibold font-serif">Peak Rating</h1>

                <div className="p-4 flex items-center space-x-4">
                  <Image alt="Peak Rank Icon" width={70} height={70} src={PlayerData.PeakRankIcon} className="object-cover" />

                  <div>
                    <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{PlayerData.PeakRankScore} RP</span>
                    <h2 className="text-3xl font-semibold font-serif">{PlayerData.PeakRank}</h2>
                    <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{PlayerData.PeakRankPlacement}</span>
                  </div>
                </div>

                <div className="bg-[#343a40] rounded-2xl p-5">
                  <h3 className="text-lg  mb-3 font-serif">Current Rating</h3>
                  <div className="flex items-center space-x-4">
                    <Image alt="Current Rank Icon" width={70} height={70} src={PlayerData.currentRankIcon} className="object-cover" />
                    <div>
                      <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{PlayerData.PeakRankScore} RP</span>
                      <h2 className="text-3xl font-semibold font-serif">{PlayerData.currentRank}</h2>
                      <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{PlayerData.PeakRankPlacement}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col rounded-2xl bg-[#1e1e1e]">
                <div className="w-full flex items-center p-3 ml-3 gap-2">
                  <Sparkles className="size-9" />
                  <h1 className="text-3xl font-serif font-semibold tracking-wide">Lifetime Overview</h1>
                </div>
                <div className="w-full px-3 py-5 space-x-2 bg-[#343a40] items-center flex">
                  <Image alt="Current Rank Icon" src={PlayerData.currentRankIcon} width={100} height={100} className="object-cover inline-block" />
                  <div className="inline-block">
                    <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{PlayerData.PeakRankScore} RP</span>
                    <h2 className="text-4xl font-semibold font-serif">{PlayerData.currentRank}</h2>
                    <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{PlayerData.PeakRankPlacement}</span>
                  </div>
                </div>
                <div className="flex justify-center px-4 gap-10 -mt-5 text-black">
                  {renderedCoreStats}
                </div>
                <div className="grid grid-cols-5 gap-7 w-full mt-2 p-2 gap-y-10">
                  {renderedOtherStats}
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default UserGameStats;