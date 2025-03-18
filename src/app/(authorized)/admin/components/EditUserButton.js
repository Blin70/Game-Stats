import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleX, Pencil, Ban, Trash, TriangleAlert } from 'lucide-react';
import DropdownModal from "./DropdownModal";
import { DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import EditUserInfo from "./EditUserInfo";
import { AdminDeleteUser, AdminBanUser, AdminUpdateEmail, AdminUpdateName, AdminUpdatePhone, AdminUpdatePassword, AdminUpdateRole, ConfirmEmailorPhone, UnconfirmEmailorPhone } from "@/app/utils/server-actions/adminActions";
import { revalidatePath } from "next/cache";

const EditUserButton = ({ user }) => {

    const revalidatePage = async () => {
        "use server"

        revalidatePath("/admin");
    }

    return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" className="bg-transparent hover:bg-accent text-inherit focus-visible:ring-0 focus-visible:ring-offset-0 gap-0">
                        <Pencil className="!size-6"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <EditUserInfo user={user} revalidatePage={revalidatePage} AdminUpdateEmail={AdminUpdateEmail} AdminUpdateName={AdminUpdateName} AdminUpdatePhone={AdminUpdatePhone} AdminUpdatePassword={AdminUpdatePassword} AdminUpdateRole={AdminUpdateRole} ConfirmEmailorPhone={ConfirmEmailorPhone} UnconfirmEmailorPhone={UnconfirmEmailorPhone} /><br/>
                    <DropdownModal triggerStyle="w-full" user={user} title='Ban User' action={AdminBanUser} actionText='Ban' actionType='ban' buttonVariant='destructive' triggerText='Ban User' triggerIcon={<Ban/>}>
                            <div className="space-y-2 space-x-2 flex items-center">
                                <CircleX className="inline-block shrink-0"/>
                                <h5 className="text-sm font-medium inline-block">This will revoke the user&apos;s access and prevent the user from logging in</h5>
                            </div>
                                <DialogDescription>Set a ban duration (hours)</DialogDescription>
                            <div className="space-x-3">
                                <Input id="ban-duration" className="focus-visible:ring-0 focus-visible:ring-offset-0" autoComplete='off' />
                            </div>
                    </DropdownModal><br/>

                    <DropdownModal triggerStyle='text-red-500 focus:text-red-500' user={user} title='Delete User' action={AdminDeleteUser} actionText='Delete' actionType='delete' buttonVariant='destructive' triggerText='Delete User' triggerIcon={<Trash/>}>
                        <div className="space-y-2">
                            <TriangleAlert className="inline-block" /> 
                            <h5 className="text-sm font-medium inline-block ml-2">Deleting a user is irreversible</h5>
                            <DialogDescription>This will remove the user and all of its data.</DialogDescription>
                        </div>
                        <Separator />
                        <p className="text-sm">This is permanent! Are you sure you want to delete the user <strong className="font-extrabold">{user.email}</strong></p>
                    </DropdownModal>
                </DropdownMenuContent>
            </DropdownMenu>
    );

}

export default EditUserButton;