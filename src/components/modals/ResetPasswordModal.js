"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPassword } from "@/app/utils/server-actions/AuthActions";


const ResetPasswordModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openReqSent, setOpenReqSent] = useState(false);

    const handleResetClick = async () => {
        setOpenReqSent(true);
        resetPassword(`${window.location.protocol}//${window.location.host}`);
    }

    return (
        <>
            {openModal 
                && (
                    <div onClick={()=>{setOpenModal(false);setOpenReqSent(false)}} className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
                            <Card onClick={(e)=>e.stopPropagation()} className="h-fit w-fit text-center rounded-3xl space-y-10 bg-[#474748] border-0">
                                <CardHeader>
                                    <CardTitle className="text-5xl font-medium">Reset Password</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-10">
                                    {openReqSent
                                        ? (
                                                <h2 className="text-3xl">A password reset link has been sent to your email</h2>
                                        )
                                        : (
                                                <h2 className="text-3xl">Are you sure you want to reset your password?</h2>
                                        )
                                    }
                                </CardContent>
                                <CardFooter className="justify-center space-x-2">
                                    {openReqSent
                                        ?(
                                                <Button onClick={()=>{setOpenModal(false);setOpenReqSent(false)}} className="py-6 px-8 rounded-3xl text-xl">Alright</Button>
                                        )
                                        :(
                                            <>
                                                <Button onClick={handleResetClick} className="py-6 px-8 rounded-3xl text-xl">Reset</Button>
                                                <Button onClick={()=>setOpenModal(false)} className="py-6 px-8 rounded-3xl text-xl bg-zinc-800" >Cancel</Button>
                                            </>
                                        )
                                    }
                                </CardFooter>
                            </Card>
                        </div>
                    )
            }
            <Button onClick={()=>setOpenModal(true)} className="block mt-5 mx-auto">Change Password</Button>
        </>
    );
}

export default ResetPasswordModal;