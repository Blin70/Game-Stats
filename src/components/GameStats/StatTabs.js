"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const StatTabs = ( { CategorizedStats, GameComponent }) => {
    const [ activeTab, setActiveTab ] = useState(Object.keys(CategorizedStats)[0]);
    const router = useRouter();

    const renderedTabOptions = Object.keys(CategorizedStats).map((option, index) => (
        <li key={index} onClick={() => setActiveTab(option)} className={`${activeTab === option && "text-white/100 -mt-0.5"} capitalize h-fit cursor-pointer hover:-mt-0.5 hover:text-white/100`}>{option}</li>
    ))

    useEffect(() => {
        document.cookie = `activeTab=${activeTab}; path=/;`;
        router.refresh();
    }, [activeTab, router])

    return(
        <>
            <div className="bg-[#1e1e1e] grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
                <div></div>
                <ul className="flex gap-6 text-white/80">
                   {renderedTabOptions}
                </ul>
            </div>
                
            {GameComponent}
        </>
    );
}

export default StatTabs;