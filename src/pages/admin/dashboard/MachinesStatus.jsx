import { useTheme } from "../../../context/ThemeContext";
import { card, cardLabel, cardTitle } from "./DashboardCard";

const machineLight = "bg-yellow-100 text-yellow-700";
const machineDark = "bg-yellow-900/50 text-yellow-400";

const MachinesStatus = ({ machines }) => {
  const { lightMode } = useTheme();
  const maintenanceColor = lightMode ? machineLight : machineDark;
  const working = machines.filter((m) => m.state === "working").length;
  const underMaintenance = machines.filter(
    (m) => m.state === "under maintenance",
  );

  return (
    <section className={card}>
      <p className={cardLabel}>Machines Status</p>
      <h2 className={cardTitle}>
        {working} working · {underMaintenance.length} under maintenance
      </h2>
      <div className="flex h-2 rounded gap-1 overflow-hidden">
        <div
          className="bg-green-500"
          style={{ width: `${(working / machines.length) * 100}%` }}
        ></div>
        <div
          className="bg-yellow-500"
          style={{
            width: `${(underMaintenance.length / machines.length) * 100}%`,
          }}
        ></div>
      </div>
      <ul className="mt-4 space-y-3 text-xs">
        {underMaintenance.map((m) => (
          <li key={m.id} className="flex items-center gap-3 text-subtext">
            <span
              className={`rounded-full px-2 py-1 font-semibold ${maintenanceColor}`}
            >
              In maintenance
            </span>
            {m.name}
          </li>
        ))}
        {underMaintenance.length === 0 && (
          <li className="text-sub">All machines are working.</li>
        )}
      </ul>
    </section>
  );
};
export default MachinesStatus;
