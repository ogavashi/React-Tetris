import { useEffect, useState } from "react";

export const useDebounce = (callback: () => void, delay: number) => {
  const [debouncedFunc, setDebouncedFunc] = useState<() => void>(() => {});

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  useEffect(() => {
    setDebouncedFunc(() => callback);
  }, [callback]);

  return debouncedFunc;
};
