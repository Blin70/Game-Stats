const SplitgateTabs = ({ activeTab, lifetimeOverviewSection, overviewPlaylists, playlists, weapons }) => {

    return(
        <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <aside>
                {weapons}
            </aside>
            <main className="space-y-5">
                {activeTab === 'overview' && (
                    <>
                        {lifetimeOverviewSection}
                        {overviewPlaylists}
                    </>
                )}
                {activeTab === 'playlist' && (
                    <>
                        {playlists}
                    </>
                )}
            </main>
        </div>
    );
}

export default SplitgateTabs;