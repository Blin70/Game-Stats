"use client"

import { useState } from "react";
import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteOwnAccount } from "@/app/utils/server-actions/AuthActions";


const DeleteAccountModal = () => {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteAccount = async () => {
        await deleteOwnAccount(user.id)
        window.localStorage.clear();
    }

    return (
        <>
            {openModal 
                &&(
                    <div onClick={()=>setOpenModal(false)} className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
                        <Card onClick={(e)=>e.stopPropagation()} className="h-fit w-fit rounded-3xl space-y-5 bg-[#474748] border-0 ">
                            <CardHeader>
                                <CardTitle className="text-5xl font-medium">Delete Account</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <h2 className="text-3xl">Are you sure you want to delete your account?</h2>
                                <h2 className="text-3xl">This action is irreversible</h2>
                            </CardContent>
                            <CardFooter className="justify-center space-x-2">
                                <Button onClick={handleDeleteAccount} className="py-6 px-8 rounded-3xl text-xl">Delete</Button>
                                <Button onClick={()=>setOpenModal(false)} className="py-6 px-8 rounded-3xl text-xl bg-zinc-800">Cancel</Button>
                            </CardFooter>
                        </Card>
                    </div>
                )
            }
            <br/><Button onClick={()=>setOpenModal(true)} variant="destructive" className="p-5" >Delete Account</Button>
        </>
    );
}

export default DeleteAccountModal;