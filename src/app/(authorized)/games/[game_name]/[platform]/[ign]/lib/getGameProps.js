import RankSection from "../components/Apex/RankSection";
import SteamAliasSection from "../components/Apex/SteamAliasSection";
import LifetimeOverviewSectionApex from "../components/Apex/LifetimeOverviewSection";
import RenderedLegends from "../components/Apex/RenderedLegends";
import Awards from "../components/Division-2/Awards";
import LifetimeOverviewSectionDivision2 from "../components/Division-2/LifetimeOverviewSection";
import OtherSections from "../components/Division-2/OtherSections";
import PlayDetailsSection from "../components/Division-2/PlayDetailsSection";
import LifetimeOverviewSectionSplitgate from "../components/Splitgate/LifetimeOverviewSection";
import Playlists from "../components/Splitgate/Playlists";
import Weapons from "../components/Splitgate/Weapons";
import { Radiation } from 'lucide-react';


export default function getGameProps(gameName, PlayerData, platform, ign){
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
                LifetimeOverviewSection: <LifetimeOverviewSectionApex CurrentRank={rankStats.rankScore} coreStats={coreStats} otherStats={otherStats} />,
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

           const generalKeys = ['killsPvP', 'killsNpc', 'killsSkill', 'headshots', 'itemsLooted', 'eCreditBalance'];
           const generalStats = Object.entries(GroupedCategories?.general).filter(([key]) => generalKeys.includes(key));

           return {
                Awards: <Awards stats={{
                    rankDz: GroupedCategories?.darkZone?.rankDZ,
                    commendationCount: GroupedCategories?.general?.commendationCount,
                    commendationScore: GroupedCategories?.general?.commendationScore,
                    killsSpecializationDemolitionist: GroupedCategories?.general?.killsSpecializationDemolitionist,
                    killsSpecializationSurvivalist: GroupedCategories?.general?.killsSpecializationSurvivalist,
                    killsSpecializationSharpshooter: GroupedCategories?.general?.killsSpecializationSharpshooter,
                    latestConflictRank: GroupedCategories?.conflictPvp?.latestConflictRank
                }} />,
                LifetimeOverviewSection: <LifetimeOverviewSectionDivision2 stats={generalStats} playtime={GroupedCategories?.general?.timePlayed} />,
                DarkZoneSection: <OtherSections stats={Object.entries(GroupedCategories?.darkZone)} Title='Dark Zone' Icon={<Radiation className="size-9" />} />,
                PvESection: <OtherSections stats={Object.entries(GroupedCategories?.pve)} Title='PvE' />,
                PlayDetailsSection: <PlayDetailsSection stats={Object.entries(GroupedCategories?.kills)} />
            };
        }

        case 'splitgate': {
            const GroupedCategories = {};

            Object.entries(PlayerData?.categorizedStats?.overview[0]?.stats).forEach((i) => {
                if (!GroupedCategories[i[1].category]) {
                    GroupedCategories[i[1].category] = { [i[0]]: i[1] };
                } else {
                    GroupedCategories[i[1].category][i[0]] = i[1];
                }
            });

            const overviewStatsKeys = ['kills', 'assists', 'deaths', 'damageDealt', 'kd', 'headshotAccuracy'];

            const overviewStats = {
                ...GroupedCategories.game,
                ...Object.fromEntries(Object.entries(GroupedCategories.combat).filter(([key]) => overviewStatsKeys.includes(key)))
            }

            return{
                LifetimeOverviewSection: <LifetimeOverviewSectionSplitgate stats={Object.entries(overviewStats)} playtime={GroupedCategories?.game?.timePlayed} />,
                OverviewPlaylists: <Playlists playlists={PlayerData?.categorizedStats?.playlist?.slice(0,12)} length={6} />,
                Playlists: <Playlists playlists={PlayerData?.categorizedStats?.playlist} />,
                Weapons: <Weapons game={gameName} platform={platform} ign={ign} />
            }
        }

        default:
            return null;
    }
}