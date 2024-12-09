'use client'

import { useState } from "react";
import { changePassword } from "@/app/utils/server-actions/AuthActions";
import { Input } from "@/components/ui/input"

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
        <div className="h-fit text-center w-fit p-5 mx-auto space-y-4">
                <h1 className="text-4xl">What would you like your new password to be?</h1><br/><br/>
                <Input value={newPassword} onChange={handleNewPasswordChange} type='password' name='NewPassword' placeholder='Enter New Password' className="h-14 w-4/6 rounded-2xl mx-auto text-2xl" required autoComplete='off' />
                <Input value={repeatPassword} onChange={handleRepeatPasswordChange} type='password' name='RepeatNewPassword' placeholder='Repeat Password' className="h-14 w-4/6 rounded-2xl mx-auto text-2xl" required autoComplete='off' />
                <button onClick={handleChangePassword} className="text-3xl rounded-3xl p-2 bg-green-700 hover:bg-green-800">Change Password</button>
        </div>
    );

    
      
}

export default ResetPassword;