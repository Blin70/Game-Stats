'use client'

import { createClient } from "@/app/utils/supabase/client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthInput from "@/app/_components/auth/AuthInput";

const ResetPassword = () => {
    const supabase = createClient();
    const router = useRouter();
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
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            })

            if(error){
                console.error('Please try again', error)
            }
            if(data){
                alert('Password changed successfully')
                router.push('/')
            }
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