import { Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";


export const renderedCoreStats = (coreStats) => (
    coreStats.map(([key, value]) => (
        <div key={key} className="bg-[#292929] rounded-2xl flex flex-col justify-center items-center p-2 w-full max-w-72">
          <h3 className="text-xl font-medium -ml-14">{value.displayName}</h3>
          <h2 className="text-3xl font-bold">{value.displayValue}</h2>
          <div className="flex text-[#ffd43b] text-xs items-center">
            {value.rank && <span>#{value.rank}</span>}
            {(value.rank && value.percentile) && <Circle className="size-1.5 fill-[#ffd43b] mx-1" />}
              {value.percentile && <span>Top {Number.isInteger(value.percentile) ? (100 - value.percentile) : (parseFloat(100 - value.percentile).toFixed(1))}%</span>}
          </div>
        </div>
    ))
);

export const renderedOtherStats = (otherStats) => (
    otherStats.map(([key, value]) => (
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
);