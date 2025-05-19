const ApexLegendsTabs = ({ activeTab, rankSection, steamAliasSection, lifetimeOverviewSection, renderedSomeLegends, renderedLegends }) => {

  return (
    <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
      <div>
        {rankSection}
        {steamAliasSection}
      </div>
      <div>
        {activeTab === "overview" && (
          <>
            {lifetimeOverviewSection}
            <div className="mt-5">
              {renderedSomeLegends}
            </div>
          </>
        )}
        {activeTab === "legend" && <div>{renderedLegends}</div>}
        {activeTab === "matches" && <div className="text-black">Matches</div>}
      </div>
    </div>
  );
};

export default ApexLegendsTabs;