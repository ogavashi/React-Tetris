import { GameField, Statuses } from "../../types";

export const shouldClear = (board: GameField): boolean => {
  let isRow = false;

  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row].every((cell) => cell?.status === Statuses.PLACED)) {
      isRow = true;
    }
  }

  return isRow;
};
