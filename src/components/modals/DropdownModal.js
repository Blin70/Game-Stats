"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";

const DropdownModal = ({ children, triggerIcon, triggerText, triggerStyle, title, action, actionText, actionType, buttonVariant, user }) => {

    const handleActionClick = () => {
        switch(actionType){
            case 'ban':
                const inputValue = document.getElementById('ban-duration')?.value;
                if(!inputValue.trim() || /[a-zA-Z]/.test(inputValue) && inputValue != 'none'){      //Doenst include whitespaces, letters, and it isnt 'none'
                    console.log("Invalid Input. Enter a valid ban duration or 'none' to remove the ban") //should be a toaster
                    return;
                }
                action(user, inputValue);
                break;
            case 'delete':
                action(user);
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