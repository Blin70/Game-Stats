"use client"

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


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

    const handleUpdateUserDetails = async () => {
        let shouldRevalidate = false;

        if(userData.email != user.email){
            const res = await AdminUpdateEmail(user, userData.email);
            if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            shouldRevalidate = true;
        }

        if(userData.name != user.name){
            if(userData.name.length < 3){
                setUserData(prevInfo => ({
                    ...prevInfo,
                    name: user.name
                }));
                toast.error('The users name has to be longer than 3 characters')
                return;
            };      

            const res = await AdminUpdateName(user, userData.name);
            if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            shouldRevalidate = true;
        }

        if(userData.phone != user.phone){
            const res = await AdminUpdatePhone(user, userData.phone);
            if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            shouldRevalidate = true;
        }

        if(user.email_confirmed != userData.emailConfirmed){
            if(user.email_confirmed === false && userData.emailConfirmed === true){
                const res = await ConfirmEmailorPhone(user, 'email');
                if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }else{
                const res = await UnconfirmEmailorPhone(user, 'email');
                if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }
            shouldRevalidate = true;
        }

        if(user.phone_confirmed != userData.phoneConfirmed){
            if(user.phone_confirmed === false && userData.phoneConfirmed === true){
                const res = await ConfirmEmailorPhone(user, 'phone');
                if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }else{
                const res = await UnconfirmEmailorPhone(user, 'phone');
                if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }
            shouldRevalidate = true;
        }

        if(shouldRevalidate){
            toast.success('User updated successfully')
            revalidatePage()
        }
    }


    const handleSaveSensitiveData = async () => {
        let shouldRevalidate = false;

        if(userData.password != ''){
            const res = await AdminUpdatePassword(user, userData.password);
            if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            setUserData(prevInfo => ({
                ...prevInfo,
                password: ''
            }));
            shouldRevalidate = true;
        }
        
        if(user.role != userData.role){
            const res = await AdminUpdateRole(user, userData.role);
            if(res) toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            shouldRevalidate = true;
        }

        if(shouldRevalidate){
            toast.success('User updated successfully');
            revalidatePage()
        } 
    }

    const userFields = [
        { name: 'email', checkbox: true },
        { name: 'name', checkbox: false },
        { name: 'phone', checkbox: true },
    ]

    const sensitiveFields = [
        { name: 'password', checkbox: false },
        { name: 'role', checkbox: false },
    ]

    const renderedFields = (fields) => fields.map((field, index) => (
        <div key={index} className="my-2">
            <label htmlFor={field.name} className="capitalize">{field.name}</label>
            <div className={`grid grid-cols-${fields === sensitiveFields ? '[60%,40%]' : '[65%,35%]'} ${field.checkbox && 'gap-10'}`}>
                <Input onChange={handleChange} value={userData[field.name]} id={field.name} name={field.name} {...field.name === 'password' && { placeholder:"[Encrypted]" }} autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                {field.checkbox && (
                    <div className="flex gap-2 items-center">
                        <Input onChange={handleChange} checked={userData[field.name + 'Confirmed']} type="checkbox" id={field.name + 'Confirmed'} name={field.name + 'Confirmed'} autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <span className="text-xs text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0">Confirm {field.name}</span>
                    </div>
                )}
            </div>
        </div>
    ))

    return(
        <Dialog>
            <DialogTrigger className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UserRoundPen/> Edit User
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="bg-transparent [&>button]:hidden border-0 shadow-none">
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
                                {renderedFields(userFields)}
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
                                {renderedFields(sensitiveFields)}
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