import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedGames = Array.from({ length: 8 }).map((_, index) => (
    <div key={index} className="rounded-lg bg-panel">
      <Skeleton className="w-full h-40 object-cover" />
      <div className="p-4">
        <Skeleton className="w-36 h-7" />
        <Skeleton className="w-60 h-6 mt-2" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="w-28 h-10 rounded-lg" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        <Skeleton className="w-5/12 h-14" />
        <Skeleton className="w-2/5 h-7 mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-6">
        {renderedGames}
      </div>
    </div>
  );
}