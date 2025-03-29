import { getGameNews } from "@/app/utils/external-apis/externalApi";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const News = async () => {
    const news = [
      ...(await getGameNews(730)),
      ...(await getGameNews(677620)),
      ...(await getGameNews(1172470)),
      ...(await getGameNews(2221490)),
    ].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    const renderedNews = news.map((i, index) => (
        <Card key={index} className="flex flex-col max-w-sm border border-border/50 text-center hover:shadow-xl hover:-translate-y-2 hover:bg-accent/5 transition-all duration-200">
            <div className="flex flex-col flex-1">
                <CardHeader className="pb-3">
                    <CardTitle className="text-2xl font-semibold leading-tight after:contents-[''] hover:after:block after:w-0 after:h-0.5 after:mt-0.5 after:bg-primary after:mx-auto after:transition-all after:duration-300 hover:after:w-40">
                        <Link href={`/news/${i.gid}`}>
                            {i.title}
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed text-wrap overflow-hidden">
                    {i.contents}
                </CardContent>
            </div>
            <CardFooter className="pt-4 flex justify-between text-sm font-medium leading-none text-muted-foreground/75">
                <span>{i.date}</span>
                <span className="italic">By {i.author}</span>
            </CardFooter>
        </Card>
    ))

    return(
        <div className="container mx-auto px-[8%] py-8 rounded-lg">
            <h1 className="text-4xl/tight md:text-5xl/tight lg:text-6xl/tight font-bold text-center mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Latest Gaming News
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stay updated with the latest news and updates from your favorite games
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {renderedNews}
            </div>
        </div>    
    );
}

export default News;