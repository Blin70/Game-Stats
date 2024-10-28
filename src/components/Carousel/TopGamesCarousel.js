'use client'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import gtaImage from "/public/icons/gtaImage.jpg";

const TopGamesCarousel = ({ gamename }) => {
    const [api, setApi] = useState();
    
    const TheGames = [
        {name: "valorant", image: gtaImage},
        {name: "starcraft-brood-war", image: gtaImage},
        {name: "starcraft-2", image: gtaImage},
        {name: "rocket-league", image: gtaImage},
        {name: "tom-clancys-rainbow-six-siege-2", image: gtaImage},
        {name: "pubg-mobile", image: gtaImage},
        {name: "overwatch", image: gtaImage},
        {name: "league-of-legends", image: gtaImage},
        {name: "dota-2", image: gtaImage},
        {name: "counter-strike-global-offensive", image: gtaImage},
        {name: "call-of-duty-modern-warfare", image: gtaImage},
    ];

    useEffect(() => {
        if (!api) {
          return
        }
     
        api.on("select", () => {
            const index = api.selectedScrollSnap()
            console.log(index)
            gamename=TheGames[index].name //need to change something
        })
    }, [api]);

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