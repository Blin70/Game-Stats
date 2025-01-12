import { cookies } from "next/headers";

const ApexLegendsTabs = ({ RankSection, SteamAliasSection, LifetimeOverviewSection, RenderedSomeLegends, RenderedLegends }) => {
  const cookieStore = cookies();
  const activeTab = cookieStore?.get('activeTab')?.value;

  return (
    <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
      <div>
        {RankSection}
        {SteamAliasSection}
      </div>
      <div>
        {activeTab === "overview" && (
          <>
            {LifetimeOverviewSection}
            <div className="mt-5">
              {RenderedSomeLegends}
            </div>
          </>
        )}
        {activeTab === "legend" && <div>{RenderedLegends}</div>}
        {activeTab === "matches" && <div className="text-black">Matches</div>}
      </div>
    </div>
  );
};

export default ApexLegendsTabs;