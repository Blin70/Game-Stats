'use client'

import Image from "next/image";
import Link from "next/link";

const ClientImage = ({ game , ...other}) => {

    const gameName = game.name.replaceAll(" ", "");

    return (
        <Link href={'/games/'+gameName}>
            <Image alt={game.name} src={game.icon} className="size-24" {...other} />
        </Link>
    );
}

export default ClientImage;