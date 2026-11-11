const styles = {
  Active: "bg-green-500/15 text-green-500",
  Expiring: "bg-amber-500/15 text-amber-500",
  Expired: "bg-red-500/15 text-red-500",
  Frozen: "bg-sky-500/15 text-sky-400",
};

const StatusBadge = ({ status }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
    {status}
  </span>
);

export default StatusBadge;
