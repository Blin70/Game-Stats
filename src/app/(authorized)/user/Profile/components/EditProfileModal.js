'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { createClient } from "@/app/utils/supabase/client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { sendNotification } from "@/app/utils/server-actions/notificationActions";


const EditProfileModal = () => {
    const router = useRouter();
    const { user, fetchUserData } = useUser();
    const [isOpen, setIsOpen] = useState(false)
    const supabase = createClient();
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
            let emailChanged = false;
            if(info.name != user.user_metadata.first_name){
                if(info.name.length < 3){
                    toast.error('Your name has to be longer than 3 characters')
                    return;
                }
                
                const { error } = await supabase.auth.updateUser({
                    data: { first_name: info.name }
                })

                if(error){
                    console.error("[EditInfo] Supabase error updating the name of the user: ", error);
                    toast.error('Error while updating name. Please try again later');
                    return;
                }

                router.refresh()
            }

            if(info.email != user.email){
                const { error } = await supabase.auth.updateUser({
                    email: info.email
                })

                if(error){
                    console.error("[EditInfo] Supabase error updating the email of the user: ", error);
                    toast.error('Error while updating email. Please try again later')
                    return;
                } 

                router.refresh()
                emailChanged = true;
                sendNotification(user.id, 'System', 'Email Update Initiated', `We've registered your request to update your email address from ${user.email} to ${info.email}. A reset link has been sent to ${info.email} for you to finalize the change. If you did not initiate this request, we recommend that you change your password immediately.`);
            }
            fetchUserData();
            setIsOpen(false);
            toast.success(emailChanged ? 'Account updated successfully. Please check your email to confirm email change' : 'Account updated successfully');
        }
    }

    const handlePhoneChange = async () => {
        if(info.phone != user.phone && info.phone != ''){
            const { error } = await supabase.auth.updateUser({
                phone: info.phone
            })

            if(error){
                console.error("[EditInfo] Supabase error updating the phone number of the user: ", error);
                toast.error('Error while updating phone number')
                return;
            } 
            
            fetchUserData();
            router.refresh()
            toast.success('Account updated successfully');
        } 
    }

    const accountFields = [
        { name: 'name', inputType: 'text' },
        { name: 'email', inputType: 'text' },
    ]

    const phoneField = [
        { name: 'phone' , inputType: 'number'}
    ]

    const renderedFields = (fields) => fields.map((field, index) => (
        <div key={index} className="space-y-1">
            <label htmlFor={field.name} className="capitalize">{field.name}</label>
            <Input onChange={handleChange} id={field.name} name={field.name} type={field.inputType} value={info[field.name]} autoComplete="off" {...field.inputType === 'number' && { className: '[appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden'}} />
        </div>
    ))

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="float-right mr-5">
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="bg-transparent [&>button]:hidden border-0 shadow-none">
                <DialogTitle className="hidden">Update Account</DialogTitle>
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-2 shadow-lg">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="focus-visible:ring-0 focus-visible:ring-offset-0" >
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you&apos;re done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {renderedFields(accountFields)}
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
                                {renderedFields(phoneField)}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handlePhoneChange}>Save phone number</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfileModal;