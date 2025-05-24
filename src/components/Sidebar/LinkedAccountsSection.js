"use client"

import { useLinkedAccounts } from "@/app/context/linkedAccountsContext";
import { CommandGroup } from "@/components/ui/command";
import CommandItems from "./CommandItems";
import Image from "next/image";
import Link from "next/link";


const LinkedAccountsSection = () => {
  const { linkedAccounts } = useLinkedAccounts();
    
    const renderedLinkedAccounts = linkedAccounts.filter(account => !account.games.deprecated).map((account) => (
      <Link key={account.id} href={`/games/${account.games.alias}/${account.platform}/${account.in_game_username}`}>
        <CommandItems href={`/games/${account.games.alias}/${account.platform}/${account.in_game_username}`} text={account.in_game_username} icon={<Image src={account.games.icon_url} width={36} height={36} alt={`${account.game_name} Logo`} className="size-9 mr-3 rounded-full" />} className="grayscale hover:!grayscale-0 data-[active=true]:grayscale-0 group-hover:grayscale" />
      </Link>
    ))

    return (
      <>
        {linkedAccounts.length > 0 && (
          <CommandGroup heading="Linked Accounts" className="group">
            {renderedLinkedAccounts}
          </CommandGroup>
        )}
      </>
    );
}

export default LinkedAccountsSection;