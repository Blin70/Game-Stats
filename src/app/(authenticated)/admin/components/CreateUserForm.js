"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { adminCreateUser } from "@/app/utils/server-actions/adminActions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    emailConfirmed: z.boolean(),
    name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters.').max(25, 'Name must not be longer than 25 characters.'),
    password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters.'),
    phone: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^\+?\d{10,15}$/, "Invalid phone number format")
        .nullish()
        .or(z.literal("")),
    phoneConfirmed: z.boolean(),
    role: z.string().nonempty('Role is required')
}).refine((data) => !(data.phoneConfirmed && !data.phone), {
    message: 'Provide a phone number to confirm',
    path: ['phone']
})


const CreateUserForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            emailConfirmed: false,
            name: '',
            password: '',
            phone: '',
            phoneConfirmed: false,
            role: 'authenticated'
        }
    })

    const onSubmit = async (userData) => {
        const res = await adminCreateUser(userData);

        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    const renderedFields = [
        { name: 'email', checkbox: true },
        { name: 'name' },
        { name: 'password', type: 'password' },
        { name: 'phone', checkbox: true },
        { name: 'role' }
    ].map((fieldConfig, index) => (
        <div key={index} className="grid grid-cols-[65%,35%] gap-2">
            <FormField
              control={form.control}
              name={fieldConfig.name}
              render={({field}) => (
                <FormItem>
                    <FormLabel className="capitalize">{field.name}</FormLabel>
                    <FormControl>
                        <Input name={field.name} type={fieldConfig.type || 'text'} {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
            {fieldConfig.checkbox && (
                <FormField
                  control={form.control}
                  name={fieldConfig.name + 'Confirmed'}
                  render={({field}) => (
                    <FormItem className="flex mt-9 justify-center space-x-2">
                        <FormControl>
                            <Input type="checkbox" name={field.name} {...field} className="size-7 accent-black outline-none"/>
                        </FormControl>
                        <FormLabel className="text-xs !mt-1.5 text-muted-foreground">Confirm {fieldConfig.name}</FormLabel>
                    </FormItem>
                  )}
                />
            )}
        </div>
    ))


    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                {renderedFields}
                <DialogFooter className="float-start !mt-5">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create user</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default CreateUserForm;