"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DropdownModal = ({ children, triggerIcon, triggerText, triggerStyle, title, action, actionText, actionType, buttonVariant, user }) => {

    const handleActionClick = async () => {
        switch(actionType){
            case 'ban':
                const inputValue = document.getElementById('ban-duration')?.value;
                if(!inputValue.trim() || /[a-zA-Z]/.test(inputValue) && inputValue != 'none'){      //Doenst include whitespaces, letters, and it isnt 'none'
                    toast.error("Invalid Input. Enter a valid ban duration or 'none' to remove the ban")
                    return;
                } 
                const banRes = await action(user, inputValue);
                toast[Object.keys(banRes)[0]]?.(Object.values(banRes)[0]);
                break;
            case 'delete':
                const DeleteRes = await action(user);
                toast[Object.keys(DeleteRes)[0]]?.(Object.values(DeleteRes)[0]);
                break;
        }
    }


    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className={triggerStyle}>
                    {triggerIcon} {triggerText}
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="w-1/5">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                    <Separator />
                        {children}
                    <Separator />
                    <DialogFooter className="grid grid-cols-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>                   
                            <Button onClick={handleActionClick} variant={buttonVariant} className={`${buttonVariant=='destructive' && 'hover:bg-red-900/85'}`}>{actionText}</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DropdownModal;