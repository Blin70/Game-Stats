'use client'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const TopGamesCarousel = ({ TheGames }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [api, setApi] = useState();

    useEffect(() => {
        if (!api) {
          return
        }
        document.cookie = `selectedGame=0; path=/;`;
     
        api.on("select", () => {
            const index = api.selectedScrollSnap()
            document.cookie = `selectedGame=${index}; path=/;`;
            router.refresh();
        })

        return () => {
            if (pathname === '/TopGames') {
              document.cookie = "selectedGame=; Max-Age=-99999999; path=/";
            }
        };
    }, [api, pathname, router]);
    
    const renderedCarouselItems = TheGames.map((game, index) => {
        return( 
            <CarouselItem key={index} className="pt-1">
                <Image alt="gameimage" src={game.image} className="w-full h-[400px] object-fill rounded-lg shadow-md" />
            </CarouselItem>
        );
    })


    return(
        <Carousel setApi={setApi}>
            <CarouselContent>
                {renderedCarouselItems}
            </CarouselContent>
        </Carousel>
    );
}

export default TopGamesCarousel;