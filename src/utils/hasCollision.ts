import { GameField, Statuses, Tetromino } from "../../types";

export const hasCollision = (tetromino: Tetromino, board: GameField): boolean => {
  for (let row = 0; row < tetromino.shape.length; row++) {
    for (let col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col]) {
        const boardX = tetromino.x + col;
        const boardY = tetromino.y + row;

        if (
          boardX < 0 ||
          boardX >= board[0].length ||
          boardY >= board.length ||
          boardY < 0 ||
          board[boardY][boardX]?.status === Statuses.PLACED
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
