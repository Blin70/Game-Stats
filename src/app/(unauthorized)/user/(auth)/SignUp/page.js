"use client"

import Link from "next/link";
import { signUp } from "@/app/utils/server-actions/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().nonempty({
        message: 'Name field cannot be empty'
    }).min(3, {
        message: 'Name must be at least 3 characters.',
    }).max(25, {
        message: 'Name must not be longer than 25 characters.'
    }),
    email: z.string().nonempty({
        message: 'Email field cannot be empty'
    }).email({
        message: 'Invalid email address'
    }),
    password: z.string().nonempty({
        message: 'Password field cannot be empty'
    }).min(8,{
        message: 'Password must be at least 8 characters.'
    }),
}).required()

const SignUp = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values) => {
        const signUpPromise = async () => {
            const res = await signUp(values);
            if(res?.error) throw new Error(res.error);
            return res;
        }
        
        toast.promise(signUpPromise(), {
            loading: 'Signing up...',
            success: 'Account created successfully',
            error: (err) => err.message
        })
    }
    
    return(
        <Form {...form}>
            <div className="absolute h-1/2 w-1/3 inset-0 m-auto flex flex-col">
                <h1 className="!m-6 text-center text-5xl">Sign Up</h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField 
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='text' name='Name' placeholder='Name' className="h-14 w-4/6 rounded-2xl mx-auto !text-2xl" autoComplete='off' />
                                </FormControl>
                                <FormMessage className="flex justify-end mr-28" />
                            </FormItem>
                        )}
                    />
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
                                    <Input {...field} type='password' name='Password' placeholder='Password' autoComplete='off' className="h-14 w-4/6 rounded-2xl mx-auto !text-2xl" />
                                </FormControl>
                                <FormMessage className="flex justify-end mr-28" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="secondary" className="block h-12 w-1/2 rounded-2xl mx-auto !mt-6 text-2xl bg-[#777777] hover:bg-[#a0a0a0]">Sign Up</Button>
                </form>
                <div className="text-lg mx-auto h-fit w-fit block mt-2 space-x-2">
                    <span>Already have an account?</span>
                    <Link href='/user/SignIn'>SignIn</Link>
                </div>
            </div>
        </Form>
    );
}

export default SignUp;