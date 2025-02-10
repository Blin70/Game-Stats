const Division2Tabs = ({ Awards, LifetimeOverviewSection, DarkZoneSection, PvESection, PlayDetailsSection }) => {
    

    return(
        <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <aside>
                {Awards}
            </aside>
            <main className="space-y-5">
                {LifetimeOverviewSection}
                {DarkZoneSection}
                {PvESection}
                {PlayDetailsSection}
            </main>
        </div>
    );


}

export default Division2Tabs;