"use client"

import { CardContent, CardFooter } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminCreateUser } from "@/app/utils/server-actions/adminActions";
import { toast } from "sonner";


const CreateUserForm = ({ renderedFields }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await AdminCreateUser(formData)

        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    return(
        <form onSubmit={handleSubmit}>
            <CardContent>
                {renderedFields}
            </CardContent>
            <CardFooter className="space-x-2">
                <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type='submit'>Create user</Button>
            </CardFooter>
        </form>
    );
}

export default CreateUserForm;