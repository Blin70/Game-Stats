"use client"

import { useState } from "react";
import ApexLegendsTabs from "./apexLegends/ApexLegendsTabs";
import Division2Tabs from "./division2/Division2Tabs";
import SplitgateTabs from "./splitgate/SplitgateTabs";


const StatTabs = ({ categorizedStats, gameProps, gameName }) => {
    const [ activeTab, setActiveTab ] = useState(Object.keys(categorizedStats)[0]);

    const renderedTabOptions = Object.keys(categorizedStats).map((option, index) => (
        <li key={index} onClick={() => setActiveTab(option)} className={`${activeTab === option && "text-white/100 border-b-2"} capitalize h-fit cursor-pointer hover:scale-105 hover:text-white/100`}>{option}</li>
    ))

    return(
      <>
        <div className="bg-[#1e1e1e] grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
          <div></div>
          <ul className="flex gap-6 text-white/80">{renderedTabOptions}</ul>
        </div>

        {gameName === "apex" && <ApexLegendsTabs activeTab={activeTab} rankSection={gameProps?.rankSection} steamAliasSection={gameProps?.steamAliasSection} lifetimeOverviewSection={gameProps?.lifetimeOverviewSection} renderedSomeLegends={gameProps?.renderedSomeLegends} renderedLegends={gameProps?.renderedLegends} />}
        {gameName === "csgo" && <h1>Section in developement</h1>}
        {gameName === "division-2" && <Division2Tabs awards={gameProps?.awards} lifetimeOverviewSection={gameProps?.lifetimeOverviewSection} darkZoneSection={gameProps?.darkZoneSection} pVeSection={gameProps?.pVeSection} playDetailsSection={gameProps?.playDetailsSection} /> }
        {gameName === "splitgate" && <SplitgateTabs activeTab={activeTab} lifetimeOverviewSection={gameProps?.lifetimeOverviewSection} overviewPlaylists={gameProps?.overviewPlaylists} playlists={gameProps?.playlists} weapons={gameProps?.weapons} />}
      </>
    );
}

export default StatTabs;