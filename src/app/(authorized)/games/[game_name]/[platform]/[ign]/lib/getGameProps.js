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


export default function getGameProps(gameName, playerData, platform, ign){
    if(!playerData) return null;

    switch(gameName){
        case 'apex': {
            const rankKeys = ['lifetimePeakRankScore', 'peakRankScore', 'rankScore'];
            const coreStatsKeys = ['level', 'kills', 'damage', 'wins'];
            
            let allTimeStats = playerData?.categorizedStats?.overview[0]?.stats;

            allTimeStats = Object.fromEntries(
                Object.entries(allTimeStats).filter(([key]) => key !== 'arenaRankScore')
            );

            const rankStats = Object.fromEntries(Object.entries(allTimeStats).filter(([key]) => rankKeys.includes(key)));
            const coreStats = Object.entries(allTimeStats).filter(([key]) => coreStatsKeys.includes(key));
            const otherStats = Object.entries(allTimeStats).filter(([key]) => !rankKeys.includes(key) && !coreStatsKeys.includes(key));

            return {
                rankSection: <RankSection ranks={rankStats} />,
                steamAliasSection: playerData.steamUsername ? <SteamAliasSection steamUsername={playerData.steamUsername} /> : null,
                lifetimeOverviewSection: <LifetimeOverviewSectionApex currentRank={rankStats.rankScore} coreStats={coreStats} otherStats={otherStats} />,
                renderedLegends: playerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={playerData.categorizedStats.legend} /> : null,
                renderedSomeLegends: playerData?.categorizedStats?.legend ? <RenderedLegends legendsArray={playerData.categorizedStats.legend.slice(0, 4)} /> : null,
            };
        }
        
        case 'division-2': {
            const groupedCategories = {};

            Object.entries(playerData?.categorizedStats?.overview[0]?.stats).forEach((i) => {
                if (!groupedCategories[i[1].category]) {
                    groupedCategories[i[1].category] = { [i[0]]: i[1] };
                } else {
                    groupedCategories[i[1].category][i[0]] = i[1];
                }
            });

           const generalKeys = ['killsPvP', 'killsNpc', 'killsSkill', 'headshots', 'itemsLooted', 'eCreditBalance'];
           const generalStats = Object.entries(groupedCategories?.general).filter(([key]) => generalKeys.includes(key));

           return {
                awards: <Awards stats={{
                    rankDz: groupedCategories?.darkZone?.rankDZ,
                    commendationCount: groupedCategories?.general?.commendationCount,
                    commendationScore: groupedCategories?.general?.commendationScore,
                    killsSpecializationDemolitionist: groupedCategories?.general?.killsSpecializationDemolitionist,
                    killsSpecializationSurvivalist: groupedCategories?.general?.killsSpecializationSurvivalist,
                    killsSpecializationSharpshooter: groupedCategories?.general?.killsSpecializationSharpshooter,
                    latestConflictRank: groupedCategories?.conflictPvp?.latestConflictRank
                }} />,
                lifetimeOverviewSection: <LifetimeOverviewSectionDivision2 stats={generalStats} playtime={groupedCategories?.general?.timePlayed} />,
                darkZoneSection: <OtherSections stats={Object.entries(groupedCategories?.darkZone)} title='Dark Zone' icon={<Radiation className="size-9" />} />,
                pVeSection: <OtherSections stats={Object.entries(groupedCategories?.pve)} title='PvE' />,
                playDetailsSection: <PlayDetailsSection stats={Object.entries(groupedCategories?.kills)} />
            };
        }

        case 'splitgate': {
            const groupedCategories = {};

            Object.entries(playerData?.categorizedStats?.overview[0]?.stats).forEach((i) => {
                if (!groupedCategories[i[1].category]) {
                    groupedCategories[i[1].category] = { [i[0]]: i[1] };
                } else {
                    groupedCategories[i[1].category][i[0]] = i[1];
                }
            });

            const overviewStatsKeys = ['kills', 'assists', 'deaths', 'damageDealt', 'kd', 'headshotAccuracy'];

            const overviewStats = {
                ...groupedCategories.game,
                ...Object.fromEntries(Object.entries(groupedCategories.combat).filter(([key]) => overviewStatsKeys.includes(key)))
            }

            return{
                lifetimeOverviewSection: <LifetimeOverviewSectionSplitgate stats={Object.entries(overviewStats)} playtime={groupedCategories?.game?.timePlayed} />,
                overviewPlaylists: <Playlists playlists={playerData?.categorizedStats?.playlist?.slice(0,12)} length={6} />,
                playlists: <Playlists playlists={playerData?.categorizedStats?.playlist} />,
                weapons: <Weapons game={gameName} platform={platform} ign={ign} />
            }
        }

        default:
            return null;
    }
}