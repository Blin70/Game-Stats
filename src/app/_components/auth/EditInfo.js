'use client';

import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";

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
                        <input onChange={handleInfoChange} value={newInfo} className="w-52 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
                        <FaRegCheckSquare onClick={handleInfoClick} className="text-green-800 text-4xl ml-4 -mt-3 inline-block cursor-pointer" />
                        <FiXSquare onClick={()=>{setNewInfoEdit(false);setNewInfo(dataToUpdate.getInfo())}} className="text-red-800 text-4xl ml-4 -mt-3 inline-block cursor-pointer" />
                    </div>
                )
            }
        </>
    );
}


export default EditInfo;