'use client';

import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { resetPassword } from "./AuthActions";
import { deleteOwnAccount } from "./AuthActions";

function EditInfo({ user, info }){
    const supabase = createClient();
    const [newInfoEdit, setNewInfoEdit] = useState(false);

    let initialInfo;
    switch (info) {
        case 'Name':
            initialInfo = user.user_metadata.first_name;
            break;
        case 'Email':
            initialInfo = user.email;
            break;
        case 'Phone':
            initialInfo = user.user_metadata.phone ? user.user_metadata.phone : '';
            break;
        default:
            initialInfo = '';
    }
    
    const [newInfo, setNewInfo] = useState(initialInfo);

    const dataToUpdate = ( () => {
        switch (info){
            case 'Name':
                return {
                    updateUser: { data: { first_name: newInfo } },
                    getInfo: ()=> user.user_metadata.first_name,
                    updateNewUser: () => user.user_metadata.first_name = newInfo,
                    newInfoRequirements: newInfo.length >= 3
                }
            case 'Email':
                return {
                    updateUser: { email: newInfo },
                    getInfo: ()=>user.email,
                    updateNewUser: () => user.email = newInfo,
                    newInfoRequirements: newInfo.includes('@')
                }
            case 'Phone':
                return {
                    updateUser: {data: { phone: newInfo }},
                    getInfo: ()=>user.user_metadata.phone ? user.user_metadata.phone : '',
                    updateNewUser: () => user.user_metadata.phone = newInfo,
                    newInfoRequirements: newInfo.length >= 9 && /^\+?[1-9]\d{1,14}$/.test(newInfo)
                }
            default:
                console.error('Invalid info type');
                return null;
        }
    })();
    
      const handleInfoEdit = () => {
          setNewInfoEdit(prev => !prev);
      }
      
      const handleInfoChange = (event) => {
          setNewInfo(event.target.value);
      }

      const handleInfoClick = async () => {
          if(newInfo !== dataToUpdate.getInfo && dataToUpdate.newInfoRequirements){
              const { error } = await supabase.auth.updateUser(dataToUpdate.updateUser)

              if(error){
                  console.error(error);
                  return;
                }

                dataToUpdate.updateNewUser();
                setNewInfo(newInfo);
            }else{setNewInfo(dataToUpdate.getInfo())}
            setNewInfoEdit(false)
      } 

    return (
        <>
            {!newInfoEdit 
                ? <h2 className="text-3xl relative mt-5">{info}: {dataToUpdate.getInfo()} <MdEdit onClick={handleInfoEdit} className="text-4xl ml-4 -mt-3 inline-block cursor-pointer"/></h2>
                : (
                    <div className="ml-10">
                        <br/>
                        <input onChange={handleInfoChange} value={newInfo} name={info} className="w-52 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" autoComplete="off" />
                        <FaRegCheckSquare onClick={handleInfoClick} className="text-green-800 text-4xl ml-4 -mt-3 inline-block cursor-pointer" />
                        <FiXSquare onClick={()=>{setNewInfoEdit(false);setNewInfo(dataToUpdate.getInfo())}} className="text-red-800 text-4xl ml-4 -mt-3 inline-block cursor-pointer" />
                    </div>
                )
            }
        </>
    );
}

const ResetPasswordModal = (email) => {
    const [openModal, setOpenModal] = useState(false);
    const [openReqSent, setOpenReqSent] = useState(false);

    const handleResetClick = async () => {
        setOpenReqSent(true);
        resetPassword(`${window.location.protocol}//${window.location.host}`);
    }

    return (
        <>
            {
                openModal 
                ? (
                    <>
                        <div onClick={()=>setOpenModal(false)} className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
                            <div onClick={(e)=>e.stopPropagation()} className="h-fit w-fit rounded-3xl p-5 bg-[#474748] space-x-2">
                                <h1 className="text-5xl">Reset Password</h1>
                                <br/><br/><br/>
                                {openReqSent
                                    ? (
                                        <>
                                            <h2 className="text-3xl">A password reset link has been sent to your email</h2>
                                            <br/><br/><br/>
                                            <button onClick={()=>{setOpenModal(false);setOpenReqSent(false)}} className="border-black border-2 rounded-3xl p-1 w-1/4 text-3xl bg-gray-600 hover:bg-gray-700">Alright</button>
                                        </>
                                      )
                                    : (
                                        <>
                                            <h2 className="text-3xl">Are you sure you want to reset your password?</h2>
                                            <br/><br/><br/><br/>
                                            <button onClick={handleResetClick} className="border-black border-2 rounded-3xl p-1 w-1/4 text-3xl bg-green-800 hover:bg-green-900">Reset</button>
                                            <button onClick={()=>setOpenModal(false)} className="border-black border-2 rounded-3xl p-1 w-1/4 text-3xl bg-gray-600 hover:bg-gray-700">Cancel</button>
                                        </>
                                      )
                                }
                                
                            </div>
                        </div>
                        <button onClick={()=>setOpenModal(true)} className="w-1/2 h-16 text-4xl bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 p-1 block mx-auto">Reset Password</button>
                    </>
                )
                : (
                    <button onClick={()=>setOpenModal(true)} className="w-1/2 h-16 text-4xl bg-blue-500 hover:bg-blue-600 rounded-xl mt-10 p-1 block mx-auto">Reset Password</button>
                )
            }
        </>
    );
}

const DeleteAccountModal = (user) => {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteAccount = async () => {
        await deleteOwnAccount(user)
        window.localStorage.clear();
        alert('Your account has been deleted successfully')
    }

    return (
        <>
            {
                openModal 
                ? (
                    <>
                        <div onClick={()=>setOpenModal(false)} className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
                            <div onClick={(e)=>e.stopPropagation()} className="h-fit w-fit rounded-3xl p-5 bg-[#474748] space-x-2">
                                <h1 className="text-5xl">Delete Account</h1>
                                <br/><br/><br/>
                                <h2 className="text-3xl">Are you sure you want to delete your account?</h2>
                                <h2 className="text-3xl">This action is irreversible</h2>
                                            <br/><br/><br/><br/>
                                            <button onClick={handleDeleteAccount} className="border-black border-2 rounded-3xl p-1 w-1/4 text-3xl bg-green-800 hover:bg-green-900">Delete</button>
                                            <button onClick={()=>setOpenModal(false)} className="border-black border-2 rounded-3xl p-1 w-1/4 text-3xl bg-gray-600 hover:bg-gray-700">Cancel</button>
                            </div>
                        </div>
                        <button onClick={()=>setOpenModal(true)} className="w-1/2 h-16 text-4xl bg-red-500 hover:bg-red-900 rounded-xl mt-5 p-1 block mx-auto">Delete account</button>
                    </>
                )
                : (
                    <button onClick={()=>setOpenModal(true)} className="w-1/2 h-16 text-4xl bg-red-500 hover:bg-red-900 rounded-xl mt-5 p-1 block mx-auto">Delete account</button>
                )
            }
        </>
    );
}


export default EditInfo;
export { ResetPasswordModal, DeleteAccountModal };
