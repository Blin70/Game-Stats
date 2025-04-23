import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedInfo = Array.from({ length: 3 }).map((_, index) => {
    return (
      <div key={index} className="space-y-2">
        <Skeleton className="w-14 h-5" />
        <Skeleton className="w-36 h-7 ml-1" />
      </div>
    );
  });

  const renderedLinkedAccounts = Array.from({ length: 2 }).map((_, index) => (
    <div key={index} className="max-w-2xl w-5/12 justify-between items-center flex rounded-lg p-4 m-4 bg-panel">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-16 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="w-44 h-8" />
          <Skeleton className="w-52 h-5" />
        </div>
      </div>

      <div className="h-full flex flex-col justify-between">
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-20 h-8 ml-auto" />
      </div>
    </div>
  ));

  return (
    <div className="pl-2">
      <div className="w-full h-fit mt-5 mx-auto text-center">
        <Skeleton className="size-48 rounded-full mx-auto" />
        <Skeleton className="w-52 h-9 mx-auto mt-6" />
        <Skeleton className="w-40 h-5 mx-auto mt-4" />
      </div>
      <Separator className='mt-14 mb-5' />
      <div className="mb-14">
        <Skeleton className="w-48 h-8" />
        <div className="grid grid-cols-3 m-5 p-5 bg-panel rounded-lg">
          {renderedInfo}
        </div>
        <Skeleton className="w-28 h-10 float-right mr-5" />
      </div>
      <Skeleton className="w-48 h-8" />
      <div className="w-full justify-center flex flex-wrap">
        {renderedLinkedAccounts}
      </div>
    </div>
  );
}