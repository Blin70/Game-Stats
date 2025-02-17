"use client"

import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "@/app/utils/server-actions/AuthActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";


const ResetPasswordModal = () => {
    const { user: { email, id } } = useUser();

    const handleResetClick = async () => {
        const res = await sendPasswordResetEmail(`${window.location.protocol}//${window.location.host}`, email, id);
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

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
                    <DialogClose asChild>
                        <Button onClick={handleResetClick}>Reset</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordModal;