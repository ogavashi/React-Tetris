import { Colors, Tetrominoes } from "../../types";

export const shapes: string[] = ["I", "O", "T", "S", "Z", "J", "L"];

export const tetrominoes: Tetrominoes = {
  I: {
    shape: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: Colors.BLUE,
    x: 0,
    y: 0,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: Colors.YELLOW,
    x: 0,
    y: 0,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: Colors.PURPLE,
    x: 0,
    y: 0,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: Colors.GREEN,
    x: 0,
    y: 0,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: Colors.RED,
    x: 0,
    y: 0,
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: Colors.INDIGO,
    x: 0,
    y: 0,
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: Colors.ORANGE,
    x: 0,
    y: 0,
  },
};
