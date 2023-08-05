import { Tetromino } from "../../types";

export const rotateMatrix = (tetromino: Tetromino): Tetromino => {
  const clone = structuredClone(tetromino);

  const matrix = clone.shape;

  const n = matrix.length;

  // Transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }

  return { ...tetromino, shape: matrix };
};
