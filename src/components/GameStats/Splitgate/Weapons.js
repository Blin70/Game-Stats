import { GameSegments } from "@/app/utils/external-apis/externalApi";
import { Swords } from 'lucide-react';
import Image from "next/image";
import { renderedOtherStats } from "../RenderStats";

const Weapons = async ({ game, platform, ign }) => {
    const weaponsStats = await GameSegments(game, platform, ign, 'weapon');

    const renderedWeaponStats = weaponsStats?.res?.data?.slice(0,4)?.map((weapon) => (
        <div key={weapon.attributes.key} className="flex items-center">
            <Image src={weapon.metadata.imageUrl || undefined} width={100} height={100} alt={`${weapon.metadata.name} Weapon Image`} className="size-32 object-contain" /> 
            <div>
                <h3 className="font-semibold text-xl text-center">{weapon?.metadata?.name}</h3>
                <div className="flex flex-wrap justify-center gap-2 [&>*]:flex-1 p-3 [&>*>*>*]:text-sm">
                    {renderedOtherStats(Object.entries(weapon?.stats).slice(0,4))}
                </div>
            </div>
        </div>
    ));

    return(
        <div className="rounded-2xl flex flex-col bg-[#1e1e1e] w-full p-3">
            <div className="flex items-center space-x-3">
                <Swords className="size-11" />
                <div className="flex flex-col">
                    <h2 className="font-medium text-2xl">Top Weapons</h2>
                    <span className="font-semibold text-sm">Lifetime stats only.</span>
                </div>
            </div>
            <div className="mt-5 space-y-5">
                {renderedWeaponStats}
            </div>
        </div>
    );
}

export default Weapons;