const AuthInput = ({type, name}) => {
    return (
        <input type={type} name={name} placeholder={name} className="block h-14 w-4/6 rounded-2xl mx-auto my-4 text-2xl p-2" autoComplete="off" required/>
    );
}

export default AuthInput;