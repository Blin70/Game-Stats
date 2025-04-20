import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 p-4 space-y-2">
      <Skeleton className="h-14 w-1/3" />
      <div className="flex w-full items-center justify-center space-x-5">
        <Skeleton className="w-40 h-10" />
        <Skeleton className="w-1/3 h-16 mx-auto rounded-2xl" />
      </div>
    </div>
  );
}