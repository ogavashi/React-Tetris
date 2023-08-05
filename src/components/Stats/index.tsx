type StatsProps = {
  level: number;
  score: number;
};

const Stats: React.FC<StatsProps> = ({ level, score }) => {
  return (
    <div className="flex items-center justify-center gap-2 m-2">
      <div className="flex items-center gap-2">
        <p className="text-2xl font-normal">Level:</p>
        <p className="text-2xl font-bold"> {level} </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-normal">Score:</p>
        <p className="text-2xl font-bold"> {score} </p>
      </div>
    </div>
  );
};

export default Stats;
