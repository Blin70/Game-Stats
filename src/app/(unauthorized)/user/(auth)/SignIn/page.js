"use client"

import Link from "next/link";
import { signIn } from "@/app/utils/server-actions/AuthActions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().nonempty({
        message: 'Email field cannot be empty'
    }).email({
        message: 'Invalid email address'
    }),
    password: z.string().nonempty({
        message: 'Password field cannot be empty'
    }),
}).required();

const SignIn = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values) => {
        const signInPromise = async () => {
            const res = await signIn(values)
            if(res?.error) throw new Error(res.error)
            return res;
        }

        toast.promise(signInPromise(), {
            loading: 'Signing in...',
            success: 'Successfully logged in',
            error: (err) => err.message
        })
    }

    return (
        <Form {...form}>
            <div className="absolute h-1/2 w-1/3 inset-0 m-auto">
                <h1 className="!m-6 text-center text-5xl">Sign In</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField 
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='text' name='Email' placeholder='Email' className="h-14 w-4/6 rounded-2xl mx-auto !text-2xl" autoComplete='off' />
                                </FormControl>
                                <FormMessage className="flex justify-end mr-28" />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' name='Password' placeholder='Password' className="h-14 w-4/6 rounded-2xl mx-auto !text-2xl" autoComplete='off' />
                                </FormControl>
                                <FormMessage className="flex justify-end mr-28" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="secondary" className="block h-12 w-1/2 rounded-2xl mx-auto !mt-6 text-2xl bg-[#777777] hover:bg-[#a0a0a0]">Sign In</Button>
                </form>
                <div className="text-lg mx-auto h-fit w-fit block mt-2 space-x-2">
                    <span>Dont have an account?</span>
                    <Link href='/user/SignUp'>SignUp</Link>
                </div>
            </div>
        </Form>
    );
}

export default SignIn;