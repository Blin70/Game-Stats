import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="absolute h-1/2 w-1/3 inset-0 m-auto">
      <Skeleton className="w-48 h-12 m-6 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="w-4/6 h-14 rounded-2xl mx-auto" />
        <Skeleton className="w-4/6 h-14 rounded-2xl mx-auto" />
        <Skeleton className="w-4/6 h-14 rounded-2xl mx-auto" />
        <Skeleton className="w-1/2 h-12 rounded-2xl mx-auto !mt-6" />
      </div>
        <Skeleton className="w-72 h-7 mt-2 mx-auto" />
    </div>
  );
}