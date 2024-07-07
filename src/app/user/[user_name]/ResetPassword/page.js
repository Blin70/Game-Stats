'use client'

import { useState } from "react";
import AuthInput from "@/app/_components/auth/AuthInput";
import { changePassword } from "@/app/_components/auth/AuthActions";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value)
    }

    const handleChangePassword = async () => {
        if(newPassword.length > 8 || newPassword === repeatPassword){
            await changePassword(newPassword)
        }
    }

    return (
        <div className="h-fit text-center w-fit p-5 mx-auto">
                <h1 className="text-4xl">What would you like your new password to be?</h1><br/><br/>
                <AuthInput value={newPassword} onChange={handleNewPasswordChange} type='password' name='NewPassword' placeholder='Enter New Password' />
                <AuthInput value={repeatPassword} onChange={handleRepeatPasswordChange} type='password' name='RepeatNewPassword' placeholder='Repeat Password' /><br/>
                <button onClick={handleChangePassword} className="text-3xl rounded-3xl p-2 bg-green-700 hover:bg-green-800">Change Password</button>
        </div>
    );

    
      
}

export default ResetPassword;