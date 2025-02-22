"use client"

import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { deleteOwnAccount, signOut } from "@/app/utils/server-actions/AuthActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";


const DeleteAccountModal = () => {
    const { user: { id } } = useUser();

    const handleDeleteAccount = async () => {
        const res = await deleteOwnAccount(id);
        await signOut();
        window.localStorage.clear();
        
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
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