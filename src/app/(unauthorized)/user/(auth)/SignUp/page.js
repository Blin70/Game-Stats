import Link from "next/link";
import { signUp } from "@/app/utils/auth/AuthActions";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SignUp = () => {

    return (
        <div className="absolute h-1/2 w-1/3 inset-0 m-auto">
            <form action={signUp} className="space-y-2">
                <h1 className="!m-6 text-center text-5xl">Sign Up</h1>
                <Input type='text' name='Name' placeholder='Name' className="h-14 w-4/6 rounded-2xl mx-auto text-2xl" required autoComplete='off' />
                <Input type='text' name='Email' placeholder='Email' className="h-14 w-4/6 rounded-2xl mx-auto text-2xl" required autoComplete='off' />
                <Input type='password' name='Password' placeholder='Password' required autoComplete='off' className="h-14 w-4/6 rounded-2xl mx-auto text-2xl" />
                <Button type="submit" variant="secondary" className="block h-12 w-1/2 rounded-2xl mx-auto !mt-6 text-2xl bg-[#777777] hover:bg-[#a0a0a0]">Sign Up</Button>
            </form>
            <div className="text-lg mx-auto h-fit w-fit block mt-2 space-x-2">
                <label>Already have an account?</label>
                <Link href='/user/SignIn'>SignIn</Link>
            </div>
        </div>
    );
}

export default SignUp;