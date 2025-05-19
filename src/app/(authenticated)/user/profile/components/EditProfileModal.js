import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";
import { Button } from "@/components/ui/button";


const EditProfileModal = () => {
    return(
        <Dialog>
            <DialogTrigger asChild className="float-right mr-5">
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Account</DialogTitle>
                    <DialogDescription>
                        Make changes to your account here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <EditProfileForm />
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileModal;