"use client"

import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { discardNotification } from "@/app/utils/server-actions/notificationActions";
import { toast } from "sonner";


const DiscardNotificationBtn = ({ NotificationId }) => {

    const handleDiscard = async () => {
        const res = await discardNotification(NotificationId);
        toast[Object.keys(res)[0]]?.(Object.values(res)[0]);
    }

    return(
        <Button onClick={handleDiscard} size="icon" variant="outline" className="size-6">
            <X className="size-4" />
        </Button>
    );
}

export default DiscardNotificationBtn;