"use client"

import { useState, useEffect } from "react";
import { getLinkedAccounts } from "@/app/utils/server-actions/linkingActions";
import { CommandGroup } from "@/components/ui/command";
import CommandItems from "./CommandItems";
import Image from "next/image";
import Link from "next/link";


const LinkedAccountsSection = ({ userId }) => {
    const [linkedAccounts, setLinkedAccounts] = useState([]);

    useEffect(() => {
        const fetchLinkedAccounts = async () => {
            const linkedAccounts = await getLinkedAccounts(userId);
            setLinkedAccounts(linkedAccounts);
        };

        fetchLinkedAccounts();
    }, [userId])
    
    const renderedLinkedAccounts = linkedAccounts.filter((account => !account.games.deprecated)).map((account) => (
        <Link key={account.id} href={`/games/${account.games.alias}/${account.platform}/${account.in_game_username}`}>
            <CommandItems text={account.in_game_username} icon={<Image src={account.games.icon_url} width={36} height={36} alt={`${account.game_name} Logo`} className="size-9 mr-3 rounded-full" />} className={"grayscale aria-selected:grayscale-0 transition duration-500 ease-in-out"} />
        </Link>
    ))

    return (
      <>
        {linkedAccounts.length > 0 && (
          <CommandGroup heading="Linked Accounts">
            {renderedLinkedAccounts}
          </CommandGroup>
        )}
      </>
    );
}

export default LinkedAccountsSection;