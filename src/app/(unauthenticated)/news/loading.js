import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedNews = Array.from({ length: 15 }).map((_, index) => (
    <Skeleton key={index} className="size-96" />
  ));

  return (
    <div className="container mx-auto px-[8%] py-8">
      <Skeleton className="w-1/2 h-20 mb-3 mx-auto" />
      <Skeleton className="w-5/12 h-6 mb-8 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {renderedNews}
      </div>
    </div>
  );
}