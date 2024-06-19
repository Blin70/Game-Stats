import Game from "./Game";

const GamesList = ({ games }) => {

    const renderedGames = games.map((game) => {
        return  <Game key={game.name} icon={game.icon} name={game.name} altText={game.altText} />
    });

    return(
        <>
            {renderedGames}
        </>
    );
}

export default GamesList;