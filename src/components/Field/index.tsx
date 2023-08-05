type FieldProps = {
  color?: string;
};

const Field: React.FC<FieldProps> = ({ color = "" }) => {
  return (
    <div
      className={`box-content h-6 w-6 p-1 border-b-2 border-r-2 border-white-500`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Field;
