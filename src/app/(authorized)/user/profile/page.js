import EditProfileModal from "./components/EditProfileModal";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/app/utils/server-actions/userActions";
import LinkedAccounts from "./components/LinkedAccounts";
import ProfileImage from "./components/ProfileImage";

const Profile = async () => {
  const user = await getCurrentUser();
  
  const renderedInfo = [
    { text:'Name', info: user.user_metadata.first_name },
    { text:'Email', info: user.email },
    { text:'Phone', info: user.phone || 'No number added' }
  ].map((i, index) => {
      return (
        <div key={index}>
          <span className="text-lg text-grayed-out">{i.text}</span>
          <h1 className="text-xl ml-1 font-bold">{i.info}</h1>
        </div>
      );
    });
    
    return (
      <div className="pl-2">
        <div className="w-full h-fit mt-5 mx-auto text-center">
            <ProfileImage user={user} />
            <h1 className="text-4xl font-bold pt-5">{user.user_metadata.first_name}</h1>
            <h1 className="text-grayed-out text-lg pt-3">Joined {user.created_at.slice(0,10)}</h1>
        </div>
        <Separator className='mt-12 mb-5'/>
        <div className="mb-12">
          <h1 className="text-2xl font-bold">User Information</h1>
          <div className="grid grid-cols-3 m-5 p-5 bg-panel shadow-md rounded-lg">
            {renderedInfo}
          </div>
          <EditProfileModal />
        </div>
        <h1 className="text-2xl font-bold">Linked Accounts</h1>
        <LinkedAccounts />
      </div>
    );
}

export default Profile;