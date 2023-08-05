import { useEffect } from "react";
import { Moves } from "../../types";

export const useControls = (move: CallableFunction) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          move(Moves.LEFT);
          break;
        case "ArrowRight":
          move(Moves.RIGHT);
          break;
        case "ArrowDown":
          move(Moves.DOWN);
          break;
        case "ArrowUp":
          move(Moves.UP);
          break;
        case "Escape":
          move(Moves.ESC);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move]);
};
