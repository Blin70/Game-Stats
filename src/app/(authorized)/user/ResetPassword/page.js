'use client'

import { changePassword } from "@/app/utils/server-actions/AuthActions";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { toast } from "sonner";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";

const formSchema = z.object({
    NewPassword: z.string().nonempty({
        message: 'Password field cannot be empty'
    }).min(8,{
        message: 'Password must be at least 8 characters.'
    }),
    repeatNewPassword: z.string().nonempty({
        message: 'Repeat password field cannot be empty'
    })
}).refine((data) => data.NewPassword === data.repeatNewPassword, {
    message: "Passwords don't match",
    path: ["repeatNewPassword"]
});

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code')
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            NewPassword: "",
            repeatNewPassword: ""
        }
    })

    if(!code){
        return router.back();
    }

    const onSubmit = async (values) => {
        const res = await changePassword(values.NewPassword) || { success: 'Password changed successfully' };
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    return(
        <Form {...form}>
            <div className="flex flex-col items-center justify-center text-center space-y-10">
                <h1 className="text-4xl">What would you like your new password to be?</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField 
                        control={form.control}
                        name="NewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' name='NewPassword' placeholder="Enter New Password" autoComplete='off' className="size-fit rounded-2xl text-2xl" />
                                </FormControl>
                                <FormMessage className="flex justify-end"/>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="repeatNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' name='repeatNewPassword' placeholder='Repeat Password' autoComplete='off' className="size-fit rounded-2xl text-2xl" />
                                </FormControl>
                                <FormMessage className="flex justify-end"/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Change Password</Button>
                </form>
            </div>
        </Form>
    );
}

export default ResetPassword;