import { useEffect, useState } from "react";
import { useMachinesData } from "../../context/MachinesContext";
import { revenueTotal } from "../../data/reportsData";
import { getMembers, getStatus, todayISO, addDays } from "./members/membersApi";
import DashboardTable from "./dashboard/DashboardTable";
import NeedsAttention from "./dashboard/NeedsAttention";
import MachinesStatus from "./dashboard/MachinesStatus";
import RecentActivity from "./dashboard/RecentActivity";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { machines } = useMachinesData();

  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const today = "2026-11-17";
  const expiring = members.filter((m) => getStatus(m) === "Expiring").length;
  const underMaintenance = machines.filter(
    (m) => m.state === "under maintenance",
  ).length;

  //will add the checked-out filter later
  const inGym = members
    .filter((m) => m.attendance.some((v) => v.date === today))
    .filter((m) => getStatus(m) !== "Frozen").length;

  const cards = [
    {
      label: "In The Gym Now",
      value: `${inGym} / 60`,
      info: `${Math.round((inGym / 60) * 100)}% full `,
      infoColor: "(--gym-subtext)",
    },

    {
      label: "Check-Ins Today",
      //only using the inGym bec they have the same code will change it later
      value: inGym,
    },

    {
      label: "Expiring",
      value: expiring,
      info: "Expires within 7 days",
      infoColor: "yellow-400",
    },
    {
      label: "New Members",
      value: members.filter((m) => m.joinDate >= addDays(today, -30)).length,
      info: "↑ 2 vs yesterday",
      infoColor: "green-400",
    },
    {
      label: "Maintenance",
      value: underMaintenance,
      info: "In Maintenance",
      infoColor: "(--gym-subtext)",
    },
    {
      label: "Revenue - EGP",
      value: revenueTotal,
      info: "↑ 8.4% vs Oct",
      infoColor: "green-400",
    },
  ];

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
            <p className={`text-xs mt-1 text-${c.infoColor}`}>{c.info}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-4 items-start mt-3">
        <DashboardTable members={members} loading={loading} error={error} />
        <div className="min-w-0 space-y-6 mt-3">
          <NeedsAttention
            expiring={expiring}
            underMaintenance={underMaintenance}
          />
          <RecentActivity members={members} />
          <MachinesStatus machines={machines} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
