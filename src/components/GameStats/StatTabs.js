"use client"

import { useState } from "react";


const StatTabs = ( { RankSection, SteamAliasSection, LifetimeOverviewSection, RenderedLegends, RenderedSomeLegends }) => {
    const [ activeTab, setActiveTab ] = useState("Overview");

    return(
        <>
            <div className="bg-[#1e1e1e] grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
                <div></div>
                <ul className="flex gap-6 text-white/80">
                    <li onClick={() => setActiveTab("Overview")} className={`${activeTab === "Overview" && "text-white/100 -mt-0.5"} h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100`}>Overview</li>
                    <li onClick={() => setActiveTab("Legends")} className={`${activeTab === "Legends" && "text-white/100 -mt-0.5"} h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100`}>Legends</li>
                    <li onClick={() => setActiveTab("Matches")} className={`${activeTab === "Matches" && "text-white/100 -mt-0.5"} h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100`}>Matches</li>
                </ul>
            </div>

            <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
                <div>
                    {RankSection}
                    {SteamAliasSection}
                </div>
                <div>
                    {activeTab === "Overview"
                        && (
                            <>
                                {LifetimeOverviewSection}
                                <div className="mt-5">
                                    {RenderedSomeLegends}
                                </div>
                            </>
                        )
                    }
                    {activeTab === "Legends"
                        && (
                            <div>
                                {RenderedLegends}
                            </div>
                        )
                    }
                    {activeTab === "Matches"
                        && (
                            <div className="text-black">
                                Matches
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default StatTabs;