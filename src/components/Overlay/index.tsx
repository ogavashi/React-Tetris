import { useCallback } from "react";

import { GameStatuses } from "../../../types";
import { gameText } from "../../common/gameTexts";

type OverlayProps = {
  status: GameStatuses;
  reset: CallableFunction;
};

const Overlay: React.FC<OverlayProps> = ({ status, reset }) => {
  const resetGame = useCallback(() => reset(), [reset]);

  return (
    status !== GameStatuses.PLAY && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 gap-5">
        <p className="text-9xl text-white-800">{gameText[status]}</p>
        {status === GameStatuses.LOSE && <button onClick={resetGame}>Restart</button>}
      </div>
    )
  );
};

export default Overlay;
