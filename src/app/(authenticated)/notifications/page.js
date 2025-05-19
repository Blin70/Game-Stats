import { getNotifications } from "@/app/utils/server-actions/notificationActions";
import { Clock3 } from 'lucide-react';
import DiscardNotificationBtn from "./components/DiscardNotificationBtn";

const Notifications = async () => {
    const notifications = await getNotifications();

    const renderedNotifications = notifications?.map((notification, index) => (
        <div key={index} className="grid grid-cols-[auto,1fr,auto] bg-panel max-w-3xl w-full shadow-md rounded-lg p-6 gap-4">
            <DiscardNotificationBtn notificationId={notification.id} />

            <div className="flex flex-col space-y-2">
                <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded w-fit">
                    {notification.type}
                </span>
                <h3 className="font-semibold text-xl">
                    {notification.title}
                </h3>
                <p className="text-grayed-out">
                    {notification.message}
                </p>
            </div>

            <div className="flex gap-2 text-grayed-out">
                <Clock3 /> {notification.date.slice(0,10)}
            </div>
        </div>
    ));

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-4xl cursor-default font-bold uppercase text-center relative after:content-[''] after:block after:h-1 after:w-16 after:bg-primary after:mx-auto after:mt-1 after:transition-all after:duration-300 hover:after:w-24">Notifications</h1>
            <div className="mt-10 mb-5 space-y-6">
                {renderedNotifications?.length > 0 ? renderedNotifications : (
                    <div className="bg-panel w-full shadow-md rounded-lg py-14 px-24">
                        <h2 className="text-grayed-out text-center text-lg">No notifications available.</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;
