"use client"

import { useState } from "react";
import ApexLegendsTabs from "./Apex/ApexLegendsTabs";
import Division2Tabs from "./Division-2/Division2Tabs";
import SplitgateTabs from "./Splitgate/SplitgateTabs";


const StatTabs = ({ CategorizedStats, GameProps, gameName }) => {
    const [ activeTab, setActiveTab ] = useState(Object.keys(CategorizedStats)[0]);

    const renderedTabOptions = Object.keys(CategorizedStats).map((option, index) => (
        <li key={index} onClick={() => setActiveTab(option)} className={`${activeTab === option && "text-white/100 border-b-2"} capitalize h-fit cursor-pointer hover:scale-105 hover:text-white/100`}>{option}</li>
    ))

    return(
      <>
        <div className="bg-[#1e1e1e] grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
          <div></div>
          <ul className="flex gap-6 text-white/80">{renderedTabOptions}</ul>
        </div>

        {gameName === "apex" && <ApexLegendsTabs activeTab={activeTab} RankSection={GameProps?.RankSection} SteamAliasSection={GameProps?.SteamAliasSection} LifetimeOverviewSection={GameProps?.LifetimeOverviewSection} RenderedSomeLegends={GameProps?.RenderedSomeLegends} RenderedLegends={GameProps?.RenderedLegends} />}
        {gameName === "csgo" && <h1>Section in developement</h1>}
        {gameName === "division-2" && <Division2Tabs Awards={GameProps?.Awards} LifetimeOverviewSection={GameProps?.LifetimeOverviewSection} DarkZoneSection={GameProps?.DarkZoneSection} PvESection={GameProps?.PvESection} PlayDetailsSection={GameProps?.PlayDetailsSection} /> }
        {gameName === "splitgate" && <SplitgateTabs activeTab={activeTab} LifetimeOverviewSection={GameProps?.LifetimeOverviewSection} OverviewPlaylists={GameProps?.OverviewPlaylists} Playlists={GameProps?.Playlists} Weapons={GameProps?.Weapons} />}
      </>
    );
}

export default StatTabs;