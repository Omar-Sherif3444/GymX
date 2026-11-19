import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useTheme } from "../../../context/ThemeContext";
import { getStatus, todayISO, daysBetween } from "../members/membersApi";
import { useCheckInsData } from "../../../context/CheckInsContext";
import { insideNow, codeOf } from "./InGymAndCheckIn";

const FILTER = ["All", "Active", "Expiring"];

const columns = [
  "Member",
  "Checked-In",
  "Time Inside",
  "Status",
  "Days Left",
  "",
];

const statusLight = {
  Active: "bg-green-100 text-green-700",
  Expiring: "bg-orange-100 text-orange-600",
  Expired: "bg-red-100 text-red-600",
};

const statusDark = {
  Active: "bg-green-900/50 text-green-400",
  Expired: "bg-red-900/50 text-red-400",
  Expiring: "bg-yellow-900/50 text-yellow-400",
};

const DashboardTable = ({ members, loading, error }) => {
  const { lightMode } = useTheme();
  const { checkIns, setCheckIns } = useCheckInsData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const statusColor = lightMode ? statusLight : statusDark;
  const today = todayISO();

  const rows = insideNow(checkIns).map((visit) => {
    const member = members.find((m) => m.id === codeOf(visit));
    return { visit, member, status: member ? getStatus(member) : null };
  });

  const visible = rows
    .filter((r) => filter === "All" || r.status === filter)
    .filter((r) => r.visit.name.toLowerCase().includes(query.toLowerCase()));

  const handleCheckOut = (visit) =>
    setCheckIns(
      checkIns.map((c) => (c.id === visit.id ? { ...c, checkedOut: true } : c)),
    );

  const filterBtn = (name) =>
    `btn btn-md rounded-full border ${
      filter === name
        ? "border-orange bg-orange text-white"
        : "border-line bg-card text-sub"
    }`;

  return (
    <div className="min-w-0">
      <h2 className="mb-2 text-lg font-display uppercase">
        in the gym now - {visible.length}
      </h2>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="input w-full rounded-md border border-(--gym-line) focus-within:border-orange focus-within:outline-none sm:flex-1">
          <LuSearch className="opacity-50" />
          <input
            type="search"
            placeholder="Search members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap gap-3">
          {FILTER.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filterBtn(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="mb-2 text-sub">Loading members…</p>}
      {error && <p className="mb-2 text-sub">Could not load members.</p>}

      <div className="overflow-hidden rounded-lg border border-(--gym-line) bg-card">
        <div className="max-h-80 overflow-auto">
          <table className="table">
            <thead>
              <tr className="font-bold text-label">
                {columns.map((col) => (
                  <th
                    key={col || "actions"}
                    className="sticky top-0 z-5 bg-card"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visible.map(({ visit, member, status }) => (
                <tr key={visit.id} className="hover:bg-(--gym-surface)">
                  <td className="hover:text-orange">{visit.name}</td>
                  <td>{visit.time}</td>
                  <td>-</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td>{member ? daysBetween(today, member.endDate) : "-"}</td>
                  <td>
                    <button
                      onClick={() => handleCheckOut(visit)}
                      className="btn btn-sm btn-outline border-line hover:bg-orange"
                    >
                      Check-Out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && visible.length === 0 && (
          <p className="p-4 text-center text-sm text-sub">No members found.</p>
        )}

        <div className="border-t border-line px-4 py-3 text-sm text-sub">
          {visible.length} {visible.length === 1 ? "member" : "members"}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
