import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pl-2 space-y-10">
      <Skeleton className="w-80 h-10" />

      <section className="space-y-5">
        <Skeleton className="w-56 h-7" />
        <div className="flex items-center p-5 ml-2 bg-panel rounded-lg">
          <Skeleton className="w-60 h-6" />
          <Skeleton className="size-9 ml-auto" />
        </div>
      </section>

      <section className="space-y-5">
        <Skeleton className="w-56 h-7" />
        <div className="flex items-center p-5 ml-2 bg-panel rounded-lg">
          <Skeleton className="w-60 h-6" />
          <Skeleton className="size-9 ml-auto" />
        </div>
      </section>

      <section className="space-y-5">
        <Skeleton className="w-56 h-7" />
        <div className="bg-panel rounded-lg p-6">
          <div className="grid grid-cols-[20%,10%,40%,15%] gap-5">
            <Skeleton className="w-72 h-10" />
            <Skeleton className="w-36 h-10" />
            <Skeleton className="w-full h-19" />
            <Skeleton className="w-52 h-10" />
          </div>
          <Skeleton className="w-96 h-5 mt-4 mx-auto" />
        </div>
      </section>

      <section className="space-y-5">
        <Skeleton className="w-56 h-7" />
        <div className="p-5 ml-2 bg-panel rounded-lg">
          <div className="flex items-center">
            <Skeleton className="w-60 h-6" />
            <Skeleton className="size-9 ml-auto" />
          </div>
          <Skeleton className="w-40 h-10 mt-5 mx-auto" />
        </div>
      </section>

      <Separator />

      <section className="flex flex-col items-center justify-center space-y-2">
        <Skeleton className="w-36 h-8 -mt-3" />
        <Skeleton className="w-96 h-5" />
        <Skeleton className="w-36 h-10 !mt-6 p-5" />
      </section>
    </div>
  );
}