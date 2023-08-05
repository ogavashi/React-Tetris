/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { GameField, GameStatuses, Moves, Statuses, Tetromino } from "../../types";
import { config } from "../common/config";
import {
  generateField,
  getRandomTetromino,
  hasCollision,
  rotateMatrix,
  shouldClear,
} from "../utils";
import { levelThresholds } from "../common/levelsThresholds";
import { useInterval } from "./useInterval";
import { useControls } from "./useControls";

export const useGame = () => {
  const [playfield, setPlayField] = useState<GameField>(
    generateField(config.PLAY_FIELD_PARAMS.ROWS, config.PLAY_FIELD_PARAMS.COLS)
  );

  const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>();

  const [gameStatus, setGameStatus] = useState<GameStatuses>(GameStatuses.PLAY);

  const [points, setPoints] = useState<number>(0);

  const [level, setLevel] = useState<number>(1);

  const [speed, setSpeed] = useState<number>(config.STARTING_SPEED);

  const placeTetrominoOnBoard = () => {
    if (!currentTetromino) return;

    setPlayField((prev) => {
      const newPlayfield = structuredClone(prev);

      for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
          if (currentTetromino.shape[row][col]) {
            const boardX = currentTetromino.x + col;
            const boardY = currentTetromino.y + row;

            if (playfield[boardY][boardX]?.status === Statuses.PLACED) {
              setGameStatus(GameStatuses.LOSE);

              return prev;
            }

            newPlayfield[boardY][boardX] = {
              status: Statuses.FILLED,
              color: currentTetromino.color,
            };
          }
        }
      }
      return newPlayfield;
    });
  };

  const spawnTetromino = () => {
    const randomTetromino = getRandomTetromino();

    randomTetromino.x = Math.floor(
      (config.PLAY_FIELD_PARAMS.COLS - randomTetromino.shape[0].length) / 2
    );
    randomTetromino.y = 0;

    setCurrentTetromino(randomTetromino);
  };

  const clearTetrominoFromBoard = () => {
    if (!currentTetromino) return;

    setPlayField((prev) => {
      const newPlayfield = [...prev];

      for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
          if (currentTetromino.shape[row][col]) {
            const boardX = currentTetromino.x + col;
            const boardY = currentTetromino.y + row;
            newPlayfield[boardY][boardX] = null;
          }
        }
      }

      return newPlayfield;
    });
  };

  const markPlacedTetromino = () => {
    if (!currentTetromino) return;

    setPlayField((prev) => {
      const newPlayfield = [...prev];

      for (let row = 0; row < currentTetromino.shape.length; row++) {
        for (let col = 0; col < currentTetromino.shape[row].length; col++) {
          if (currentTetromino.shape[row][col]) {
            const boardX = currentTetromino.x + col;
            const boardY = currentTetromino.y + row;
            newPlayfield[boardY][boardX] = {
              status: Statuses.PLACED,
              color: currentTetromino.color,
            };
          }
        }
      }

      return newPlayfield;
    });
  };

  const isTetrominoPlaced = (): boolean => {
    if (!currentTetromino) return false;

    const movedTetromino: Tetromino = {
      ...currentTetromino,
      y: currentTetromino.y + 1,
    };

    return hasCollision(movedTetromino, playfield);
  };

  const removeFullRows = () => {
    setPlayField((prev) => {
      const newPlayfield = [...prev];

      let topRow: number = 0;
      let rowsCount: number = 0;

      // Clear all fully placed rows
      for (let row = playfield.length - 1; row >= 0; row--) {
        if (newPlayfield[row].every((cell) => cell?.status === Statuses.PLACED)) {
          for (let col = 0; col < newPlayfield[row].length; col++) {
            newPlayfield[row][col] = null;
          }
          topRow = row;
          rowsCount++;
        }
      }

      //Move top rows to bottom, skipping current tetromino
      if (topRow && rowsCount) {
        for (let row = topRow - 1; row >= 0; row--) {
          for (let col = 0; col < newPlayfield[row].length; col++) {
            if (newPlayfield[row][col]?.status !== Statuses.FILLED) {
              newPlayfield[row + rowsCount][col] = newPlayfield[row][col];
              newPlayfield[row][col] = null;
            }
          }
        }
      }

      calcPointsAndLevel(rowsCount);

      return newPlayfield;
    });
  };

  const calcPointsAndLevel = (rowsCount: number) => {
    let newPoints = points;

    if (rowsCount === 4) {
      newPoints = newPoints + 1200 * level;
    } else {
      newPoints = newPoints + rowsCount * 40 * level;
    }

    let newLevel = 1;

    // Check if newPoints exceed the highest level threshold
    if (newPoints >= levelThresholds[config.MAX_LEVEL - 1].minPoints) {
      newLevel =
        config.MAX_LEVEL +
        Math.floor((newPoints - levelThresholds[config.MAX_LEVEL - 1].minPoints) / 10000);
    } else {
      // Find the appropriate level based on points
      for (const threshold of levelThresholds) {
        if (newPoints >= threshold.minPoints) {
          newLevel = threshold.level;
        }
      }
    }

    setPoints(newPoints);
    setLevel(newLevel);
  };

  const move = (direction: Moves) => {
    if (!currentTetromino || gameStatus === GameStatuses.LOSE) return;

    let movedTetromino: Tetromino = {
      ...currentTetromino,
    };

    switch (direction) {
      case Moves.DOWN:
        movedTetromino.y++;

        break;
      case Moves.RIGHT:
        movedTetromino.x++;

        break;
      case Moves.LEFT:
        movedTetromino.x--;

        break;
      case Moves.UP: {
        movedTetromino = rotateMatrix(movedTetromino);

        break;
      }
      case Moves.ESC:
        setGameStatus((prev) => {
          if (prev === GameStatuses.PLAY) {
            return GameStatuses.PAUSE;
          }
          if (prev === GameStatuses.PAUSE) {
            return GameStatuses.PLAY;
          }
          if (prev === GameStatuses.LOSE) {
            return GameStatuses.PLAY;
          }

          return prev;
        });
        return;
      default:
        break;
    }

    if (gameStatus !== GameStatuses.PLAY) {
      return;
    }

    if (!hasCollision(movedTetromino, playfield)) {
      clearTetrominoFromBoard();
      setCurrentTetromino(movedTetromino);
    }

    const tetrominoIsPlaced = isTetrominoPlaced();

    if (tetrominoIsPlaced && direction === Moves.DOWN) {
      markPlacedTetromino();
      spawnTetromino();
    }
  };

  const resetGame = () => {
    setPlayField(generateField(config.PLAY_FIELD_PARAMS.ROWS, config.PLAY_FIELD_PARAMS.COLS));
    spawnTetromino();
    setGameStatus(GameStatuses.PLAY);
  };

  useEffect(() => {
    spawnTetromino();
  }, []);

  useEffect(() => {
    placeTetrominoOnBoard();
  }, [currentTetromino]);

  useEffect(() => {
    if (shouldClear(playfield)) {
      removeFullRows();
    }
  }, [playfield]);

  useEffect(() => {
    const newSpeed = levelThresholds[level - 1]?.speed || 50;

    setSpeed(newSpeed);
  }, [level]);

  useInterval(() => {
    if (gameStatus === GameStatuses.PLAY) {
      move(Moves.DOWN);
    }
  }, speed);

  useControls(move);

  return {
    playfield,
    points,
    level,
    setPoints,
    gameStatus,
    resetGame,
  };
};
