import Image from "next/image";
import { renderedCoreStats, renderedOtherStats } from "../RenderStats";

const Legend = ({ legend }) => {

  if(Object.keys(legend.stats).length === 0 ) return;

  const legendCoreStatsKeys = ['kills', 'damage', 'wins'];
    
  const legendCoreStats = Object.entries(legend.stats).filter(([key]) => legendCoreStatsKeys.includes(key));
  const legendOtherStats = Object.entries(legend.stats).filter(([key]) => !legendCoreStatsKeys.includes(key));
    
  return(
    <div className="rounded-2xl bg-[#1e1e1e] mt-5 first:mt-0">
      <div className="flex items-center bg-[#343a40] rounded-t-2xl">
        <Image src={legend?.metadata?.portraitImageUrl} alt="Legend Icon" width={80} height={80} style={{ backgroundColor: legend?.metadata?.legendColor }} className="object-cover rounded-tl-2xl" />
        <h2 className="text-3xl font-medium p-3">{legend?.metadata?.name}</h2>
      </div>
      <div className="p-5">
        <div className="flex justify-center gap-10">
          {renderedCoreStats(legendCoreStats)}
        </div>
        <div className="grid grid-cols-4 gap-7 w-full mt-7 gap-y-10">
          {renderedOtherStats(legendOtherStats)}
        </div>
      </div>
    </div>
  )
}

export default Legend;