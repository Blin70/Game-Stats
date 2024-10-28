'use client';

import { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { resetPassword } from "./AuthActions";
import { deleteOwnAccount } from "./AuthActions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";


const ResetPasswordModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openReqSent, setOpenReqSent] = useState(false);

    const handleResetClick = async () => {
        setOpenReqSent(true);
        resetPassword(`${window.location.protocol}//${window.location.host}`);
    }

    return (
        <>
            {
                openModal 
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

const DeleteAccountModal = () => {
    const { user } = useUser();
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteAccount = async () => {
        await deleteOwnAccount(user.id)
        window.localStorage.clear();
    }

    return (
        <>
            {
                openModal 
                && (
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

const EditProfileModal = () => {
    const router = useRouter();
    const { user, fetchUserData } = useUser();
    const supabase = createClient();
    const [openModal, setOpenModal] = useState(false);
    const [info, setInfo] = useState({
        name: user?.user_metadata?.first_name,
        email: user?.email,
        phone: user?.phone || '',
      });

      const handleChange = (e) => {             //the user info in the modal that may have changed
        const { name, value } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,                        // sets the new value of the inputs on the modal, has a base of the old values from context
            [name]: value
        }));
      };

    const handleAccChanges = async () => {
        if(info.name != user.user_metadata.first_name || info.email != user.email){
            if(info.name != user.user_metadata.first_name && info.email === user.email){
                const { data, error } = await supabase.auth.updateUser({
                    data: { first_name: info.name }
                })

                if(error) console.error("Error updating the name of the user: ", error);
                if(data){
                    fetchUserData();
                    setOpenModal(false);
                }
            }
            if(info.name === user.user_metadata.first_name && info.email != user.email){
                const { data, error } = await supabase.auth.updateUser({
                    email: info.email
                })

                if(error) console.error("Error updating the email of the user: ", error);
                if(data){
                    fetchUserData();
                    setOpenModal(false);
                    //ADD ALERT TO TELL THE USER TO CHECK HIS EMAIL FOR THE USER EMAIL CHANGE CONFIRMATION.
                }
            }
        }
    }

    const handlePhoneChange = async () => {
        if(info.phone != user.phone && info.phone != ''){     //add the (z) defination field.
            const { data, error } = await supabase.auth.updateUser({
                phone: info.phone
            })

            if(error) console.error("Error updating the phone number of the user: ", error);
            if(data){
                fetchUserData();
                setOpenModal(false);
            }
        } 
    }


            // WHEN YOU IMPLEMENT DARK MODE, JUST ADD THE CLASSNAME "dark" TO 'Tabs' IF THE USER HAS DARKMODE TURNED ON.
    return (
        <>
            {
                openModal 
                && (
                    <div onClick={()=>setOpenModal(false)} className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                        <div onClick={(e)=>e.stopPropagation()} className="h-fit w-fit rounded-3xl p-0.5 pt-11">
                            <Tabs defaultValue="account" className="w-[450px]">
                                <TabsList className="grid w-full grid-cols-2 shadow-lg">
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="phone">Phone</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account" className="focus-visible:ring-0 focus-visible:ring-offset-0" >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Account</CardTitle>
                                            <CardDescription>
                                                Make changes to your account here. Click save when youre done.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <label htmlFor="name">Name</label>
                                                <Input onChange={handleChange} id="name" name="name" value={info.name} autoComplete="off"  />
                                            </div>
                                            <div className="space-y-1">
                                                <label htmlFor="email">Email</label>
                                                <Input onChange={handleChange} id="email" name="email" value={info.email} autoComplete="off"  />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button onClick={handleAccChanges}>Save changes</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="phone" className="focus-visible:ring-0 focus-visible:ring-offset-0" >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Phone</CardTitle>
                                            <CardDescription>
                                                Change your phone number.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-1">
                                                <label htmlFor="phone">Phone</label>
                                                <Input onChange={handleChange} id="phone" name="phone" type="text" value={info.phone} autoComplete="off" />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button onClick={handlePhoneChange}>Save phone number</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                )
            }
            <Button onClick={()=>setOpenModal(true)} className="float-right mr-5">Edit Profile</Button>
        </>
    );
}


export default EditProfileModal;
export { ResetPasswordModal, DeleteAccountModal };