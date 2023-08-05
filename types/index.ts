export enum Colors {
  RED = "#ef4444",
  BLUE = "#3b82f6",
  YELLOW = "#eab308",
  GREEN = "#22c55e",
  PURPLE = "#a855f7",
  ORANGE = "#f97316",
  INDIGO = "#6366f1",
}

export enum Moves {
  UP,
  DOWN,
  RIGHT,
  LEFT,
  ESC,
}

export enum Statuses {
  FILLED,
  PLACED,
}

export enum GameStatuses {
  PAUSE,
  PLAY,
  LOSE,
}

export type Tetromino = {
  shape: number[][];
  color: Colors;
  x: number;
  y: number;
};

export type Tetrominoes = {
  [key: string]: Tetromino;
};

type Field = {
  status: Statuses;
  color?: Colors;
};

export type GameField = (Field | null)[][];
