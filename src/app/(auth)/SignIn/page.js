const SignIn = () => {

    return (
        <div className="absolute h-1/2 w-1/3 inset-0 m-auto">
            <form>
                <h1 className="m-6 text-center text-5xl">Sign In</h1>
                <input type="text" name="Email" placeholder="Email" className="block h-14 w-4/6 rounded-2xl mx-auto my-4 text-2xl p-2" required/>
                <input type="text" name="Password" placeholder="Password" className="block h-14 w-4/6 rounded-2xl mx-auto my-4 text-2xl p-2" required/>
                <button type="submit" className="block h-14 w-4/6 rounded-2xl mx-auto my-4 text-3xl p-2 bg-[#7f7f7f]">SignIn</button>
            </form>
        </div>
    );
}

export default SignIn;