import { useEffect, useState } from "react";
import { useMachinesData } from "../../context/MachinesContext";
import { getMembers, todayISO } from "./members/membersApi";
import { useCheckInsData } from "../../context/CheckInsContext";
import useDashboardStats from "./dashboard/useDashboardStats";
import DashboardTable from "./dashboard/DashboardTable";
import NeedsAttention from "./dashboard/NeedsAttention";
import MachinesStatus from "./dashboard/MachinesStatus";
import RecentActivity from "./dashboard/RecentActivity";
import LoadState from "./members/LoadState";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { machines } = useMachinesData();
  const { checkIns } = useCheckInsData();
  const { expiring, underMaintenance, rejected, cards } = useDashboardStats(
    members,
    machines,
    checkIns,
  );
  const today = todayISO();

  const loadMembers = () => {
    setLoading(true);
    setError(null);
    getMembers()
      .then(setMembers)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  if (loading || error) {
    return (
      <div className="md:p-8">
        <h1 className="font-[Anton] text-4xl mb-5">DASHBOARD</h1>
        <LoadState
          error={error ? error.message || "Couldn't load members." : null}
          onRetry={loadMembers}
        />
      </div>
    );
  }

  return (
    <div className="md:p-8">
      <h1 className="font-[Anton] text-4xl mb-5">DASHBOARD</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {cards.map((c) => (
          <div
            className=" border border-line p-4 rounded-lg bg-card "
            key={c.label}
          >
            <p className="stat-title text-label font-bold">{c.label}</p>
            <p className=" font-[Anton] mt-4 text-3xl ">{c.value}</p>
            <p className={`text-xs mt-1 ${c.infoColor}`}>{c.info}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-4 items-start mt-3">
        <DashboardTable members={members} loading={loading} error={error} />
        <div className="min-w-0 space-y-6 mt-3">
          <NeedsAttention
            expiring={expiring}
            underMaintenance={underMaintenance}
            rejected={rejected}
          />
          <RecentActivity members={members} />
          <MachinesStatus machines={machines} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
