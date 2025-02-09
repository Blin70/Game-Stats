import { getNotifications } from "@/app/utils/server-actions/userActions";
import { Button } from "@/components/ui/button";
import { X, Clock3 } from 'lucide-react';

const Notifications = async () => {
    const notifications = await getNotifications();

    const renderedNotifications = notifications?.map((notification, index) => (
        <div key={index} className="grid grid-cols-[auto,1fr,auto] bg-gray-100 max-w-3xl w-full shadow-md rounded-lg p-6 gap-4">
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
                <Clock3 /> {notification.date.slice(0,10)}
            </div>
        </div>
    ));

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl cursor-default font-bold uppercase text-center relative after:content-[''] after:block after:h-1 after:w-16 after:bg-primary after:mx-auto after:mt-1 after:transition-all after:duration-300 hover:after:w-24">Notifications</h1>
            <div className="mt-10 mb-5 space-y-6">
                {renderedNotifications?.length > 0 ? renderedNotifications : (
                    <div className="bg-gray-100 w-full shadow-md rounded-lg py-14 px-24">
                        <h2 className="text-gray-600 text-center text-lg">No notifications available.</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;
