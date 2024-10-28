import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { CurrentlySupportedGames } from "../../SupportedGames/page";
import { DeleteAccountModal } from "@/app/utils/auth/EditInfo";
import { ResetPasswordModal } from "@/app/utils/auth/EditInfo";


const Settings = () => {

  const renderedGameOptions = CurrentlySupportedGames.map((game) => {
    return(
      <SelectItem key={game.name} value={game.name}>{game.name}</SelectItem>
    );
  })

  return(
    <div className="pl-2 space-y-10">
        <h1 className="text-4xl font-bold" >Account Settings</h1>
        
        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Privacy Settings</h1>
          <div className="p-6 ml-2 bg-gray-100 rounded-lg">
            <span className="text-lg font-medium">Make Profile Public</span>
            <Input type='checkbox' className="size-8 float-right text-gray-300 accent-zinc-900"/>
          </div>
        </section>

        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Notification Settings</h1>
          <div className="p-6 ml-2 bg-gray-100 rounded-lg">
            <span className="text-lg font-medium">Email Notifications</span>
            <Input type='checkbox' className="size-8 float-right accent-zinc-900"/>
          </div>
        </section>

        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Linked Accounts</h1>
          <div className="text-2xl font-semibold bg-gray-100 rounded-lg p-6">
            <div className="grid grid-cols-[20%,40%,15%] gap-5">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Game"/>
                </SelectTrigger>
                <SelectContent>
                  {renderedGameOptions}
                </SelectContent>
              </Select>
              <Input placeholder="Enter your game username" className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0" />
              <Button>Link Account</Button>
            </div>
            <p className="text-sm text-gray-500 mt-4 w-fit mx-auto">You can link your account to avoid searching for your stats each time.</p>
          </div>
        </section>

        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Security Settings</h1>
          <div className="p-6 ml-2 bg-gray-100 rounded-lg">
            <span className="text-lg font-medium">Enable Two-Factor Authentication</span>
            <Input type='checkbox' className="size-8 float-right accent-zinc-900"/>
            <ResetPasswordModal />
          </div>
        </section>

        <Separator />

        <section className="text-center">
          <h1 className="text-red-500 text-2xl font-bold -mt-3">Danger Zone</h1>
          <p className="text-sm text-gray-600">Deleting your account is permanent and cannot be undone.</p>
          <DeleteAccountModal />
        </section>
    </div>
  );
}

export default Settings;