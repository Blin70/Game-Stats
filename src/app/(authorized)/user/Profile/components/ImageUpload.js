"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import defaultProfilePic from "/public/icons/default_profile_pic.png";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

const ImageUpload = ({ value, onImageUpload, className }) => {
  const [ avatar, setAvatar ] = useState(value);

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    
    if(file){
      setAvatar(URL.createObjectURL(file))
      onImageUpload?.(file)
    }
  }

  return(
    <div className={className}>
      <Input type="file" accept="image/*" id="avatar-upload" className="hidden" onChange={handleChange} />
      <label htmlFor="avatar-upload" className="cursor-pointer group">
        <Avatar className="size-48 group-hover:opacity-75 transition-opacity">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <Image src={defaultProfilePic} alt="Default Profile Pic" priority/>
          </AvatarFallback>
        </Avatar>
      </label>
    </div>
  )
}

export default ImageUpload;