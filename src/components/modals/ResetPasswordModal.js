"use client"

import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/app/utils/server-actions/AuthActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";


const ResetPasswordModal = () => {  //ADD POPUP THAT SAYS "YOUR PASSWORD RESET LINK HAS BEEN SENT TO YOUR EMAIL"
    const { user: { email } } = useUser();

    const handleResetClick = async () => resetPassword(`${window.location.protocol}//${window.location.host}`, email);

    return(
        <Dialog>
            <DialogTrigger asChild className="block mt-5 mx-auto">
                <Button>Change Password</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to reset your password?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleResetClick}>Reset</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordModal;