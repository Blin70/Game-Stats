"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }){
    const router = useRouter();

    return(
        <div className="flex flex-col items-center justify-center space-y-5 absolute inset-0">
            <h1 className="text-6xl">Something went wrong!</h1>
            <p className="text-black/70">{error.message}</p>
            <div className="flex space-x-5">
                <Button onClick={() => router.back()}>Go Back</Button>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </div>
    );
}