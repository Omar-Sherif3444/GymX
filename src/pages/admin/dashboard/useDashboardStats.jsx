import { getStatus, todayISO, addDays } from "../members/membersApi";
import { gymCapacity } from "../../../context/checkInsData";
import { insideNow } from "./InGymAndCheckIn";
import { revenueTotal } from "../../../data/ReportsData";

const useDashboardStats = (members, machines, checkIns) => {
  const today = todayISO();

  const expiring = members.filter((m) => getStatus(m) === "Expiring").length;

  const newMembers = members.filter(
    (m) => m.joinDate >= addDays(today, -30),
  ).length;

  const underMaintenance = machines.filter(
    (m) => m.state === "under maintenance",
  ).length;

  const inside = insideNow(checkIns);

  const rejected = checkIns.filter((c) => c.status !== "Success").length;

  const successfulCheckIns = checkIns.filter(
    (c) => c.status === "Success",
  ).length;

  const cards = [
    {
      label: "In The Gym Now",
      value: `${inside.length} / ${gymCapacity}`,
      info: `${Math.round((inside.length / gymCapacity) * 100)}% full`,
      infoColor: "text-(--gym-subtext)",
    },
    {
      label: "Check-Ins Today",
      value: successfulCheckIns,
    },
    {
      label: "Expiring",
      value: expiring,
      info: "Expires within 7 days",
      infoColor: "text-yellow-400",
    },
    {
      label: "New Members",
      value: newMembers,
      info: "↑ 2 vs yesterday",
      infoColor: "text-green-400",
    },
    {
      label: "Maintenance",
      value: underMaintenance,
      info: "In Maintenance",
      infoColor: "text-(--gym-subtext)",
    },
    {
      label: "Revenue - EGP",
      value: revenueTotal,
      info: "↑ 8.4% vs Oct",
      infoColor: "text-green-400",
    },
  ];

  return {
    expiring,
    underMaintenance,
    inside,
    rejected,
    cards,
  };
};

export default useDashboardStats;
