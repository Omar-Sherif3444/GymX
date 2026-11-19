import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useTheme } from "../../../context/ThemeContext";
import { getStatus, todayISO, daysBetween } from "../members/membersApi";

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
  Active: " bg-green-900/50 text-green-400",
  Expired: " bg-red-900/50 text-red-400",
  Expiring: "bg-yellow-900/50 text-yellow-400",
};

const DashboardTable = ({ members, loading, error }) => {
  const { lightMode } = useTheme();
  const statusColor = lightMode ? statusLight : statusDark;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [checkedOut, setCheckedOut] = useState([]);

  const today = "2026-11-17";

  const filterBtn = (name) =>
    `btn btn-md rounded-full border ${
      filter === name
        ? "border-orange bg-orange text-white"
        : "border-line bg-card text-sub"
    }`;
  const visible = members
    .filter((m) => getStatus(m) !== "Expired" && getStatus(m) !== "Frozen")
    .filter((m) => m.attendance.some((v) => v.date === today))
    .filter((m) => filter === "All" || getStatus(m) === filter)
    .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-w-0">
      <h1 className="mb-2 text-lg font-display uppercase">
        in the gym now - {visible.length}
      </h1>

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
          <table className="table ">
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
              {visible.map((m) => {
                const status = getStatus(m);
                return (
                  <tr key={m.id} className=" hover:bg-(--gym-surface)">
                    <td className="hover:text-orange">{m.name}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>{daysBetween(today, m.endDate)}</td>
                    <td>
                      <button
                        onClick={() => setCheckedOut([...checkedOut, m.id])}
                        className="btn btn-sm btn-outline border-line hover:bg-orange"
                      >
                        Check-Out
                      </button>
                    </td>
                  </tr>
                );
              })}
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
