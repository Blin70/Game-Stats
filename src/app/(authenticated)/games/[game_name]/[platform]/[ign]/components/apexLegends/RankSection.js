import Image from "next/image";

const RankSection = ({ ranks }) => {

    return(
        <div className="w-full rounded-2xl bg-[#1e1e1e] inline-block">
            {ranks.peakRankScore && (
                <>
                    <h1 className="text-center pt-4 text-3xl font-semibold font-serif">Peak Rating</h1>
                    <div className="p-4 flex items-center space-x-4">
                        <Image alt="Peak Rank Icon" width={70} height={70} src={ranks.peakRankScore.metadata.iconUrl} className="object-cover" />
                        <div>
                            <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{ranks.peakRankScore.displayValue} RP</span>
                            <h2 className="text-3xl font-semibold font-serif">{ranks.peakRankScore.metadata.rankName}</h2>
                            <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{ranks.peakRankScore.rank}</span>
                        </div>
                    </div>
                </>
            )}

            {ranks.rankScore && (
                <div className="bg-[#343a40] rounded-2xl p-5">
                    <h3 className="text-lg  mb-3 font-serif">Current Rating</h3>
                    <div className="flex items-center space-x-4">
                        <Image alt="Current Rank Icon" width={70} height={70} src={ranks.rankScore.metadata.iconUrl} className="object-cover" />
                        <div>
                            <span className="text-xs text-[#ffd43b] text-right block tracking-normal">{ranks.rankScore.displayValue || '?'} RP</span>
                            <h2 className="text-3xl font-semibold font-serif">{ranks.rankScore.metadata.rankName}</h2>
                            <span className="text-xs text-[#ffd43b] text-left block tracking-normal">#{ranks.rankScore.rank || '?'}</span>
                        </div>
                    </div>
                </div>
            )}

            {Object.keys(ranks).length === 0 && (
                <div className="p-4 flex items-center justify-center space-x-4">
                    <h1 className="text-center pt-4 text-2xl">No rank data available</h1>
                </div>
            )}
        </div>
    );
}

export default RankSection;