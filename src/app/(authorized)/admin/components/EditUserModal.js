"use client"

import { AdminUpdateEmail, AdminUpdateName, AdminUpdatePassword, AdminUpdatePhone, AdminUpdateRole, ConfirmEmailorPhone, UnconfirmEmailorPhone } from "@/app/utils/server-actions/adminActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserRoundPen } from "lucide-react";
import EditUserForm from "./EditUserForm";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    emailConfirmed: z.boolean(),
    name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters.').max(25, 'Name must not be longer than 25 characters.'),
    phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format")
    .nullish()
    .or(z.literal("")),
    phoneConfirmed: z.boolean(),
}).refine((data) => !(data.phoneConfirmed && !data.phone), {
    message: 'Provide a phone number to confirm',
    path: ['phone']
})

const sensitiveDataFormSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters.').nullish().or(z.literal("")),
    role: z.string().nonempty('Role is required')
})

const EditUserModal = ({ user, revalidatePage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const userDefaultValues = {
        email: user.email,
        emailConfirmed: user.email_confirmed,
        name: user.name,
        phone: user.phone || '',
        phoneConfirmed: user.phone_confirmed
    }

    const onUserSubmit = (values) => {
        if(values.email === user.email && values.name === user.name && values.phone === user.phone && values.emailConfirmed === user.email_confirmed && values.phoneConfirmed === user.phone_confirmed) return;

        if(user.email !== values.email){
            const res = AdminUpdateEmail(user, values.email);
            toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
        }

        if(user.email_confirmed !== values.emailConfirmed){
            if(!user.email_confirmed && values.emailConfirmed){
                const res = ConfirmEmailorPhone(user, 'email');
                toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }else{
                const res = UnconfirmEmailorPhone(user, 'email');
                toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }
        }

        if(user.name !== values.name){
            const res = AdminUpdateName(user, values.name);
            toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
        }

        if(user.phone !== values.phone){
            const res = AdminUpdatePhone(user, values.phone);
            toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
        }

        if(user.phone_confirmed !== values.phoneConfirmed){
            if(!user.phone_confirmed && values.phoneConfirmed){
                const res = ConfirmEmailorPhone(user, 'phone');
                toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }else{
                const res = UnconfirmEmailorPhone(user, 'phone');
                toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
            }
        }

        setIsOpen(false);
        toast.success('User updated successfully');
        revalidatePage();
    }

    const userFields = [
        { name: 'email', checkbox: true },
        { name: 'name' },
        { name: 'phone', checkbox: true }
    ]

    const sensitiveDataDefaultValues = {
        password: '',
        role: user.role
    }

    const onSensitiveDataSubmit = (values) => {
        if(values.password === '' && values.role === user.role) return;
        
        if(values.password !== ''){
            const res = AdminUpdatePassword(user, values.password);
            toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
        }
        
        if(values.role !== user.role){
            const res = AdminUpdateRole(user, values.role);
            toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
        }

        setIsOpen(false);
        toast.success('User updated successfully');
        revalidatePage();
    }
    
    const sensitiveDataFields = [
        { name: 'password', type: 'password', placeholder: '[Encrypted]' },
        { name: 'role' }
    ]
    
    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UserRoundPen /> Edit User
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="bg-transparent [&>button]:hidden border-0 shadow-none">
                <DialogTitle className="hidden">Update User</DialogTitle>
                <Tabs defaultValue="user">
                    <TabsList className="w-full grid grid-cols-2 shadow-lg">
                        <TabsTrigger value="user" className="focus-visible:ring-0 focus-visible:ring-offset-0">User</TabsTrigger>
                        <TabsTrigger value="sensitiveData" className="focus-visible:ring-0 focus-visible:ring-offset-0">Sensitive Data</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>User Account</CardTitle>
                                <CardDescription>
                                    Make changes to the users account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <EditUserForm formSchema={userFormSchema} formFields={userFields} defaultValues={userDefaultValues} onSubmit={onUserSubmit} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sensitiveData">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>Sensitive User Data</CardTitle>
                                <CardDescription>
                                    Make changes to the users account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <EditUserForm formSchema={sensitiveDataFormSchema} formFields={sensitiveDataFields} defaultValues={sensitiveDataDefaultValues} onSubmit={onSensitiveDataSubmit} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

export default EditUserModal;