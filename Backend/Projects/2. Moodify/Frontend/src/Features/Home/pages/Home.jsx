import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hook/useSong";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </>
  );
};

export default Home;
