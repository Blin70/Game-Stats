import Link from "next/link";
import AuthInput from "@/app/Components/auth/AuthInput";

const SignUp = () => {

    return (
        <div className="absolute h-1/2 w-1/3 inset-0 m-auto">
            <form>
                <h1 className="m-6 text-center text-5xl">Sign Up</h1>
                <AuthInput type='text' name='Username' />
                <AuthInput type='text' name='Email' />
                <AuthInput type='password' name='Password' />
                <button type="submit" className="block h-14 w-4/6 rounded-2xl mx-auto mt-6 text-3xl p-2 bg-[#7f7f7f]">SignUp</button>
            </form>
            <div className="text-lg mx-auto h-fit w-fit block mt-2 space-x-2">
                <label>Already have an account?</label>
                <Link href='/SignIn'>SignIn</Link>
            </div>
        </div>
    );
}

export default SignUp;