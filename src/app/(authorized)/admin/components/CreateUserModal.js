import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from 'lucide-react';
import CreateUserForm from "./CreateUserForm";
import { Button } from "@/components/ui/button";


const CreateUserModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className="bg-transparent hover:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0">
                    <UserPlus className="text-secondary-foreground !size-6"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create New User</DialogTitle>
                    <DialogDescription>Add a new user</DialogDescription>
                </DialogHeader>
                <CreateUserForm />
            </DialogContent>
        </Dialog>
    );
}

export default CreateUserModal;