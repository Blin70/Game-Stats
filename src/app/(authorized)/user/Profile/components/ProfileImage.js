"use client"

import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { uploadImage, getPublicImageUrl, updateProfile, deleteImages, getImages } from "@/app/utils/server-actions/userActions";
import { useUser } from "@/app/context/userContext";

const ProfileImage = ({ user }) => {
    const { setUser } = useUser();

    const handleAvatarChange = async (file) => {
        if(!file) return;

        const fileExtention = file.name.split('.').pop();
        const avatarPath = `${user.id}/${Date.now()}.${fileExtention}`;

        const getAvatarListRes = await getImages('avatars', `${user.id}`);
        toast[Object.keys(getAvatarListRes)[0]]?.(Object.values(getAvatarListRes)[0]);
        if(getAvatarListRes.error) return;
        
        getAvatarListRes.map(async (avatar) => {
            const deleteOldAvatarRes = await deleteImages('avatars', [`${user.id}/${avatar.name}`]);
            toast[Object.keys(deleteOldAvatarRes)[0]]?.(Object.values(deleteOldAvatarRes)[0]);
            if(deleteOldAvatarRes.error) return;
        })

        const formData = new FormData();
        formData.append("file", file)

        const uploadImageRes = await uploadImage('avatars', avatarPath, formData)
        toast[Object.keys(uploadImageRes)[0]]?.(Object.values(uploadImageRes)[0]);
        if(uploadImageRes.error) return;
        
        const getPublicImageUrlRes = await getPublicImageUrl('avatars', avatarPath)
        toast[Object.keys(getPublicImageUrlRes)[0]]?.(Object.values(getPublicImageUrlRes)[0]);
        if(getPublicImageUrlRes.error) return;

        const updateProfileRes = await updateProfile({ data: { avatar_url: getPublicImageUrlRes.publicUrl }})
        if(updateProfileRes.error) return toast.error("Something went wrong. Please try again!")

        setUser(prev => ({
            ...prev,
            user_metadata: {
                ...prev.user_metadata,
                avatar_url: getPublicImageUrlRes.publicUrl
            }
        }))
        
        toast.success("Avatar updated successfully");
    }

    return(
        <ImageUpload value={user?.user_metadata?.avatar_url} className="mx-auto max-w-48 max-h-48" onImageUpload={handleAvatarChange} />
    )

}

export default ProfileImage;