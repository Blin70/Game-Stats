"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { linkAccount } from "@/app/utils/server-actions/linkingActions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getGamePlatforms } from "@/app/utils/server-actions/gameActions";
import { useState } from "react";
import { useLinkedAccounts } from "@/app/context/linkedAccountsContext";


const LinkAccountForm = ({ currentlySupportedGames }) => {
  const [availablePlatforms, setAvailablePlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const { setLinkedAccounts } = useLinkedAccounts();

  const renderedGameOptions = currentlySupportedGames.map((game) => {
    return(
      <SelectItem key={game.name} value={game.name}>{game.name}</SelectItem>
    );
  })

  const renderedPlatformOptions = availablePlatforms?.map((platform, index) => (
    <SelectItem key={index} value={platform}>{platform}</SelectItem>
  ))

  const handleGameChange = async (game) => {
    setSelectedPlatform(null);
    const gamePlatforms = await getGamePlatforms(game, 'name');

    setAvailablePlatforms(gamePlatforms.platforms);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!availablePlatforms.includes(selectedPlatform)) return toast.error('Invalid platform selected');

    const formData = new FormData(event.currentTarget);
    const res = await linkAccount(formData);

    if(res.success) setLinkedAccounts(prev => [...prev, res.account]);

    toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
  }

  return(
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">Linked Accounts</h1>
      <div className="text-2xl font-semibold bg-panel rounded-lg p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-[20%,10%,40%,15%] gap-5">
          <Select name="SelectedGame" onValueChange={handleGameChange}>
            <SelectTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select Game"/>
            </SelectTrigger>
            <SelectContent>
              {renderedGameOptions}
            </SelectContent>
          </Select>
          <Select name="SelectedPlatform" disabled={!availablePlatforms?.length} value={selectedPlatform} onValueChange={(platform) => setSelectedPlatform(platform)}>
            <SelectTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Platform"/>
            </SelectTrigger>
            <SelectContent>
              {renderedPlatformOptions}
            </SelectContent>
          </Select>
          <Input placeholder="Enter your game username" name="username" id="username" autoComplete='off' className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0" />
          <Button type="submit">Link Account</Button>
        </form>
        <p className="text-sm text-grayed-out mt-4 w-fit mx-auto">You can link your account to avoid searching for your stats each time.</p>
      </div>
    </section>
  )
}

export default LinkAccountForm;