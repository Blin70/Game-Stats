"use client"

import { Button } from "@/components/ui/button"
import { refreshPlayerData } from "@/app/utils/external-apis/externalApi";


const RefreshStatsBtn = () => {

    const handleClick = async () => {
        await refreshPlayerData();
    }

    return(
        <Button onClick={handleClick} className="transition-transform duration-75 active:scale-95">
            Refresh Stats
        </Button>
    );
}

export default RefreshStatsBtn;