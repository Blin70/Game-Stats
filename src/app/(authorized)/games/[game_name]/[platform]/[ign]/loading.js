import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedTabOptions = Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="w-28 h-8" />
  ));

  return (
    <>
      <div className="relative">
        <Skeleton className="w-full h-[40vh] rounded-md object-center" />
        <div className="flex relative max-w-7xl mx-auto -mt-14 -mb-10 text-white">
          <div className="mr-6 flex flex-shrink-0 relative size-24">
            <Skeleton className="size-full absolute left-0 top-0 rounded-full object-cover z-10" />
          </div>
          <div className="flex flex-col justify-start gap-1">
            <div className="flex items-center gap-2 -mt-3">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="w-24 h-5" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="w-36 h-9" />
            </div>
          </div>
        </div>
        <div className="absolute top-5 right-10">
          <Skeleton className="w-32 h-10" />
        </div>
      </div>

      <div className="animate-pulse bg-panel grid grid-cols-[15%,85%] p-5 text-2xl text-white relative gap-6 rounded-md">
        <div></div>
        <ul className="flex gap-6 text-white/80">{renderedTabOptions}</ul>
      </div>

      <div className="grid grid-cols-[25%,75%] space-x-4 mt-6">
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-80 rounded-2xl" />
          <Skeleton className="w-full h-40 rounded-2xl" />
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-96 rounded-2xl" />
          <Skeleton className="w-full h-80 rounded-2xl" />
          <Skeleton className="w-full h-52 rounded-2xl" />
          <Skeleton className="w-full h-52 rounded-2xl" />
          <Skeleton className="w-full h-52 rounded-2xl" />
        </div>
      </div>
    </>
  );
}