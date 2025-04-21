import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedTournaments = Array.from({ length: 6 }).map((_, index) => (
    <Skeleton key={index} className="w-96 h-80" />
  ));

  const renderedGameInfo = Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} className="w-48 h-20 mb-2 rounded-xl" />
  ));

  return (
    <div className="container mx-auto px-36 py-4 space-y-8">
      <Skeleton className="w-64 h-12 mx-auto" />
      <Skeleton className="w-full h-[400px] mx-auto rounded-lg" />

      <div className="space-y-5">
        <div className="space-x-5 my-5 mx-auto">
          <div className="flex justify-center space-x-8 py-2 mx-auto rounded-xl">
            {renderedGameInfo}
          </div>
          <div className="p-4 mt-3">
            <Skeleton className="w-64 h-9 mx-auto" />
            <Skeleton className="w-2/3 h-52 mt-2 mx-auto" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-y-3 gap-x-4">
          {renderedTournaments}
        </div>
      </div>
    </div>
  );
}