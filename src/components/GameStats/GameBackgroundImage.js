import Image from "next/image";
import { createClient } from "@/app/utils/supabase/server";

const GameBackgroundImage = async ({ game_name }) => {
  const supabase = createClient();

  const bgImage = (
    await supabase
      .from("games")
      .select("background_img")
      .eq("alias", game_name)
      .single()
  ).data.background_img;

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