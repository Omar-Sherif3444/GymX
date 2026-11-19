import { Link } from "react-router-dom";
import { card, cardLabel, cardTitle } from "./DashboardCard";

const row =
  "flex items-center gap-3 text-xs border-b border-line pb-3 last:border-0";
const count =
  "grid size-7 shrink-0 place-items-center rounded-md bg-bg2 font-bold text-orange";

const NeedsAttention = ({ expiring, underMaintenance, rejected }) => {
  const attentionItems = expiring + underMaintenance + rejected;
  const attentionQueues =
    (expiring > 0) + (underMaintenance > 0) + (rejected > 0);

  return (
    <section className={card}>
      <p className={cardLabel}>Needs attention</p>
      <h2 className={cardTitle}>
        {attentionQueues} queues · {attentionItems} items
      </h2>

      <ul className="space-y-3">
        <li className={row}>
          <span className={count}>{expiring}</span>
          <span className="flex-1">Subscriptions expiring within 7 days</span>
          <Link
            to="/admin/members"
            className="font-display uppercase text-orange"
          >
            Renew
          </Link>
        </li>
        <li className={row}>
          <span className={count}>{rejected}</span>
          <span className="flex-1">Rejected check-ins today</span>
          <Link
            to="/admin/check-in"
            className="font-display uppercase text-orange"
          >
            Review
          </Link>
        </li>
        <li className={row}>
          <span className={count}>{underMaintenance}</span>
          <span className="flex-1">Machines under maintenance</span>
          <Link
            to="/admin/machines"
            className="font-display uppercase text-orange"
          >
            Open
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NeedsAttention;
