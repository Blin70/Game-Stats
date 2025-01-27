"use client"

import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { deleteOwnAccount } from "@/app/utils/server-actions/AuthActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";


const DeleteAccountModal = () => {
    const { user: { id } } = useUser();

    const handleDeleteAccount = async () => {
        await deleteOwnAccount(id)
        window.localStorage.clear();
    }

    return(
        <Dialog>
            <DialogTrigger asChild className="mt-6">
                <Button variant="destructive" className="p-5">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your account? This action is irreversible
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeleteAccount}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteAccountModal;