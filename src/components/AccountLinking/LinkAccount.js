"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkAccount as Link } from "@/app/utils/server-actions/linkingActions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"


const LinkAccount = ({ CurrentlySupportedGames }) => {

  const renderedGameOptions = CurrentlySupportedGames.map((game) => {
    return(
      <SelectItem key={game.name} value={game.name}>{game.name}</SelectItem>
    );
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await Link(formData);

    toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
  }

  return(
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">Linked Accounts</h1>
      <div className="text-2xl font-semibold bg-gray-100 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-[20%,40%,15%] gap-5">
          <Select name="SelectedGame">
            <SelectTrigger>
              <SelectValue placeholder="Select Game"/>
            </SelectTrigger>
            <SelectContent>
              {renderedGameOptions}
            </SelectContent>
          </Select>
          <Input placeholder="Enter your game username" name="username" id="username" autoComplete='off' className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0" />
          <Button type="submit">Link Account</Button>
        </form>
        <p className="text-sm text-gray-500 mt-4 w-fit mx-auto">You can link your account to avoid searching for your stats each time.</p>
      </div>
    </section>
  )
}

export default LinkAccount;