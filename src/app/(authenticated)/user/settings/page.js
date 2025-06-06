import ResetPasswordModal from "./components/ResetPasswordModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import { getCurrentlySupportedGames } from "@/app/utils/server-actions/gameActions";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import LinkAccountForm from "./components/LinkAccountForm";


const Settings = async () => {

  return(
    <div className="pl-2 space-y-10">
        <h1 className="text-4xl font-bold" >Account Settings</h1>
        
        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Privacy Settings</h1>
          <div className="p-6 ml-2 bg-panel rounded-lg">
            <span className="text-lg font-medium">Make Profile Public</span>
            <Input type='checkbox' name="PublicProfile_checkbox" id="PublicProfile_checkbox" className="size-8 float-right accent-zinc-900"/>
          </div>
        </section>

        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Notification Settings</h1>
          <div className="p-6 ml-2 bg-panel rounded-lg">
            <span className="text-lg font-medium">Email Notifications</span>
            <Input type='checkbox' name="EmailNotif_checkbox" id="EmailNotif_checkbox" className="size-8 float-right accent-zinc-900"/>
          </div>
        </section>

       <LinkAccountForm currentlySupportedGames={await getCurrentlySupportedGames()} />

        <section className="space-y-5">
          <h1 className="text-2xl font-semibold">Security Settings</h1>
          <div className="p-6 ml-2 bg-panel rounded-lg">
            <span className="text-lg font-medium">Enable Two-Factor Authentication</span>
            <Input type='checkbox' name="TWOFA_checkbox" id="TWOFA_checkbox" className="size-8 float-right accent-zinc-900"/>
            <ResetPasswordModal />
          </div>
        </section>

        <Separator />

        <section className="text-center">
          <h1 className="text-red-500 text-2xl font-bold -mt-3">Danger Zone</h1>
          <p className="text-sm text-grayed-out">Deleting your account is permanent and cannot be undone.</p>
          <DeleteAccountModal />
        </section>
    </div>
  );
}

export default Settings;