import GamesContainer from "./Components/GamesContainer";
import ProfileMenu from "./Components/ProfileMenu";

export default function Home() {

    return (
      <div className="h-screen relative">
          <ProfileMenu/>
          <GamesContainer/>
          <h1 className="text-8xl absolute right-52 top-1/2">Please select a game</h1>
      </div>
    );

};
