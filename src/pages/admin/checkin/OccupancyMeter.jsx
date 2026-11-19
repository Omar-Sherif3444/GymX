const OccupancyMeter = ({ inside, capacity }) => {
  const percent = Math.min(100, Math.round((inside / capacity) * 100));
  const level = percent >= 85 ? "High" : percent >= 50 ? "Medium" : "Low";
  const bar = percent >= 85 ? "bg-red-500" : percent >= 50 ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-4">
      <p className="text-xs font-semibold uppercase text-(--gym-label)">Inside now</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="font-[Anton] text-4xl">
          {inside}
          <span className="text-lg text-(--gym-subtext)"> / {capacity}</span>
        </p>
        <span className="text-sm text-(--gym-subtext)">{level}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-(--gym-surface)">
        <div className={`h-full ${bar}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default OccupancyMeter;
