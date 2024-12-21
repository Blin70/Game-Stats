import { Input } from "@/components/ui/input"
import { CurrentlySupportedGames } from "../../SupportedGames/page";
import { redirect } from "next/navigation";

const UsernameEntry = async ({ params: { game_name } }) => {
    const isSupported = (await CurrentlySupportedGames()).some((game) => game.name.toLowerCase() === decodeURIComponent(game_name).toLowerCase());

    if(!isSupported) redirect('/unauthorized');

    const submitUsername = async (formData) => {
        "use server";

        const Username = formData.get('Username');
        redirect(`/games/${game_name}/${encodeURIComponent(Username)}`)
    }

    return (
        <form action={submitUsername} className="h-fit w-fit mx-auto p-4 text-center mt-40 space-y-4">
            <h1 className="text-5xl">{decodeURIComponent(game_name)} Stats</h1>
            <Input type="text" name="Username" placeholder="Enter Username" className="w-fit h-fit mx-auto rounded-2xl text-3xl p-3" autoComplete="off"  />
        </form>
    );

}

export default UsernameEntry;