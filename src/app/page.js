import GamesContainer from "./Components/GamesContainer";
import Navbar from "./Components/navbar/Navbar";

export default function Home() {

    return (
      <div className="h-screen">
          <Navbar />
          <GamesContainer/>
          <h1 className="text-8xl absolute right-52 top-1/2">Please select a game</h1>
      </div>
    );

};
