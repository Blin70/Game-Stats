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

const UserGameStats = async ({ params: { game_name, ign } }) => {
  const isSupported = (await CurrentlySupportedGames()).some((game) => game.name.toLowerCase() === decodeURIComponent(game_name).toLowerCase());

  if(!isSupported) redirect('/unauthorized');

  const supabase = createClient();

  const PlayerData = await TRNProfile('apex', 'origin', ign);

    return (
        <div>
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

          <div className="w-fit text-white mt-4 rounded-2xl bg-[#1e1e1e] tracking-wider">
            <h1 className="text-center pt-4 text-3xl font-semibold">Peak Rating</h1>

            <div className="p-4 flex items-center space-x-4">
              <Image alt="Peak Rank Icon" width={70} height={70} src={PlayerData.PeakRankIcon} className="object-cover" />

              <div>
                <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{PlayerData.PeakRankScore} RP</span>
                <h2 className="text-3xl font-semibold">{PlayerData.PeakRank}</h2>
                <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{PlayerData.PeakRankPlacement}</span>
              </div>
            </div>

            <div className="bg-[#343a40] rounded-2xl p-4">
              <h3 className="text-lg font-medium mb-3">Current Rating</h3>
              <div className="flex items-center space-x-4">
                <Image alt="Current Rank Icon" width={70} height={70} src={PlayerData.currentRankIcon} className="object-cover" />
                <div>
                  <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{PlayerData.PeakRankScore} RP</span>
                  <h2 className="text-3xl font-semibold">{PlayerData.currentRank}</h2>
                  <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{PlayerData.PeakRankPlacement}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default UserGameStats;