import Image from "next/image";

const Game = ({ icon, name, altText }) => {
    return(
        <div className="w-full h-20 border-b-2 border-black flex items-center last:border-b-0 cursor-pointer">
            <Image className="rounded-full size-16 m-6 inline-block" alt={altText} src={icon} />
            <h1 className="ml-4 text-5xl inline-block">{name}</h1>
        </div>
    );
}

export default Game;