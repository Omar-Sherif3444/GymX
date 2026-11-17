import reportsData from "../../data/ReportsData";

const toneColors = {
  good: "text-green-700",
  bad: "text-red-800",
};

const Reports = () => {
  return (
    <div className="md:p-8">
      <h1 className="font-[Anton] text-4xl">REPORTS</h1>
      <p className="ml-1 text-xs text-subtext mb-4">
        View your analytics and reports here.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportsData.statsData.map((s) => (
          <div
            className=" border border-line p-3 rounded-lg bg-card font-bold"
            key={s.id}
          >
            <div className="stat-title text-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-desc ${toneColors[s.tone]}`}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
