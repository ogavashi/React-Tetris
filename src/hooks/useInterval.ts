import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number = 1000): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const intervalID = setInterval(() => callbackRef.current(), delay);

    return () => clearInterval(intervalID);
  }, [delay]);
};
