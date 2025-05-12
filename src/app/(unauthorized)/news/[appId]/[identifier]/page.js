import { getNewsArticle } from "@/app/utils/external-apis/externalApi";
import { Circle, ExternalLink } from "lucide-react";
import Link from "next/link";

const NewsArticle = async ({ params: { appId, identifier } }) => {
  const article = await getNewsArticle(appId, identifier);

  if (!article) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Article not found</h2>
          <p className="text-muted-foreground">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6 mb-10">
        <div className="space-y-4">
          <h1 className="text-4xl/snug md:text-5xl/snug font-bold tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium">{article.author}</span>
            <Circle className="size-1.5 fill-current opacity-50" />
            {article.date}
            {article.feedlabel && (
              <>
                <Circle className="size-1.5 fill-current opacity-50" />
                <span>{article.feedlabel}</span>
              </>
            )}
          </div>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="break-words wrap-anywhere">{article.contents}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-10 pt-6 border-t border-t-muted-foreground dark:border-t-inherit gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          {article.feedname && (
            <span>Source: {article.feedname}</span>
          )}
        </div>
        
        {article.is_external_url && (
          <Link
            href={article.url}
            target="_blank"
            className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            Read full article
            <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
};

export default NewsArticle;