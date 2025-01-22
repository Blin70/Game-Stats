import RankSection from "@/components/GameStats/Apex/RankSection";
import SteamAliasSection from "@/components/GameStats/Apex/SteamAliasSection";
import LifetimeOverviewSection from "@/components/GameStats/Apex/LifetimeOverviewSection";
import RenderedLegends from "@/components/GameStats/Apex/RenderedLegends";
import Awards from "@/components/GameStats/Division-2/Awards";


export default function getGameProps(gameName, PlayerData){
    if(!PlayerData) return null;

    switch(gameName){
        case 'apex': {
            const rankKeys = ['lifetimePeakRankScore', 'peakRankScore', 'rankScore'];
            const coreStatsKeys = ['level', 'kills', 'damage', 'wins'];
            
            let AllTimeStats = PlayerData?.categorizedStats?.overview[0]?.stats;

            AllTimeStats = Object.fromEntries(
                Object.entries(AllTimeStats).filter(([key]) => key !== 'arenaRankScore')
            );

            const rankStats = Object.fromEntries(Object.entries(AllTimeStats).filter(([key]) => rankKeys.includes(key)));
            const coreStats = Object.entries(AllTimeStats).filter(([key]) => coreStatsKeys.includes(key));
            const otherStats = Object.entries(AllTimeStats).filter(([key]) => !rankKeys.includes(key) && !coreStatsKeys.includes(key));

            return {
                RankSection: <RankSection Ranks={rankStats} />,
                SteamAliasSection: PlayerData.steamUsername ? <SteamAliasSection steamUsername={PlayerData.steamUsername} /> : null,
                LifetimeOverviewSection: <LifetimeOverviewSection CurrentRank={rankStats.rankScore} coreStats={coreStats} otherStats={otherStats} />,
                RenderedLegends: PlayerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={PlayerData.categorizedStats.legend} /> : null,
                RenderedSomeLegends: PlayerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={PlayerData.categorizedStats.legend.slice(0, 4)} /> : null,
            };
        }
        
        case 'division-2': {
            const GroupedCategories = {};

            Object.entries(PlayerData?.categorizedStats?.overview[0]?.stats).forEach((i) => {
                if (!GroupedCategories[i[1].category]) {
                    GroupedCategories[i[1].category] = { [i[0]]: i[1] };
                } else {
                    GroupedCategories[i[1].category][i[0]] = i[1];
                }
            });
            


           return {
                Awards: <Awards stats={{
                    rankDz: GroupedCategories?.darkZone?.rankDZ,
                    commendationCount: GroupedCategories?.general?.commendationCount,
                    commendationScore: GroupedCategories?.general?.commendationScore,
                    killsSpecializationDemolitionist: GroupedCategories?.general?.killsSpecializationDemolitionist,
                    killsSpecializationSurvivalist: GroupedCategories?.general?.killsSpecializationSurvivalist,
                    killsSpecializationSharpshooter: GroupedCategories?.general?.killsSpecializationSharpshooter,
                    latestConflictRank: GroupedCategories?.conflictPvp?.latestConflictRank
                }} />
           };
        }

        default:
            return null;
    }
}