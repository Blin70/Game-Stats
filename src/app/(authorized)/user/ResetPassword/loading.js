import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-10">
      <Skeleton className="w-7/12 h-11" />
      <div className="space-y-5">
        <Skeleton className="w-80 h-12 rounded-2xl" />
        <Skeleton className="w-80 h-12 rounded-2xl" />
        <Skeleton className="w-40 h-10 mx-auto" />
      </div>
    </div>
  );
}