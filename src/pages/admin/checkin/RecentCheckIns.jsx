const badge = {
  Success: "bg-green-500/15 text-green-500",
  Expired: "bg-amber-500/15 text-amber-500",
  Invalid: "bg-red-500/15 text-red-500",
};

const RecentCheckIns = ({ checkIns }) => (
  <div className="rounded-md border border-(--gym-line) bg-(--gym-card)">
    <p className="border-b border-(--gym-line) p-4 text-xs font-semibold uppercase text-(--gym-label)">
      Recent check-ins
    </p>
    {checkIns.length === 0 ? (
      <p className="p-6 text-center text-sm text-(--gym-subtext)">No check-ins yet today.</p>
    ) : (
      <ul>
        {checkIns.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-3 border-b border-(--gym-line) p-4 text-sm last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold">{c.name}</p>
              <p className="text-xs text-(--gym-subtext)">
                {c.time} · {c.method}
              </p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badge[c.status]}`}>
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default RecentCheckIns;
