import { Button } from "@/components/ui/button"
import { FaSkullCrossbones, FaHandsHelping , FaTrophy, FaBalanceScale, FaCrosshairs, FaMedal, FaEquals, FaUserAlt } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";

const UserGameStats = ({ params: { game_name, ign } }) => {

  const StatsFromDB = [
    { stat: "Kills", value: 1250, icon: <FaCrosshairs /> },
    { stat: "Deaths", value: 762, icon: <FaSkullCrossbones /> },
    { stat: "Assists", value: 506, icon: <FaHandsHelping /> },
    { stat: "Level", value: 102, icon: <GiLaurelsTrophy  /> },
    { stat: "K/D", value: 1.5, icon: <FaBalanceScale /> },
    { stat: "Win %", value: "60%" , icon: <FaMedal /> },
    { stat: "Wins", value: 506, icon: <FaTrophy /> },
    { stat: "Draws", value: 50, icon: <FaEquals /> },
    { stat: "Losses", value: 305, icon: <FaUserAlt /> },
    { stat: 'Headshot %', value: '30%'},
    { stat: 'Bodyshot %', value: '50%'},
    { stat: 'Legshot %', value: '20%'}
  ];
  
  const StatsFromDBrendered = StatsFromDB.slice(0,9).map((i) => {
    return(
        <div key={i.stat} className="p-6 rounded-lg shadow-lg flex flex-col items-center w-full bg-white hover:shadow-xl transition-shadow duration-300" >
          <div className="text-4xl mb-2">
            {i.icon}
          </div>
          <h1 className="text-4xl font-semibold text-gray-800">{i.value}</h1>
          <h1 className="text-lg text-gray-600">{i.stat}</h1>
        </div>
    );
  })

  const ShotStatsFromDbrendered = StatsFromDB.slice(9, 12).map((i) => {
    return (
      <div key={i.stat} className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{i.value}</span>
          </div>
        </div>
        <h3 className="mt-4 text-lg text-gray-600">{i.stat}</h3>
      </div>
    );
  });
  

    return (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">{decodeURIComponent(game_name)}</h1>
              <h2 className="text-lg italic text-gray-600">{decodeURIComponent(ign)}</h2>
            </div>
            <Button>Refresh Stats</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {StatsFromDBrendered}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {ShotStatsFromDbrendered}
          </div>
        </>
    );
}

export default UserGameStats;