import { GameField } from "../../../types";
import Field from "../Field";

type PlayfieldProps = {
  field: GameField;
};

const Playfield: React.FC<PlayfieldProps> = ({ field }) => {
  return (
    <div>
      <div className="grid grid-cols-10 border-t-2 border-l-2 border-white-500 gap-0">
        {field.map((row) =>
          row.map((cell, colIndex) => <Field key={colIndex} color={cell?.color} />)
        )}
      </div>
    </div>
  );
};

export default Playfield;
