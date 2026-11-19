import { card, cardLabel } from "./DashboardCard";

const RecentActivity = ({ members }) => {
  const activity = members
    .flatMap((m) =>
      m.payments.map((p) => ({
        id: p.id,
        name: m.name,
        description: p.description,
        amount: p.amount,
        date: p.date,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <section className={card}>
      <p className={cardLabel}>Recent activity</p>
      <ul className="mt-4 space-y-3 text-xs">
        {activity.map((a) => (
          <li
            key={a.id}
            className="border-b border-(--gym-line) pb-3 last:border-0"
          >
            {a.name} · {a.description}
            <p className="mt-1 text-sub">{a.date}</p>
          </li>
        ))}
        {activity.length === 0 && (
          <li className="text-sub">No activity yet.</li>
        )}
      </ul>
    </section>
  );
};
export default RecentActivity;
