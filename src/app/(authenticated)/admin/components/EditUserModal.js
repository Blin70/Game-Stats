"use client"

import { adminUpdateUser } from "@/app/utils/server-actions/adminActions";
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

    const onUserSubmit = async (values) => {
        const update = {
            ...(values.email !== user.email && { email: values.email }),
            ...(values.emailConfirmed !== user.email_confirmed && { email_confirm: values.emailConfirmed }),
            ...(values.name !== user.name && { user_metadata: { first_name: values.name } }),
            ...(values.phone !== user.phone && { phone: values.phone }),
            ...(values.phoneConfirmed !== user.phone_confirmed && { phone_confirm: values.phoneConfirmed }),
        }

        if(Object.keys(update).length === 0) return;

        const res = await adminUpdateUser(update, user.id);
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);

        if(res.error) return;

        setIsOpen(false);
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

    const onSensitiveDataSubmit = async (values) => {
        const update = {
            ...(values.password !== '' && { password: values.password }),
            ...(values.role !== user.role && { role: values.role })
        }

        if(Object.keys(update).length === 0) return;

        const res = await adminUpdateUser(update, user.id)
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);

        if(res.error) return;

        setIsOpen(false);
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