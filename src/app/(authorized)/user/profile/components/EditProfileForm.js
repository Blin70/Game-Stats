"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateProfile } from "@/app/utils/server-actions/userActions";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters.').max(25, 'Name must not be longer than 25 characters.'),
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    phone: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^\+?\d{10,15}$/, "Invalid phone number format")
        .nullish()
        .or(z.literal(""))
})

const EditProfileForm = () => {
    const { user, setUser } = useUser();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.user_metadata?.first_name,
            email: user?.email,
            phone: user?.phone
        }
    })

    const onSubmit = async (values) => {
        const update = {
            ...(values.name !== user.user_metadata.first_name && { data: { first_name: values.name } }),
            ...(values.email !== user.email && { email: values.email }),
            ...(values.phone !== user.phone && { phone: values.phone })
        }

        if(Object.keys(update).length === 0) return;

        const res = await updateProfile(update, user.id);
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);

        if(res.error) return;

        setUser(res.user);
    }

    const renderedFields = [
        { name: 'name' },
        { name: 'email' },
        { name: 'phone' },
    ].map((fieldConfig, index) => (
        <FormField 
          key={index}
          control={form.control}
          name={fieldConfig.name}
          render={({field}) => (
            <FormItem>
                <FormLabel className="capitalize">{fieldConfig.name}</FormLabel>
                <FormControl>
                    <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
    ))

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                {renderedFields}
                <DialogFooter className="float-start !mt-5">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default EditProfileForm;