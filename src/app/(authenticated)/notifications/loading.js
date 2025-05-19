import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedNotifications = Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="grid grid-cols-[auto,1fr,auto] bg-panel max-w-3xl w-screen rounded-lg p-6 gap-4">
      <Skeleton className="size-6" />

      <div className="flex flex-col flex-wrap w-full">
        <Skeleton className="w-32 h-6 rounded" />
        <Skeleton className="w-40 h-8 mt-2" />
        <Skeleton className="w-full h-5 mt-2 rounded-lg" />
        <Skeleton className="w-32 h-5 mt-1 rounded-lg" />
      </div>

      <div className="flex gap-2 text-grayed-out">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="w-24 h-6" />
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center p-6">
      <Skeleton className="w-72 h-12" />
      <div className="mt-10 mb-5 space-y-6">{renderedNotifications}</div>
    </div>
  );
}