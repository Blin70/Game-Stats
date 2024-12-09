"use client"

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";


const EditUserInfo = ({ user, revalidatePage, AdminUpdateEmail, AdminUpdateName, AdminUpdatePhone, AdminUpdatePassword, AdminUpdateRole, ConfirmEmailorPhone, UnconfirmEmailorPhone }) => {
    const [userData, setUserData] = useState({
        email: user.email,
        emailConfirmed: user.email_confirmed,
        name: user.name || '' ,
        phone: user.phone || '',
        phoneConfirmed: user.phone_confirmed,
        password: '',
        role: user.role
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevInfo => ({
            ...prevInfo,
            [name]: (type === "checkbox" ? checked : value)
        }));
    }

    const handleUpdateUserDetails = () => {
        let shouldRevalidate = false;

        if(userData.email != user.email){
            AdminUpdateEmail(user, userData.email)
            shouldRevalidate = true;
        }

        if(userData.name != user.name){
            if(userData.name.length<3){         //the name Has to be longer than 3 (As defined in supabase)
                setUserData(prevInfo => ({
                    ...prevInfo,
                    name: user.name
                }));
                return;
            };      

            AdminUpdateName(user, userData.name)
            shouldRevalidate = true;
        }

        if(userData.phone != user.phone){
            AdminUpdatePhone(user, userData.phone)
            shouldRevalidate = true;
        }

        if(user.email_confirmed != userData.emailConfirmed){
            if(user.email_confirmed === false && userData.emailConfirmed === true){
                ConfirmEmailorPhone(user, 'email')
            }else{
                UnconfirmEmailorPhone(user, 'email')
            }
            shouldRevalidate = true;
        }

        if(user.phone_confirmed != userData.phoneConfirmed){
            if(user.phone_confirmed === false && userData.phoneConfirmed === true){
                ConfirmEmailorPhone(user, 'phone')

            }else{
                UnconfirmEmailorPhone(user, 'phone')
            }
            shouldRevalidate = true;
        }

        if(shouldRevalidate) revalidatePage()
    }


    const handleSaveSensitiveData = () => {
        let shouldRevalidate = false;

        if(userData.password != ''){
            AdminUpdatePassword(user, userData.password)
            setUserData(prevInfo => ({
                ...prevInfo,
                password: ''
            }));
            shouldRevalidate = true;
        }
        
        if(user.role != userData.role){
            AdminUpdateRole(user, userData.role)
            shouldRevalidate = true;
        }

        if(shouldRevalidate) revalidatePage()
    }

    return(
        <Dialog>
            <DialogTrigger className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UserRoundPen/> Edit User
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="bg-transparent [&>button]:hidden border-0 shadow-none ">
                <DialogTitle className="hidden">Update User</DialogTitle>
                <Tabs defaultValue="user">
                    <TabsList className="w-full grid grid-cols-2 shadow-lg">
                        <TabsTrigger value="user" className="focus-visible:ring-0 focus-visible:ring-offset-0">User</TabsTrigger>
                        <TabsTrigger value="sensitive-data" className="focus-visible:ring-0 focus-visible:ring-offset-0">Sensitive Data</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>User Account</CardTitle>
                                <CardDescription>Make changes to the users account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="my-2">
                                    <label htmlFor="email">Email</label>
                                    <div className="grid grid-cols-[65%,35%] gap-10">
                                        <Input onChange={handleChange} value={userData.email} id="email" name="email" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <div className="flex gap-2 items-center">
                                            <Input onChange={handleChange} checked={userData.emailConfirmed} type="checkbox" id="emailConfirmed" name="emailConfirmed" autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            <span className="text-xs text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0">Confirm email</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="name">Name</label>
                                    <div className="grid grid-cols-[65%,35%]">
                                        <Input onChange={handleChange} value={userData.name} id="name" name="name" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    </div>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="phone">Phone</label>
                                    <div className="grid grid-cols-[65%,35%] gap-10">
                                        <Input onChange={handleChange} value={userData.phone} id="phone" name="phone" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <div className="flex gap-2 items-center">
                                            <Input onChange={handleChange} checked={userData.phoneConfirmed} type="checkbox" id="phoneConfirmed" name="phoneConfirmed" autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            <span className="text-xs text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0">Confirm phone</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <DialogClose asChild>
                                    <Button onClick={handleUpdateUserDetails}>Save changes</Button>
                                </DialogClose>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sensitive-data">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>Sensitive User Data</CardTitle>
                                <CardDescription>Make changes to the users account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="my-2">
                                    <label htmlFor="password">Password</label>
                                    <div className="grid grid-cols-[60%,40%]">
                                        <Input onChange={handleChange} value={userData.password} id="password" name="password" placeholder="[Encrypted]" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    </div>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="role">Role</label>
                                    <div className="grid grid-cols-[60%,40%]">
                                        <Input onChange={handleChange} value={userData.role} id="role" name="role" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <DialogClose asChild>
                                    <Button onClick={handleSaveSensitiveData}>Save changes</Button>
                                </DialogClose>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

export default EditUserInfo;