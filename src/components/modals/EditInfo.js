'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


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
            if(info.name != user.user_metadata.first_name && info.email === user.email){  //first_name has to be longer than 3 characters as defined in supabase
                const { data, error } = await supabase.auth.updateUser({
                    data: { first_name: info.name }
                })

                if(error) console.error("Error updating the name of the user: ", error);
                if(data){
                    fetchUserData();
                    setOpenModal(false);
                    router.refresh()
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
                    router.refresh()
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
                router.refresh()
            }
        } 
    }


            // WHEN YOU IMPLEMENT DARK MODE, JUST ADD THE CLASSNAME "dark" TO 'Tabs' IF THE USER HAS DARKMODE TURNED ON.
    return (
        <>
            {openModal 
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