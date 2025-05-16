"use client"

import { useLinkedAccounts } from "@/app/context/linkedAccountsContext";
import { UnlinkAccount } from "@/app/utils/server-actions/linkingActions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const LinkedAccounts = () => {
    const { linkedAccounts, setLinkedAccounts } = useLinkedAccounts();

    const handleUnlinkAccount = async (AccountId) => {
        const res = await UnlinkAccount(AccountId);

        if(res.success) setLinkedAccounts(prev => prev.filter(i => i.id !== AccountId));

        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    const renderedLinkedAccounts = linkedAccounts.map((i, index) => (
        <div key={index} className="max-w-2xl w-5/12 justify-between items-center flex rounded-lg p-4 m-4 bg-panel shadow-md">
             <div className="flex items-center space-x-4">
                <Image src={i.games.icon_url} width='70' height='70' alt="Game Icon" className="rounded-full" />

                <div>
                    <h2 className="text-2xl font-semibold ">{i.game_name}</h2>
                    <h2 className="text-md">Username: {i.in_game_username}</h2>
                </div>
            </div>
                
            <div className="h-full flex flex-col justify-between">
                <p className="text-sm text-grayed-out">Linked on: {i.linked_at.slice(0,10)}</p>
                <Button onClick={() => handleUnlinkAccount(i.id)} variant="outline" className="w-fit h-8 ml-auto">Unlink</Button>
            </div>
        </div>
    ));

    return (
      <div className="w-full justify-center flex flex-wrap">
        {linkedAccounts.length > 0 ? (
          renderedLinkedAccounts
        ) : (
          <div className="m-5 p-5 w-full bg-panel shadow-md rounded-lg text-center">
            <h1 className="text-grayed-out">
              You havent linked any game accounts yet
            </h1>
            <Link href="/user/settings">
              <Button className="mt-5">Link a Game Account</Button>
            </Link>
          </div>
        )}
      </div>
    );
}

export default LinkedAccounts;