'use client'

import { changePassword } from "@/app/utils/server-actions/authActions";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { toast } from "sonner";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import { createClient } from "@/app/utils/supabase/client";

const formSchema = z.object({
    newPassword: z.string().nonempty({
        message: 'Password field cannot be empty'
    }).min(8,{
        message: 'Password must be at least 8 characters.'
    }),
    repeatNewPassword: z.string().nonempty({
        message: 'Repeat password field cannot be empty'
    })
}).refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords don't match",
    path: ["repeatNewPassword"]
});

const ResetPassword = () => {
    const [isVerified, setIsVerified] = useState(false);
    const searchParams = useSearchParams();
    const token_hash = searchParams.get('token_hash') || null;
    const type = searchParams.get('type') || null;
    const router = useRouter();
    const { setUser } = useUser();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            repeatNewPassword: ""
        }
    })

    useEffect(() => {
        if(token_hash && type){
            const verifyResetOTP = async () => {        
                const supabase = createClient(); // cant put these in server actions bcz session context is only available in the browser.
                
                const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({ type, token_hash });
                
                if(otpError){
                    if(otpError.code === 'otp_expired'){
                        toast.error('Invalid or expired reset link.')
                        return router.push('/');
                    }
                
                    console.error('[ResetPassword] Supabase error while verifying hash code', otpError)
                    toast.error('Unexpected error. Please try again')
                    return router.push('/');
                }

                
                const { error: sessionError } = await supabase.auth.setSession(otpData.session);
                
                if(sessionError){
                    console.error('[ResetPassword] Supabase error while setting session', sessionError);
                    toast.error('Unexpected error. Please try again');
                    return router.push('/');
                }
                
                setUser(otpData.user)
                setIsVerified(true)
            }

            verifyResetOTP();
        } else return router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token_hash, type, router])

    const onSubmit = async (values) => {
        const res = await changePassword(values.newPassword) || { success: 'Password changed successfully' };
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    if (!isVerified) return <p className="text-center text-xl">Verifying...</p>

    return(
        <Form {...form}>
            <div className="flex flex-col items-center justify-center text-center space-y-10">
                <h1 className="text-4xl">What would you like your new password to be?</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField 
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' name='newPassword' placeholder="Enter New Password" autoComplete='off' className="size-fit rounded-2xl !text-2xl" />
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
                                    <Input {...field} type='password' name='repeatNewPassword' placeholder='Repeat Password' autoComplete='off' className="size-fit rounded-2xl !text-2xl" />
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