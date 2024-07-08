import StatsInfo from "@/app/_components/StatsComp/StatsInfoComp";
import { IoIosBody } from "react-icons/io";

const UserGameStats = ({ params: { game_name, ign } }) => {
    return (
        <>
            <h1 className="text-7xl h-fit w-fit mx-auto capitalize -mt-24">{decodeURIComponent(game_name)} Stats</h1>
                <h1 className="text-6xl mt-14 ml-14">{decodeURIComponent(ign)}</h1>
            <div className="ml-10 mt-10 space-x-5 space-y-10 text-center float-left inline-block">
                <StatsInfo Key='Kills' Value='100' className="text-5xl w-fit border-2 p-5 ml-5 border-black rounded-3xl inline-block" />
                <StatsInfo Key='Deaths' Value='100' />
                <StatsInfo Key='Assists' Value='100' />
                <br/>
                <StatsInfo Key='Acc level' Value='100' />
                <StatsInfo Key='KD' Value='0.8' />
                <StatsInfo Key='Win %' Value='50%' />
                <br/>
                <StatsInfo Key='Wins' Value='100' />
                <StatsInfo Key='Draws' Value='100' />
                <StatsInfo Key='Losses' Value='50' />
            </div>
            <div className="float-right h-fit w-fit inline-block space-x-10 relative" >
                <div className="inline-block text-4xl space-y-20 mt-14 right-96 absolute font-semibold">
                        <h1 className="w-max">Headshot %: 30%</h1>
                        <h1 className="w-max">Bodyshot %: 60%</h1>
                        <h1 className="w-max">Legshot %: 10%</h1>
                </div>
                <IoIosBody className="size-96 inline-block" />
            </div>
        </>
    );
}

export default UserGameStats;