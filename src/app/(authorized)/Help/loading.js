import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12">
        <Skeleton className="w-72 h-12" />
        <Skeleton className="w-2/5 h-7 mt-4" />
      </div>
      <div className="w-full flex flex-col items-center">
        <Skeleton className="w-1/2 h-96" />
        <Skeleton className="w-32 h-10 mt-5" />
      </div>

      <div className="px-4 py-8 mt-10 ml-3">
        <Skeleton className="w-1/3 h-9 mb-6" />
        <div className="flex flex-col space-y-1">
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
        </div>
      </div>
    </>
  );
}