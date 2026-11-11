import { formatDate, todayISO } from "./membersApi";

const SHOWN = 10;

const minutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const duration = (visit) => (visit.checkOut ? minutes(visit.checkOut) - minutes(visit.checkIn) : null);

const formatDuration = (mins) => {
  if (mins === null) return "In the gym";
  const hours = Math.floor(mins / 60);
  return hours ? `${hours}h ${mins % 60}m` : `${mins}m`;
};

const AttendanceHistory = ({ attendance }) => {
  const thisMonth = todayISO().slice(0, 7);
  const finished = attendance.map(duration).filter((d) => d !== null);
  const average = finished.length ? Math.round(finished.reduce((a, b) => a + b, 0) / finished.length) : null;

  const stats = [
    ["Visits this month", attendance.filter((v) => v.date.startsWith(thisMonth)).length],
    ["Total visits", attendance.length],
    ["Last visit", attendance[0] ? formatDate(attendance[0].date) : "—"],
    ["Avg. session", average === null ? "—" : formatDuration(average)],
  ];

  return (
    <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
      <h2 className="mb-4 text-lg font-bold">Attendance</h2>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-md bg-(--gym-surface) p-3">
            <p className="text-xs text-(--gym-subtext)">{label}</p>
            <p className="mt-1 font-[Anton] text-2xl">{value}</p>
          </div>
        ))}
      </div>

      {attendance.length === 0 ? (
        <p className="py-6 text-center text-sm text-(--gym-subtext)">No visits yet.</p>
      ) : (
        <div className="w-0 min-w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-(--gym-label)">
              <tr className="border-b border-(--gym-line)">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Check-in</th>
                <th className="py-2 pr-4">Check-out</th>
                <th className="py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {attendance.slice(0, SHOWN).map((v) => (
                <tr key={`${v.date}-${v.checkIn}`} className="border-b border-(--gym-line) last:border-0">
                  <td className="whitespace-nowrap py-3 pr-4">{formatDate(v.date)}</td>
                  <td className="py-3 pr-4 text-(--gym-subtext)">{v.checkIn}</td>
                  <td className="py-3 pr-4 text-(--gym-subtext)">{v.checkOut ?? "—"}</td>
                  <td className="py-3">{formatDuration(duration(v))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {attendance.length > SHOWN && (
            <p className="pt-3 text-xs text-(--gym-subtext)">
              Showing the latest {SHOWN} of {attendance.length} visits.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default AttendanceHistory;
