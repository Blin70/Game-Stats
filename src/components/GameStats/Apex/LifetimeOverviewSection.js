import Image from "next/image";
import { Sparkles } from 'lucide-react';
import { renderedCoreStats, renderedOtherStats } from "../RenderStats";

const LifetimeOverviewSection = ({ CurrentRank, coreStats, otherStats }) => {

    return(
        <div className="flex flex-col w-full rounded-2xl pb-3 bg-[#1e1e1e]">
            <div className="w-full flex items-center p-3 ml-3 gap-3">
                <Sparkles className="size-9" />
                <h1 className="text-3xl font-serif font-semibold tracking-wide">Lifetime Overview</h1>
            </div>
            <div className="w-full px-3 py-5 space-x-2 bg-[#343a40] items-center flex">
                <Image alt="Current Rank Icon" src={CurrentRank?.metadata?.iconUrl} width={100} height={100} className="object-cover inline-block" />
                <div className="inline-block">
                    <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{CurrentRank?.displayValue || '?'} RP</span>
                    <h2 className="text-4xl font-semibold font-serif">{CurrentRank?.metadata?.rankName}</h2>
                    <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{CurrentRank?.rank || '?'}</span>
                </div>
            </div>
            <div className="flex justify-center px-4 gap-10 -mt-5">
                {renderedCoreStats(coreStats)}
            </div>
            <div className="grid grid-cols-5 gap-7 w-full mt-2 p-2 gap-y-10">
                {renderedOtherStats(otherStats)}
            </div>
        </div>
    );
}

export default LifetimeOverviewSection;