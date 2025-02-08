import { createClient } from "@/app/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { X, Clock3 } from 'lucide-react';

const Notifications = async () => {
    const supabase = createClient();

    let { data, error } = await supabase.from('profiles').select('notifications').single();
    
    if(error){
        console.error('[Notifications] Supabase error while getting notifications for user', error);
        data = { notifications: [] };
    }

    const renderedNotifications = data.notifications?.map((notification, index) => (
        <div key={index} className="grid grid-cols-[auto,1fr,auto] bg-gray-100 max-w-3xl w-full shadow-md rounded-lg px-6  gap-4 py-6">
            <div>
                <Button size="icon" variant="outline" className="size-6">
                    <X className="size-4" />
                </Button>
            </div>

            <div className="flex flex-col">
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded w-fit">
                    {notification.type}
                </span>
                <h3 className="mt-2 font-semibold text-xl">
                    {notification.title}
                </h3>
                <p className="mt-2 text-gray-600">
                    {notification.message}
                </p>
            </div>

            <div className="flex gap-2 text-gray-500">
                <Clock3 /> {notification.date}
            </div>
        </div>
    ));

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl cursor-default font-bold uppercase text-center relative after:content-[''] after:block after:h-1 after:w-16 after:bg-primary after:mx-auto after:mt-1 after:transition-all after:duration-300 hover:after:w-24">Notifications</h1>
            <div className="mt-10 mb-5 space-y-6">
                {renderedNotifications ||  <p className="text-gray-600 text-center py-6">No notifications available.</p>}
            </div>
        </div>
    );
}

export default Notifications;
