import { useGame } from "../../hooks/useGame";

import Playfield from "../../components/Playfield";
import Overlay from "../../components/Overlay";
import Stats from "../../components/Stats";

const GamePage = () => {
  const { playfield, points, level, gameStatus, resetGame } = useGame();

  return (
    <div className="container mx-auto">
      <Stats level={level} score={points} />
      <Playfield field={playfield} />
      <Overlay status={gameStatus} reset={resetGame} />
    </div>
  );
};

export default GamePage;
