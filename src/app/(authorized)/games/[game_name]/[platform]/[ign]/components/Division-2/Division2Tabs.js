const Division2Tabs = ({ awards, lifetimeOverviewSection, darkZoneSection, pVeSection, playDetailsSection }) => {
    
    return(
        <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <aside>
                {awards}
            </aside>
            <main className="space-y-5">
                {lifetimeOverviewSection}
                {darkZoneSection}
                {pVeSection}
                {playDetailsSection}
            </main>
        </div>
    );


}

export default Division2Tabs;