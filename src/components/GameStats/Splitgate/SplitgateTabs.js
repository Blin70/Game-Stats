const SplitgateTabs = ({ activeTab, LifetimeOverviewSection, OverviewPlaylists, Playlists, Weapons }) => {

    return(
        <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <aside>
                {Weapons}
            </aside>
            <main className="space-y-5">
                {activeTab === 'overview' && (
                    <>
                        {LifetimeOverviewSection}
                        {OverviewPlaylists}
                    </>
                )}
                {activeTab === 'playlist' && (
                    <>
                        {Playlists}
                    </>
                )}
            </main>
        </div>
    );
}

export default SplitgateTabs;