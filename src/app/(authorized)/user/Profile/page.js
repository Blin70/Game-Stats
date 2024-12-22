import Link from "next/link";
import Image from "next/image";
import EditProfileModal from "@/components/modals/EditInfo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { createClient } from "@/app/utils/supabase/server";
import { UnlinkAccount } from "@/app/utils/server-actions/linkingActions";
import { getCurrentUser } from "@/app/utils/server-actions/userActions";

const Profile = async () => {
  const supabase = createClient();
  const user = await getCurrentUser();

  const LinkedAccounts = async () => {
    const { data, error } = await supabase.from('linkedAccounts').select('*,games:game_name(icon_url)').eq('user_id', user.id);

    if(error){
      console.error('Error while getting Linked Accounts', error)
      return [];
    }

    return data;
  }

  const linkedAccounts = await LinkedAccounts();
  
  const renderedLinkedAccounts = linkedAccounts.map((i, index) => (
    <div key={index} className="max-w-2xl w-5/12 justify-between items-center flex rounded-lg p-4 m-4 bg-gray-100 shadow-md">
      <div className="flex items-center space-x-4">
        <Image src={i.games.icon_url} width='70' height='70' alt="Game Icon" className="rounded-full" />

        <div>
          <h2 className="text-2xl font-semibold ">{i.game_name}</h2>
          <h2 className="text-md">Username: {i.in_game_username}</h2>
        </div>
      </div>
      
      <div className="h-full flex flex-col justify-between">
        <p className="text-sm text-gray-500">Linked on: {i.linked_at.slice(0,10)}</p>
        <form action={UnlinkAccount} className="flex flex-col">
          <input type="hidden" name="linkedAccountId" value={i.id} />
          <Button type="submit" variant="outline" className="w-fit h-8 ml-auto">Unlink</Button>
        </form>
      </div>
    </div>
  ));
  
  const renderedInfo = [
    { text:'Name', info: user.user_metadata.first_name },
    { text:'Email', info: user.email },
    { text:'Phone', info: user.phone || 'No number added' }
  ].map((i, index) => {
      return (
        <div key={index}>
          <span className="text-lg text-gray-500">{i.text}</span>
          <h1 className="text-xl ml-1 font-bold">{i.info}</h1>
        </div>
      );
    });
    
    return (
      <div className="pl-2">
        <div className="w-full h-fit mt-5 mx-auto text-center">
            <Image className="size-48 mx-auto cursor-pointer" alt="Profile" src={defaultProfilePic} priority />
            <h1 className="text-4xl font-bold pt-5">{user.user_metadata.first_name}</h1>
            <h1 className="text-gray-500 text-lg pt-3">Joined {user.created_at.slice(0,10)}</h1>
        </div>
        <Separator className='mt-12 mb-5'/>
        <div className="mb-12">
          <h1 className="text-2xl font-bold">User Information</h1>
          <div className="grid grid-cols-3 m-5 p-5 bg-gray-100 shadow-md rounded-lg">
            {renderedInfo}
          </div>
          <EditProfileModal />
        </div>
          <h1 className="text-2xl font-bold">Linked Accounts</h1>
          <div className="w-full justify-center flex flex-wrap">
            {linkedAccounts.length > 0
             ? (
              renderedLinkedAccounts
              )
              : (
                  <div className="m-5 p-5 w-full bg-gray-100 shadow-md rounded-lg text-center">
                    <h1 className="text-gray-500">You havent linked any game accounts yet</h1>
                    <Link href="/user/Settings">
                      <Button className="mt-5">Link a Game Account</Button>
                    </Link>
                  </div>
              )
            }
          </div>  
      </div>
    );
}

export default Profile;