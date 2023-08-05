import { shapes, tetrominoes } from "../common/tetrominoes";

export const getRandomTetromino = () => {
  const randomShapeIndex = Math.floor(Math.random() * shapes.length);
  const randomShape = shapes[randomShapeIndex];

  return tetrominoes[randomShape];
};
