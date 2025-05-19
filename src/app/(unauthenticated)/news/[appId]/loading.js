import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const renderedArticleTags = Array.from({ length: 2 }).map((_, index) => (
    <Skeleton key={index} className="w-24 h-7 rounded-full" />
  ));

  return (
    <article className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6 mb-10">
        <div className="space-y-4">
          <Skeleton className="w-full h-16" />

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="size-1.5 rounded-full" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="size-1.5 rounded-full" />
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">{renderedArticleTags}</div>
      </div>

      <Skeleton className="w-full h-72" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-10 pt-6 border-t border-t-muted-foreground dark:border-t-inherit gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Skeleton className="w-72 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="size-5" />
        </div>
      </div>
    </article>
  );
}