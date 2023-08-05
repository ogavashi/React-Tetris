export const generateField = (rows: number, columns: number) => {
  return Array.from({ length: rows }, () => Array(columns).fill(null));
};
