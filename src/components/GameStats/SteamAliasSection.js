import { SiSteam } from "react-icons/si";


const SteamAliasSection = ({ steamUsername }) => {

    return (
        <div className="mt-5 rounded-2xl bg-[#1e1e1e] flex flex-col border border-[#292929]">
            <div className="flex py-5 px-6">
                <h2 className="text-2xl font-medium">Steam Alias</h2>
            </div>
            <div className="flex space-x-3 py-5 px-6 border-t border-t-[#292929]">
                <SiSteam className="size-7" /> <span className="text-xl font-bold">{steamUsername}</span>
            </div>
        </div>
    );
}

export default SteamAliasSection;