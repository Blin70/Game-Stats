"use client"

import { Button } from "@/components/ui/button";
import { UnlinkAccount } from "@/app/utils/server-actions/linkingActions";
import { toast } from "sonner";

const UnlinkAccountForm = ({ AccountId }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await UnlinkAccount(formData);

        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="hidden" name="linkedAccountId" value={AccountId} />
          <Button type="submit" variant="outline" className="w-fit h-8 ml-auto">Unlink</Button>
        </form>
    );
}

export default UnlinkAccountForm;