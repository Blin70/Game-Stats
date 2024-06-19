import GamesList from "./GamesList";
import csgoIcon from "../icons/csgoIcon.png"
import apexIcon from "../icons/apexIcon.png"
import division2Icon from "../icons/division2Icon.png"
import splitgateIcon from "../icons/splitgateIcon.png"

const GamesContainer = () => {
    
    const games = [
        { icon:csgoIcon, name:'CS:GO', altText:'CSGO Icon' },
        { icon:apexIcon, name:'Apex', altText:'Apex Icon' },
        { icon:division2Icon, name:'Division 2', altText:'Division 2 Icon' },
        { icon:splitgateIcon, name:'Splitgate', altText:'Splitgate Icon' },
    ]

    return(
        <div className="w-1/5 h-fit border-black border-2 rounded-3xl absolute top-1/4 left-10">
            <GamesList games={games} />
        </div>
    );
}

export default GamesContainer;