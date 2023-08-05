import { GameStatuses } from "../../types";

export const gameText: { [key in GameStatuses]: string } = {
  [GameStatuses.PAUSE]: "PAUSE",
  [GameStatuses.LOSE]: "GAME OVER",
  [GameStatuses.PLAY]: "PLAYING",
};
