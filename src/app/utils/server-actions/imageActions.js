"use server";

import { createClient } from "../supabase/server";

export async function getImages(bucketName, folderPath, options) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage.from(bucketName).list(folderPath, options);
  
  if(error){
    console.error('[getImages] Supabase error while getting images from folder in storage', error);
    return { error: 'Something went wrong. Please try again!'};
  }
  
  return data;
}

export async function uploadImage(bucketName, path, formData, fileOptions) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage.from(bucketName).upload(path, formData.get("file"), fileOptions);
  
  if(error){
    if(error?.error === 'Payload too large') return { error: "The file is too large. Please upload another file!" };
      
    console.error("[uploadImage] Supabase error while uploading image", error);
    return { error: "Error while uploading image. Please try again!" };
  }

  return data;
}

export async function getPublicImageUrl(bucketName, path, options) {
  const supabase = createClient();
  
  const { data, error } = supabase.storage.from(bucketName).getPublicUrl(path, options)
  
  if(error){
    console.error("[getPublicImageUrl] Supabase error while getting public url for an image", error);
    return { error: "Something went wrong. Please try again!" }
  }

  return data;
}

export async function deleteImages(bucketName, paths) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage.from(bucketName).remove(paths)
  
  if(error){
    console.error('[deleteImage] Supabase error while deleting image', error)
    return { error: "Something went wrong. Please try again!" };
  }
  
  return data;
}