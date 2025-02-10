"use client"

import { Button } from "@/components/ui/button"
import { refreshPlayerData } from "@/app/utils/external-apis/externalApi";


const RefreshStatsBtn = () => {

    const handleClick = async () => {
        await refreshPlayerData();
    }

    return(
        <Button onClick={handleClick}>
            Refresh Stats
        </Button>
    );
}

export default RefreshStatsBtn;