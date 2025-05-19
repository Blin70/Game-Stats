import Image from "next/image";
import { getGameBackgroundImage } from "@/app/utils/server-actions/gameActions";

const GameBackgroundImage = async ({ game_name }) => {
  const bgImage = await getGameBackgroundImage(game_name);

  return (
    <Image
      priority
      alt={`${game_name} Image`}
      width={1472}
      height={900}
      src={bgImage}
      className="rounded-md object-center w-full h-[40vh]"
    />
  );
};

export default GameBackgroundImage;