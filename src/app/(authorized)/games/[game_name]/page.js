'use client';

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

const UsernameEntry = ({ params:{game_name} }) => {
    const router = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            router.push(`/games/${game_name}/${encodeURIComponent(e.target.value)}`)
        }
    }


    return (
        <div className="h-fit w-fit mx-auto p-4 text-center mt-40 space-y-4">
            <h1 className="text-5xl">{decodeURIComponent(game_name)} Stats</h1>
            <Input onKeyDown={handleKeyDown} type="text" name="Username" placeholder="Enter Username" className="w-fit h-fit mx-auto rounded-2xl text-3xl p-3" autoComplete="off"  />
        </div>
    );

}

export default UsernameEntry;