import csgoIcon from "@/app/icons/csgoIcon.png"
import apexIcon from "@/app/icons/apexIcon.png"
import division2Icon from "@/app/icons/division2Icon.png"
import splitgateIcon from "@/app/icons/splitgateIcon.png"
import Game from "./Game";

const games = [
    { icon:csgoIcon, name:'CS:GO', altText:'CSGO Icon' },
    { icon:apexIcon, name:'Apex', altText:'Apex Icon' },
    { icon:division2Icon, name:'Division 2', altText:'Division 2 Icon' },
    { icon:splitgateIcon, name:'Splitgate', altText:'Splitgate Icon' },
]

const GamesContainer = () => {
    
    const renderedGames = games.map((game) => {
        return  <Game key={game.name} icon={game.icon} name={game.name} altText={game.altText} />
    });

    return(
        <div className="w-1/5 h-fit border-black border-2 rounded-3xl absolute top-1/4 left-10">
            {renderedGames}
        </div>
    );
}

export default GamesContainer;
export { games };